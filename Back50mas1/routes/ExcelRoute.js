const express = require('express');
const router = express.Router();
const uploadController = require('../controller/Excel');

router.post('/upload', uploadController.uploadFile);

module.exports = router;