const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarcampos');
const { validartoken } = require('../middlewares/validarJWT');
const certificadoController = require('../controller/certificados');

router.get('/certificados', certificadoController.getCertificados);
router.get('/certificado/:codigoCertificado', certificadoController.getCertificadoByCodigo);

module.exports = router;