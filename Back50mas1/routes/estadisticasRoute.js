const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarcampos');
const { validartoken } = require('../middlewares/validarJWT');
const estadisticaController = require('../controller/estadisticas');

router.get('/estadistica', estadisticaController.getTest);
router.get('/estadistica1', estadisticaController.getEstadistica1);
router.get('/estadistica2', estadisticaController.getEstadistica2);
router.get('/estadistica3', estadisticaController.getEstadistica3);
router.get('/estadistica4', estadisticaController.getEstadistica4);

module.exports = router;