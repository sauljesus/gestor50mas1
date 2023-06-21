const { generarJWTAlumno, generarJWTUsuario } = require('../helpers/generarJWT');
const Alumno = require ('../models/alumnoModel');
const Usuario = require('../models/usuariosModel');
const jose = require('jose');
const bcrypt = require('bcrypt');

const LoginAlumno = async (req, res) =>{
    const alumno = await Alumno.findOne({
        where: {
            correo : req.body.correo,
            status : 'Activo'
        }
    });
    console.log(req.body.correo);
    if(!alumno) return res.status(404).json({msg: "Usuario no encontrado"});
    if(!alumno.status) return res.status(404).json({msg: "Usuario no encontrado"});
    try{
        const {nombre, apellidoPaterno, correo} = alumno;
        const bol = alumno.boleta;
        if(await bcrypt.compare(req.body.password,alumno.password)){
        // if(true){
            // const id = user.id;
            // const tipoUsuario = user
            const jwt = await generarJWTAlumno(nombre,apellidoPaterno,correo)
            //res.status(200).json({msg: "login Exitoso"});
            return res.send({'jwt':jwt,'info':{nombre,apellidoPaterno,correo}});
        } else{
            res.status(400).json({msg: "Contraseña incorrecta"});
        }
    }catch(err){
        console.log(err);
    }
    
}
const LoginUser = async (req, res) =>{
    const user = await Usuario.findOne({
        where: {
            correo: req.body.correo,
            status : 'Activo'
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    if(!user.status) return res.status(404).json({msg: "Usuario no encontrado"});
    try{
        const {nombre, apellidoPaterno , correo,id,tipoUsuario} = user;
        if(await bcrypt.compare(req.body.password,user.password)){
        // if(true){
            // const id = user.id;
            // const tipoUsuario = user
            const jwt = await generarJWTUsuario(nombre,apellidoPaterno,correo)
            //res.status(200).json({msg: "login Exitoso"});
            return res.send({jwt, id,tipoUsuario});
        } else{
            res.status(400).json({msg: "Contraseña incorrecta"});
        }
    }catch(err){
        console.log(err);
    }
    
}
const validarSesion = async(req,res)=>{
    const accessToken = req.headers['authorization'] 
    console.log("sdsd "+accessToken);
        if(!accessToken) res.send('Acceso denegado, por favor inicia Sesión');
        try {
            const encoder = new TextEncoder();
            const jwtData = await jose.jwtVerify(accessToken, encoder.encode(process.env.JWT_PRIVATE_KEY));
            console.log(jwtData);
            const alu =  await Alumno.findOne({ where: { correo: jwtData.payload.correo } }); 
            console.log(alu.correo);
            console.log(jwtData.payload.correo);
            if(!(jwtData.payload.correo==alu.correo)) {
                res.status(401).json({msg:'Acceso denegado'});
            }else{
                res.status(200).json(alu);
            }
        }catch(err){
            console.log(err.code);
            res.status(401).json({msg:'Hubo un error',code:err.code});
        }
}
module.exports = {
    LoginAlumno,
    LoginUser,
    validarSesion
};