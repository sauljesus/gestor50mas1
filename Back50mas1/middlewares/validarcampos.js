const { validationResult } = require('express-validator');

const validarCampos = (req,res,next) =>{
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        console.log(errors);
        return res.status(400).json(errors);
    } 
    next();
}

const validarFile = (req,res,next) =>{
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        console.log(errors);
        return res.status(200).json({ message: 'No se selecciono ningun archivo' });
    } 
    next();
}

module.exports={validarCampos,validarFile}