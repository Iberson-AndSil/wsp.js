const express = require('express');
const { getQRCode } = require('../controllers/scheduleController');
const router = express.Router();

router.get('/qr-code', getQRCode);

module.exports = router;