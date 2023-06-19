const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const uploadController = require('../controller/Excel');
const { validarCampos,validarFile } = require('../middlewares/validarcampos');

router.post('/upload',uploadController.uploadFile);

module.exports = router;