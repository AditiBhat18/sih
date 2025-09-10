const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/progress
// @desc    Get user's overall progress
// @access  Private
router.get('/', auth, (req, res) => {
  res.json({ message: 'User progress endpoint - to be implemented' });
});

// @route   GET /api/progress/course/:id
// @desc    Get progress for specific course
// @access  Private
router.get('/course/:id', auth, (req, res) => {
  res.json({ message: 'Course progress endpoint - to be implemented' });
});

// @route   POST /api/progress/lesson/:id/complete
// @desc    Mark lesson as completed
// @access  Private
router.post('/lesson/:id/complete', auth, (req, res) => {
  res.json({ message: 'Complete lesson endpoint - to be implemented' });
});

module.exports = router;
