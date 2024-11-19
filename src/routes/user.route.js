const express = require('express');
const {
    register,
    login,
    uploadAssignment,
    getAssignments,
    updateAssignmentStatus,
} = require('../controllers/user.controller');
const {
    validateRegister,
    validateLogin,
    validateAssignmentUpload,
    checkValidation,
} = require('../middlewares/validation.middleware');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

const router = express.Router();

// Common routes
router.post('/register', validateRegister, checkValidation, register);
router.post('/login', validateLogin, checkValidation, login);

// User-specific routes
router.post(
    '/upload',
    authenticateToken,
    checkRole('user'),
    validateAssignmentUpload,
    checkValidation,
    uploadAssignment
);

// Admin-specific routes
router.get('/assignments', authenticateToken, checkRole('admin'), getAssignments);
router.post('/assignments/:id/status', authenticateToken, checkRole('admin'), updateAssignmentStatus);

module.exports = router;
