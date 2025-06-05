const express = require('express');
const router = express.Router();
const costController = require('../controllers/costController');

// Dummy route (ќе се користи во дел 3)
router.get('/dummy', costController.dummy);

module.exports = router;
