const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Achievement name is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    maxlength: 500
  },
  icon: {
    type: String,
    default: '🏆'
  },
  color: {
    type: String,
    default: '#FFD700' // Gold color
  },
  category: {
    type: String,
    enum: ['Academic', 'Engagement', 'Social', 'Special', 'Milestone'],
    required: [true, 'Achievement category is required']
  },
  type: {
    type: String,
    enum: ['points', 'streak', 'completion', 'social', 'special'],
    required: [true, 'Achievement type is required']
  },
  // Achievement criteria
  criteria: {
    // For points-based achievements
    pointsRequired: {
      type: Number,
      default: 0
    },
    // For streak-based achievements
    streakRequired: {
      type: Number,
      default: 0
    },
    // For completion-based achievements
    coursesRequired: {
      type: Number,
      default: 0
    },
    lessonsRequired: {
      type: Number,
      default: 0
    },
    quizzesRequired: {
      type: Number,
      default: 0
    },
    // For social achievements
    commentsRequired: {
      type: Number,
      default: 0
    },
    helpersRequired: {
      type: Number,
      default: 0
    },
    // For grade-based achievements
    minimumGrade: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    // Custom conditions (JSON string for complex criteria)
    customCondition: {
      type: String,
      default: ''
    }
  },
  // Achievement rewards
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    badge: {
      name: String,
      icon: String,
      color: String
    },
    title: {
      type: String,
      default: ''
    },
    // Special rewards (JSON string for custom rewards)
    special: {
      type: String,
      default: ''
    }
  },
  // Achievement settings
  isActive: {
    type: Boolean,
    default: true
  },
  isRepeatable: {
    type: Boolean,
    default: false
  },
  maxEarns: {
    type: Number,
    default: 1 // How many times this achievement can be earned
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Epic'],
    default: 'Medium'
  },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary'],
    default: 'Common'
  },
  // Visibility and unlock conditions
  isHidden: {
    type: Boolean,
    default: false // Hidden achievements are revealed only when earned
  },
  unlockLevel: {
    type: Number,
    default: 1 // User level required to be eligible
  },
  prerequisiteAchievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  // Statistics
  stats: {
    totalEarned: {
      type: Number,
      default: 0
    },
    firstEarnedAt: Date,
    lastEarnedAt: Date
  },
  // Achievement tracking
  earnedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    earnCount: {
      type: Number,
      default: 1
    }
  }],
  // Seasonal or time-limited achievements
  validFrom: Date,
  validUntil: Date,
  isTimeLimited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for performance
achievementSchema.index({ category: 1, type: 1 });
achievementSchema.index({ isActive: 1, isHidden: 1 });
achievementSchema.index({ difficulty: 1, rarity: 1 });
achievementSchema.index({ 'stats.totalEarned': -1 });

// Virtual for earning rate
achievementSchema.virtual('earningRate').get(function() {
  const totalUsers = this.earnedBy.length > 0 ? this.earnedBy.length : 1;
  return (this.stats.totalEarned / totalUsers) * 100;
});

// Method to check if user is eligible
achievementSchema.methods.isEligible = function(user) {
  // Check level requirement
  if (user.level < this.unlockLevel) return false;
  
  // Check if already earned and not repeatable
  if (!this.isRepeatable) {
    const earned = this.earnedBy.some(earn => earn.user.toString() === user._id.toString());
    if (earned) return false;
  }
  
  // Check max earns
  const userEarns = this.earnedBy.filter(earn => earn.user.toString() === user._id.toString());
  if (userEarns.length >= this.maxEarns) return false;
  
  // Check time limits
  if (this.isTimeLimited) {
    const now = new Date();
    if (this.validFrom && now < this.validFrom) return false;
    if (this.validUntil && now > this.validUntil) return false;
  }
  
  return true;
};

// Method to check if user meets criteria
achievementSchema.methods.checkCriteria = function(user) {
  const { criteria } = this;
  
  switch (this.type) {
    case 'points':
      return user.totalPoints >= criteria.pointsRequired;
      
    case 'streak':
      return user.streak >= criteria.streakRequired;
      
    case 'completion':
      if (criteria.coursesRequired && user.stats.coursesCompleted < criteria.coursesRequired) return false;
      if (criteria.lessonsRequired && user.stats.lessonsCompleted < criteria.lessonsRequired) return false;
      if (criteria.quizzesRequired && user.stats.quizzesTaken < criteria.quizzesRequired) return false;
      return true;
      
    case 'social':
      // This would need to be implemented based on social features
      return true;
      
    case 'special':
      // Custom logic would go here
      return true;
      
    default:
      return false;
  }
};

// Method to award achievement to user
achievementSchema.methods.awardToUser = async function(userId) {
  const existingEarn = this.earnedBy.find(earn => earn.user.toString() === userId.toString());
  
  if (existingEarn && this.isRepeatable) {
    existingEarn.earnCount += 1;
    existingEarn.earnedAt = new Date();
  } else if (!existingEarn) {
    this.earnedBy.push({ user: userId });
  } else {
    return false; // Already earned and not repeatable
  }
  
  this.stats.totalEarned += 1;
  this.stats.lastEarnedAt = new Date();
  if (!this.stats.firstEarnedAt) {
    this.stats.firstEarnedAt = new Date();
  }
  
  await this.save();
  return true;
};

module.exports = mongoose.model('Achievement', achievementSchema);
