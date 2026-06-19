const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminAuth } = require('../middlewares/authMiddleware');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', protect, adminAuth, adminController.getAdminData);

module.exports = router;
