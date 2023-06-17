const express = require('express'); 
const router = express.Router();
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validarcampos');
const { validartoken } = require('../middlewares/validarJWT');
const usuarioController = require('../controller/usuarios');


router.get('/usuarios', usuarioController.getUsers);

module.exports = router;