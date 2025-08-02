const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['principal', 'teacher', 'guardian', 'admin'],
    required: [true, 'User role is required']
  },
  profile: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    fullNameBangla: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      match: [/^(\+88)?01[3-9]\d{8}$/, 'Please enter a valid Bangladeshi phone number']
    },
    address: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: Date
    },
    profileImage: {
      type: String // URL to profile image
    }
  },
  // Role-specific data
  teacherData: {
    employeeId: {
      type: String,
      sparse: true,
      unique: true
    },
    subjects: [String],
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }],
    qualification: String,
    joiningDate: Date,
    salary: Number
  },
  guardianData: {
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }],
    occupation: String,
    relationship: {
      type: String,
      enum: ['father', 'mother', 'guardian', 'other']
    }
  },
  // Security and status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check password
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to handle failed login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // If we get to max attempts and it's not locked already, lock the account
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // Lock for 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Indexes for better performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'teacherData.employeeId': 1 }, { sparse: true });

module.exports = mongoose.model('User', userSchema);