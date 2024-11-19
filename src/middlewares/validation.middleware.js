const { body, validationResult } = require('express-validator');

// Validation rules for user and admin registration
exports.validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Validation rules for user login
exports.validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Validation rules for uploading assignments
exports.validateAssignmentUpload = [
    body('task').notEmpty().withMessage('Task is required'),
    body('adminId').notEmpty().withMessage('Admin ID is required'),
];

// Middleware to check for validation errors
exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
