const Driver = require('../models/Driver');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id, role: 'driver' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerDriver = async (req, res) => {
    try {
        const { name, email, password, vehicleDetails } = req.body;
        const driverExists = await Driver.findOne({ email });
        if (driverExists) return res.status(400).json({ message: 'Driver already exists' });

        const driver = await Driver.create({ name, email, password, vehicleDetails });
        if (driver) {
            res.status(201).json({
                _id: driver.id, name: driver.name, email: driver.email, token: generateToken(driver._id)
            });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;
        const driver = await Driver.findOne({ email });
        if (driver && (await driver.matchPassword(password))) {
            res.json({ _id: driver.id, name: driver.name, email: driver.email, token: generateToken(driver._id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getDriverData = (req, res) => {
    res.json({ message: 'Driver route works', driver: req.user });
};
