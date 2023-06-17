//const { response , request } = require('express');
const jose = require('jose');
 
   const validartoken = async (req,res,next)=>{
   const accessToken = req.headers['authorization'] 
   console.log("sdsd "+accessToken);
    if(!accessToken) res.send('Acceso denegado, por favor inicia Sesión');
    try {
        const encoder = new TextEncoder();
        const jwtData = await jose.jwtVerify(accessToken, encoder.encode(process.env.JWT_PRIVATE_KEY));
        console.log(jwtData);
        if(!(jwtData.payload.correo==req.params.correo)) {
            res.status(401).json({msg:'Acceso denegado'});
        }else{
            next();
        }
    }catch(err){
        console.log(err.code);
        res.status(401).json({msg:'Hubo un error',code:err.code});
    }
    
}

module.exports = {validartoken};