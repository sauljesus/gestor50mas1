const express = require('express');
const router = express.Router();
const profesoresController = require('../controller/profesores');


router.get('/profesores', profesoresController.getProfesores);

module.exports = router;