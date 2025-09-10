const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Course instructor is required']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['Programming', 'Mathematics', 'Science', 'Language', 'History', 'Art', 'Music', 'Business', 'Other']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  thumbnail: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  // Gamification settings
  pointsPerLesson: {
    type: Number,
    default: 10
  },
  pointsPerQuiz: {
    type: Number,
    default: 20
  },
  completionPoints: {
    type: Number,
    default: 100
  },
  // Course structure
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  // Prerequisites and requirements
  prerequisites: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  learningObjectives: [{
    type: String
  }],
  // Enrollment and stats
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  }],
  maxEnrollments: {
    type: Number,
    default: null // null means unlimited
  },
  stats: {
    totalEnrollments: {
      type: Number,
      default: 0
    },
    totalCompletions: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  // Course settings
  isPublished: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  allowRatings: {
    type: Boolean,
    default: true
  },
  // Dates
  publishedAt: Date,
  startDate: Date,
  endDate: Date,
  // Tags for search and filtering
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  // Course materials and resources
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['file', 'link', 'video', 'document']
    },
    url: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for performance
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ isPublished: 1, isActive: 1 });
courseSchema.index({ 'stats.averageRating': -1 });
courseSchema.index({ 'stats.totalEnrollments': -1 });

// Virtual for completion rate
courseSchema.virtual('completionRate').get(function() {
  if (this.stats.totalEnrollments === 0) return 0;
  return (this.stats.totalCompletions / this.stats.totalEnrollments) * 100;
});

// Method to enroll a student
courseSchema.methods.enrollStudent = function(studentId) {
  const isEnrolled = this.enrolledStudents.some(
    enrollment => enrollment.student.toString() === studentId.toString()
  );
  
  if (!isEnrolled && (this.maxEnrollments === null || this.enrolledStudents.length < this.maxEnrollments)) {
    this.enrolledStudents.push({ student: studentId });
    this.stats.totalEnrollments += 1;
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Method to add rating
courseSchema.methods.addRating = function(rating) {
  const totalScore = this.stats.averageRating * this.stats.totalRatings;
  this.stats.totalRatings += 1;
  this.stats.averageRating = (totalScore + rating) / this.stats.totalRatings;
  return this.save();
};

// Method to mark course as completed by a student
courseSchema.methods.markCompleted = function(studentId) {
  // This would typically involve checking if all lessons are completed
  this.stats.totalCompletions += 1;
  return this.save();
};

module.exports = mongoose.model('Course', courseSchema);
