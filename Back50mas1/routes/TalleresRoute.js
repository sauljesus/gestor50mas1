const express = require('express');
const router = express.Router();
const talleresController = require('../controller/talleres');



router.get('/talleres', talleresController.getTalleres);

router.put('/tallercreate', talleresController.createtaller);

router.put('/inscribirtaller', talleresController.createtaller);

module.exports = router;