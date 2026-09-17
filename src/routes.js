const express = require('express');
const { body, param, query, validationResult } = require('express-validator');

const router = express.Router();

/**
 * Middleware to handle validation results.
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request parameters',
      details: errors.array(),
    });
  }
  next();
};

/**
 * Simple health check endpoint.
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Create a new user.
 * Expected body: { name: string, email: string }
 */
router.post(
  '/users',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 100 })
      .withMessage('Name must be at most 100 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    handleValidation,
  ],
  async (req, res) => {
    try {
      // In a real app, replace this with DB logic.
      const newUser = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        createdAt: new Date(),
      };
      res.status(201).json({ status: 'success', data: newUser });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

/**
 * Retrieve a user by ID.
 */
router.get(
  '/users/:id',
  [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer')
      .toInt(),
    handleValidation,
  ],
  async (req, res) => {
    try {
      // Placeholder: simulate DB fetch.
      const user = {
        id: req.params.id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date('2023-01-01T12:00:00Z'),
      };
      res.json({ status: 'success', data: user });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

/**
 * Update a user by ID.
 * Expected body: { name?: string, email?: string }
 */
router.put(
  '/users/:id',
  [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer')
      .toInt(),
    body('name')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Name must be at most 100 characters long'),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    handleValidation,
  ],
  async (req, res) => {
    try {
      // Placeholder: simulate DB update.
      const updatedUser = {
        id: req.params.id,
        name: req.body.name || 'Existing Name',
        email: req.body.email || 'existing.email@example.com',
        updatedAt: new Date(),
      };
      res.json({ status: 'success', data: updatedUser });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

/**
 * Delete a user by ID.
 */
router.delete(
  '/users/:id',
  [
    param('id')
      .isInt({ gt: 0 })
      .withMessage('User ID must be a positive integer')
      .toInt(),
    handleValidation,
  ],
  async (req, res) => {
    try {
      // Placeholder: simulate DB deletion.
      res.json({ status: 'success', message: `User ${req.params.id} deleted` });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

/**
 * List users with optional pagination.
 * Query params: page (int, default 1), limit (int, default 10)
 */
router.get(
  '/users',
  [
    query('page')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Page must be a positive integer')
      .toInt(),
    query('limit')
      .optional()
      .isInt({ gt: 0, lt: 101 })
      .withMessage('Limit must be between 1 and 100')
      .toInt(),
    handleValidation,
  ],
  async (req, res) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      // Placeholder: generate dummy users.
      const users = Array.from({ length: limit }, (_, i) => ({
        id: (page - 1) * limit + i + 1,
        name: `User ${(page - 1) * limit + i + 1}`,
        email: `user${(page - 1) * limit + i + 1}@example.com`,
      }));

      res.json({
        status: 'success',
        data: users,
        meta: { page, limit },
      });
    } catch (err) {
      console.error('Error listing users:', err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

module.exports = router;