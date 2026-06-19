const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        const admin = await Admin.create({ name, email, password });
        if (admin) {
            res.status(201).json({
                _id: admin.id, name: admin.name, email: admin.email, token: generateToken(admin._id)
            });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            res.json({ _id: admin.id, name: admin.name, email: admin.email, token: generateToken(admin._id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAdminData = (req, res) => {
    res.json({ message: 'Admin route works', admin: req.user });
};
