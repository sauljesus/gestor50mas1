const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { LoginAlumno,LoginUser,LogOut,validarSesionAlu,validarSesionUser} = require('../controller/Auth');
const { validartoken } = require('../middlewares/validarJWT');

router.post('/loginAlumno',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatoria').not().isEmpty(),
    validarCampos
], LoginAlumno);

router.post('/loginUser',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatoria').not().isEmpty(),
    validarCampos
], LoginUser);
 router.get('/checkJwt',validarSesionAlu)
 router.get('/checkJwtUser',validarSesionUser)


module.exports = router;