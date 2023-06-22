const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarcampos');
const { validartoken } = require('../middlewares/validarJWT');
const {getTest,getAlumnos,getAlumnoByBoleta,updateAlumnoedit,createAlumno, getLog} = require('../controller/alumnos');


 
router.get('/us',getTest);
router.get('/alumnos', getAlumnos);
router.post('/alumno', createAlumno);
router.get('/alumno/:boleta', getAlumnoByBoleta);
router.put('/alumnoedit/:boleta',updateAlumnoedit);


module.exports = router;