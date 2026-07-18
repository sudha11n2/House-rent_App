const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Protected routes (require authorization token)
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
