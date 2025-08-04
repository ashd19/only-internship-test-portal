const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // in minutes
    required: true
  },
  percentile: {
    type: Number,
    min: 0,
    max: 100
  },
  isPassed: {
    type: Boolean,
    required: true
  },
  passThreshold: {
    type: Number,
    default: 60
  },
  rank: {
    type: Number
  },
  totalCandidates: {
    type: Number
  },
  certificateUrl: {
    type: String
  },
  certificateId: {
    type: String,
    unique: true
  },
  warnings: {
    type: Number,
    default: 0
  },
  suspiciousActivity: {
    type: Boolean,
    default: false
  },
  adminReview: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
resultSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Result', resultSchema); 