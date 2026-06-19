const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const { protect, driverAuth } = require('../middlewares/authMiddleware');

router.post('/register', driverController.registerDriver);
router.post('/login', driverController.loginDriver);
router.get('/', protect, driverAuth, driverController.getDriverData);

module.exports = router;
