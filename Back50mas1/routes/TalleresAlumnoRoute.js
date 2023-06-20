const express = require('express');
const router = express.Router();
const talleresAlumnoController = require('../controller/talleresAlumno');

router.get('/miGrupo/:grupo', talleresAlumnoController.getMiGrupo);

router.post('/setCalificaciones/:grupo', talleresAlumnoController.setCalificaciones);

router.put('/setcertificado', talleresAlumnoController.setCertificado);

router.get('/studentcert/:boleta', talleresAlumnoController.getCertsbyboleta);


module.exports = router;