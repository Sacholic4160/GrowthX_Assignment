const User = require('../models/user.model');
const Assignment = require('../models/assignment.model');
const jwt = require('jsonwebtoken');

// Register a user or admin
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role provided' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login a user or admin
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Upload an assignment (user only)
exports.uploadAssignment = async (req, res) => {
    try {
        const { task, adminId } = req.body;

        const admin = await User.findOne({ _id: adminId, role: 'admin' });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const assignment = new Assignment({
            userId: req.user.id,
            task,
            admin: adminId,
        });

        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get assignments (admin only)
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'name email');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Accept or reject an assignment (admin only)
exports.updateAssignmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const assignment = await Assignment.findOneAndUpdate(
            { _id: id, admin: req.user.id },
            { status },
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        res.json({ message: `Assignment ${status}` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
