const express = require('express');
const router = express.Router();
const certificadoController = require('../controller/certificados');

router.get('/certificados', certificadoController.getCertificados);

router.get('/certificado/:codigoCertificado', certificadoController.getCertificadoByCodigo);

router.post('/requestc/:folioCertificado',certificadoController.posrCertificado);

router.put('/certstatus/:folioCertificado',certificadoController.updateCert);


module.exports = router;