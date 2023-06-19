const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarcampos');
const { validartoken } = require('../middlewares/validarJWT');
const {getTest,getAlumnos,getAlumnoByBoleta,updateAlumnoedit,createAlumno, getLog} = require('../controller/alumnos');


 
router.get('/us',getTest);
router.get('/alumnos', getAlumnos);
router.post('/alumno',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno','El Apellido Paterno es obligatorio').not().isEmpty(),
    check('password','El password debe de ser de más de 8 letras').isLength({min: 8}),
    check('correo','El correo no es valido').isEmail(),
    validarCampos
], createAlumno);
router.get('/alumno/:boleta', getAlumnoByBoleta);
router.put('/alumnoedit/:boleta',updateAlumnoedit);

router.post('/login',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatoria').not().isEmpty(),
    validarCampos
], getLog);


module.exports = router;