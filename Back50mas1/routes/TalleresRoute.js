const express = require('express');
const router = express.Router();
const talleresController = require('../controller/talleres');


router.get('/testt',talleresController.getTestM);
router.get('/talleres', talleresController.getTalleres);

router.get('/misTalleres/:correo', talleresController.getTalleresByCorreo);

router.post('/tallercreate', talleresController.createtaller);

router.put('/inscribirtaller', talleresController.createtaller);

router.get('/taller/:taller', talleresController.getTaller);

router.put('/talleredit/:taller',talleresController.updateTalleredit);

router.put('/tallerbycode/:codigo_taller',talleresController.getTallerbycode);

router.get('/taller/:taller', talleresController.getTaller);

router.put('/talleredit/:taller',talleresController.updateTalleredit);



module.exports = router;