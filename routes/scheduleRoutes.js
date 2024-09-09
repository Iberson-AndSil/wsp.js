const express = require('express');
const upload = require('../utils/multerConfig');
const { scheduleMessages } = require('../controllers/scheduleController');
const router = express.Router();

router.post('/schedule', upload.array('images', 4), scheduleMessages);

module.exports = router;
