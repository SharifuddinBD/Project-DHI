const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    fullNameBangla: {
      type: String,
      required: [true, 'Bangla name is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required']
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    nationality: {
      type: String,
      default: 'Bangladeshi'
    },
    religion: {
      type: String,
      enum: ['Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Others'],
      default: 'Islam'
    },
    profileImage: String
  },
  contactInfo: {
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      trim: true
    },
    permanentAddress: {
      type: String,
      trim: true
    }
  },
  guardianInfo: {
    father: {
      name: {
        type: String,
        required: [true, 'Father name is required'],
        trim: true
      },
      nameBangla: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        required: [true, 'Father phone is required'],
        trim: true
      },
      occupation: {
        type: String,
        trim: true
      },
      nid: {
        type: String,
        trim: true
      }
    },
    mother: {
      name: {
        type: String,
        required: [true, 'Mother name is required'],
        trim: true
      },
      nameBangla: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      occupation: {
        type: String,
        trim: true
      },
      nid: {
        type: String,
        trim: true
      }
    },
    guardian: {
      name: {
        type: String,
        trim: true
      },
      nameBangla: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      relationship: {
        type: String,
        trim: true
      },
      occupation: {
        type: String,
        trim: true
      }
    },
    primaryGuardian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Primary guardian is required']
    }
  },
  academicInfo: {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class is required']
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true
    },
    group: {
      type: String,
      enum: ['Science', 'Humanities', 'Business Studies', 'General'],
      trim: true
    },
    admissionDate: {
      type: Date,
      required: [true, 'Admission date is required']
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required']
    },
    previousSchool: {
      name: String,
      address: String,
      lastClass: String,
      passingYear: String,
      gpa: Number
    }
  },
  financialInfo: {
    admissionFee: {
      type: Number,
      default: 0
    },
    monthlyFee: {
      type: Number,
      required: [true, 'Monthly fee is required']
    },
    examFee: {
      type: Number,
      default: 0
    },
    otherFees: [{
      title: String,
      amount: Number,
      description: String
    }],
    scholarship: {
      type: String,
      enum: ['Full', 'Half', 'Quarter', 'None'],
      default: 'None'
    },
    scholarshipAmount: {
      type: Number,
      default: 0
    }
  },
  healthInfo: {
    height: Number,
    weight: Number,
    medicalConditions: [String],
    allergies: [String],
    medications: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'transferred', 'graduated', 'dropped'],
    default: 'active'
  },
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      required: true
    },
    reason: String,
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  examResults: [{
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    subjects: [{
      subject: String,
      marks: Number,
      grade: String,
      outOf: Number
    }],
    totalMarks: Number,
    percentage: Number,
    grade: String,
    position: Number,
    remarks: String
  }],
  documents: [{
    type: {
      type: String,
      enum: ['birth_certificate', 'photo', 'testimonial', 'transfer_certificate', 'other'],
      required: true
    },
    filename: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    title: String,
    content: String,
    type: {
      type: String,
      enum: ['academic', 'behavioral', 'medical', 'general'],
      default: 'general'
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age calculation
studentSchema.virtual('age').get(function() {
  if (!this.personalInfo.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalInfo.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for full name display
studentSchema.virtual('displayName').get(function() {
  return this.personalInfo.fullName;
});

// Indexes for better performance
studentSchema.index({ studentId: 1 });
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ 'academicInfo.class': 1 });
studentSchema.index({ 'academicInfo.section': 1 });
studentSchema.index({ 'guardianInfo.primaryGuardian': 1 });
studentSchema.index({ status: 1 });

module.exports = mongoose.model('Student', studentSchema);