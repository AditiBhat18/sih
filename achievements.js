const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/achievements
// @desc    Get all achievements
// @access  Private
router.get('/', auth, (req, res) => {
  res.json({ message: 'Get achievements endpoint - to be implemented' });
});

// @route   GET /api/achievements/user
// @desc    Get user's achievements
// @access  Private
router.get('/user', auth, (req, res) => {
  res.json({ message: 'Get user achievements endpoint - to be implemented' });
});

// @route   POST /api/achievements/unlock
// @desc    Unlock achievement for user
// @access  Private
router.post('/unlock', auth, (req, res) => {
  res.json({ message: 'Unlock achievement endpoint - to be implemented' });
});

module.exports = router;
