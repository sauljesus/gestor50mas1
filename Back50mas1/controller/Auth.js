const { generarJWTAlumno, generarJWTUsuario } = require('../helpers/generarJWT');
const Alumno = require ('../models/alumnoModel');
const Usuario = require('../models/usuariosModel');
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
        const tipoUsuario = 'alumno'
        //const isPasswordValid =  ;
        // console.log(alumno.password)
        // console.log(isPasswordValid)
        if(await bcrypt.compare(req.body.password,alumno.password)){
        // if(true){
            // const id = user.id;
            // const tipoUsuario = user
            const jwt = await generarJWTAlumno(nombre,apellidoPaterno,correo)
            //res.status(200).json({msg: "login Exitoso"});
            return res.send({jwt, correo,tipoUsuario});
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
const LogOut = (req, res) =>{
    console.log("Cerraste sesion");
}
module.exports = {
    LoginAlumno,
    LoginUser,
    LogOut
};