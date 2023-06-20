//const { response , request } = require('express');
const jose = require('jose');
const Alumno = require ('../models/alumnoModel');
 
   const validartoken = async (req,res,next)=>{
   const accessToken = req.headers['authorization'] 
   console.log("sdsd "+accessToken);
    if(!accessToken) res.send('Acceso denegado, por favor inicia Sesión');
    try {
        const encoder = new TextEncoder();
        const jwtData = await jose.jwtVerify(accessToken, encoder.encode(process.env.JWT_PRIVATE_KEY));
        const alu =  await Alumno.findOne({ where: { correo: jwtData.payload.correo } }); 
        console.log(alu.correo);
        console.log(jwtData.payload.correo);
        if(!(jwtData.payload.correo==alu.correo)) {
            res.status(401).json({msg:'Acceso denegado'});
        }else{
            next();
        }
    }catch(err){
        console.log(err.code);
        res.status(401).json({msg:'Hubo un errorasa',code:err.code});
    }
    
}

module.exports = {validartoken};