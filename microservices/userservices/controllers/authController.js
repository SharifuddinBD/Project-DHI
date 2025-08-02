const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Student = require('../models/Student');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Generate JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Create and send token response
const createSendToken = (user, statusCode, res, message = 'Success') => {
  const token = signToken(user._id);
  
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  user.loginAttempts = undefined;
  user.lockUntil = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: {
      user
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public (for demo purposes, in production should be protected)
exports.register = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const {
    username,
    email,
    password,
    role,
    fullName,
    fullNameBangla,
    phone,
    address,
    teacherData,
    guardianData
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    return next(new AppError('User with this email or username already exists', 400));
  }

  // Create user object
  const userData = {
    username,
    email,
    password,
    role,
    profile: {
      fullName,
      fullNameBangla,
      phone,
      address
    }
  };

  // Add role-specific data
  if (role === 'teacher' && teacherData) {
    userData.teacherData = teacherData;
  }

  if (role === 'guardian' && guardianData) {
    userData.guardianData = guardianData;
  }

  // Create user
  const newUser = await User.create(userData);

  createSendToken(newUser, 201, res, 'User registered successfully');
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { username, password, role } = req.body;

  // Check if user exists and password is correct
  let user;
  
  if (role === 'guardian') {
    // For guardians, username might be student ID
    const student = await Student.findOne({ studentId: username });
    if (student) {
      user = await User.findById(student.guardianInfo.primaryGuardian).select('+password');
    }
  } else {
    // For principal and teachers, use username or email
    user = await User.findOne({
      $or: [{ username }, { email: username }],
      role
    }).select('+password');
  }

  // Check if user exists and account is not locked
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  if (user.isLocked) {
    return next(new AppError('Account is temporarily locked due to too many failed login attempts. Please try again later.', 423));
  }

  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact administrator.', 403));
  }

  // Check password
  const isPasswordCorrect = await user.correctPassword(password);

  if (!isPasswordCorrect) {
    // Increment login attempts
    await user.incLoginAttempts();
    return next(new AppError('Invalid credentials', 401));
  }

  // If login is successful, reset login attempts
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Get additional user data based on role
  let additionalData = {};
  
  if (role === 'guardian') {
    const students = await Student.find({ 
      'guardianInfo.primaryGuardian': user._id 
    }).populate('academicInfo.class');
    additionalData.students = students;
  } else if (role === 'teacher') {
    additionalData.teacherInfo = user.teacherData;
  }

  createSendToken(user, 200, res, 'Login successful');
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Get user based on email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // Generate random reset token
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Hash the token and set to resetPasswordToken field
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  // In production, send email with reset token
  // For demo purposes, we'll return the token
  res.status(200).json({
    status: 'success',
    message: 'Password reset token sent to email',
    resetToken: resetToken // Remove this in production
  });
});

// @desc    Reset password
// @route   PATCH /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  // Get user based on the token
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  // If token has not expired and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res, 'Password reset successfully');
});

// @desc    Verify token
// @route   GET /api/auth/verify-token
// @access  Private
exports.verifyToken = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Token is valid',
    data: {
      user: req.user
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  let additionalData = {};
  
  if (user.role === 'guardian') {
    const students = await Student.find({ 
      'guardianInfo.primaryGuardian': user._id 
    }).populate('academicInfo.class');
    additionalData.students = students;
  } else if (user.role === 'teacher') {
    additionalData.teacherInfo = user.teacherData;
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
      ...additionalData
    }
  });
});

// @desc    Update password
// @route   PATCH /api/auth/update-password
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { currentPassword, newPassword } = req.body;

  // Get user from collection with password
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password is correct
  if (!(await user.correctPassword(currentPassword))) {
    return next(new AppError('Your current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  createSendToken(user, 200, res, 'Password updated successfully');
});