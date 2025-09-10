const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const coursesController = require('../controllers/coursesController');
const auth = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', coursesController.getCourses);

// @route   GET /api/courses/:id
// @desc    Get specific course by ID
// @access  Public
router.get('/:id', coursesController.getCourse);

// @route   POST /api/courses
// @desc    Create a new course (teachers/admins only)
// @access  Private
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').isIn(['Programming', 'Mathematics', 'Science', 'Language', 'History', 'Art', 'Music', 'Business', 'Other']).withMessage('Invalid category')
], coursesController.createCourse);

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (instructor/admin only)
router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 3, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }),
  body('category').optional().isIn(['Programming', 'Mathematics', 'Science', 'Language', 'History', 'Art', 'Music', 'Business', 'Other'])
], coursesController.updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (instructor/admin only)
router.delete('/:id', auth, coursesController.deleteCourse);

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in course
// @access  Private
router.post('/:id/enroll', auth, coursesController.enrollInCourse);

// @route   POST /api/courses/:id/rate
// @desc    Rate a course
// @access  Private
router.post('/:id/rate', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], coursesController.rateCourse);

module.exports = router;
