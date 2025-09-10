const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  // Gamification fields
  totalPoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  streak: {
    type: Number,
    default: 0
  },
  lastLoginDate: {
    type: Date
  },
  achievements: [{
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  }],
  badges: [{
    name: String,
    icon: String,
    color: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Course enrollment and progress
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    completedAt: Date
  }],
  // Academic stats
  stats: {
    coursesCompleted: {
      type: Number,
      default: 0
    },
    lessonsCompleted: {
      type: Number,
      default: 0
    },
    quizzesTaken: {
      type: Number,
      default: 0
    },
    averageQuizScore: {
      type: Number,
      default: 0
    },
    studyHours: {
      type: Number,
      default: 0
    }
  },
  // Settings and preferences
  settings: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    publicProfile: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  },
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ totalPoints: -1 });
userSchema.index({ level: -1 });

// Virtual for calculating level based on points
userSchema.virtual('calculatedLevel').get(function() {
  return Math.floor(this.totalPoints / 100) + 1;
});

// Method to add points and update level
userSchema.methods.addPoints = function(points) {
  this.totalPoints += points;
  this.level = Math.floor(this.totalPoints / 100) + 1;
  return this.save();
};

// Method to update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (this.lastLoginDate) {
    const lastLogin = new Date(this.lastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);
    
    const diffTime = today - lastLogin;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      this.streak += 1;
    } else if (diffDays > 1) {
      this.streak = 1;
    }
  } else {
    this.streak = 1;
  }
  
  this.lastLoginDate = new Date();
  return this.save();
};

// Method to enroll in course
userSchema.methods.enrollInCourse = function(courseId) {
  const isEnrolled = this.enrolledCourses.some(
    enrollment => enrollment.course.toString() === courseId.toString()
  );
  
  if (!isEnrolled) {
    this.enrolledCourses.push({ course: courseId });
    return this.save();
  }
  
  return Promise.resolve(this);
};

module.exports = mongoose.model('User', userSchema);
