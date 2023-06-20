const Alumno = require ('../models/alumnoModel');
const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const { generarBoleta} = require('../helpers/generarBoleta');
const getTest = async(req,res) => {
    var boleta =await generarBoleta();
    res.status(200).json({msg:boleta});
}
const getAlumnos = async(req ,res) => {
    try{
        const response = await Alumno.findAll({
            attributes:['boleta','nombre','apellidoPaterno','apellidoMaterno', 'correo','createdAt','status'] //Falta usrpic en db
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}
const getAlumno = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM alumno';
      const alumnos = await connection.query(query);
  
      connection.release();
  
      res.json(alumnos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving students' });
    }
  };
const getAlumnoById = async(req ,res) => {
    try{
        const response = await Alumno.findOne({
            attributes:['nombre','apellidoPaterno','apellidoMaterno', 'correo'], //Falta usrpic en db
            where: {
                correo: req.params.correo
            }
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}
const getAlumnoByBoleta = async(req ,res) => {
    try{
        console.log(req.params.boleta);
        const response = await Alumno.findOne({
            attributes:['boleta','nombre','apellidoPaterno','apellidoMaterno',
                        'curp','rfc','estadoCivil','calle','numero','colonia',
                        'municipio','estado','CP','telefono','celular','correo',
                        'password','edad','nivelAcademico','sexo','hijos','nivelAHijos',
                        'trabaja','Empresa','direccionEmpresa','registroMedico','status'],//Falta usrpic en db;
            where: {
                boleta: req.params.boleta
            }
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}
const createAlumno = async(req ,res) => {
    const {nombre, apellidoPaterno, apellidoMaterno, curp, rfc, estadoCivil, calle, 
            numero, colonia, municipio, estado, CP, telefono, celular, correo, password, confpassword,  
            edad, nivelAcademico, sexo, hijos, nivelAHijos, trabaja, empresa, direccionEmpresa, 
            registroMedico, tipoUsuario} = req.body;
    console.log(empresa);
    const boleta = await generarBoleta();
    console.log(boleta);
    if(password !== confpassword) return res.status(400).json({msg: "Las contraseñas no coinciden"});
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await Alumno.create({
            boleta: boleta,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno, 
            apellidoMaterno: apellidoMaterno,
            curp:curp,
            rfc:rfc,
            estadoCivil:estadoCivil,
            calle:calle,
            numero:numero,
            colonia:colonia,
            municipio:municipio,
            estado:estado,
            CP:CP,
            telefono:telefono,
            celular:celular,
            correo:correo,
            password: hashedPassword,
            edad:edad,
            nivelAcademico:nivelAcademico,
            sexo:sexo,
            hijos:hijos,
            nivelAHijos:nivelAHijos,
            trabaja:trabaja,
            empresa:req.body.empresa,
            direccionEmpresa:direccionEmpresa,
            registroMedico:registroMedico,
            status:'Activo', 
            tipoUsuario: tipoUsuario
        });
        res.status(201).json({msg: "Registro Exitoso"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}
const updateAlumno = async(req ,res) => {
    const user = await Alumno.findOne({
         where: {
            correo: req.params.correo
        }
    });
    if(!user) return res.status(404).json({msg:"Usuario no encontrado"});
    const {nombre, apellidoPaterno, apellidoMaterno, curp, rfc, estadoCivil, calle, 
        numero, colonia, municipio, estado, CP, telefono, celular, password, confpassword,  
        edad, nivelAcademico, sexo, hijos, nivelAHijos, trabaja, empresa, direccionEmpresa, 
        registroMedico, tipoUsuario} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confpassword) return res.status(400).json({msg: "Las contraseñas no coinciden"});
    try{
        await Alumno.update({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno, 
            apellidoMaterno: apellidoMaterno,
            curp:curp,
            rfc:rfc,
            estadoCivil:estadoCivil,
            calle:calle,
            numero:numero,
            colonia:colonia,
            municipio:municipio,
            estado:estado,
            CP:CP,
            telefono:telefono,
            celular:celular,
            edad:edad,
            nivelAcademico:nivelAcademico,
            sexo:sexo,
            hijos:hijos,
            nivelAHijos:nivelAHijos,
            trabaja:trabaja,
            empresa:empresa,
            direccionEmpresa:direccionEmpresa,
            registroMedico:registroMedico,
            tipoUsuario: tipoUsuario
        },{
            where:{
                correo:user.correo
            }
        });
        res.status(200).json({msg: "Usuario Actualizado"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}
const updateAlumnoedit = async(req ,res) => {
    const user = await Alumno.findOne({
         where: {
            boleta: req.params.boleta
        }
    });
    if(!user) return res.status(404).json({msg:"Usuario no encontrado"});
    const {boleta,nombre, apellidoPaterno, apellidoMaterno, edad, sexo,curp, rfc,celular, estadoCivil, calle, 
        numero, colonia, CP,municipio, estado} = req.body;
        console.log(req.body);
    try{
        await Alumno.update({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno, 
            apellidoMaterno: apellidoMaterno,
            curp:curp,
            rfc:rfc,
            estadoCivil:estadoCivil,
            calle:calle,
            numero:numero,
            colonia:colonia,
            municipio:municipio,
            estado:estado,
            CP:CP,
            celular:celular,
            edad:edad,
            sexo:sexo,
        },{
            where:{
                boleta:boleta
            }
        });
        res.status(200).json({msg: "Usuario Actualizado"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}
const deleteAlumno = async(req ,res) => {
    const user = await Alumno.findOne({
        where: {
           correo: req.params.correo
       }
   });
   if(!user) return res.status(404).json({msg:"Usuario no encontrado"});
   try{
    await Alumno.update({
       status: 'Inactivo'
    },{
        where:{
            correo:user.correo
        }
    });
       res.status(200).json({msg: "Usuario Eliminado"});
   } catch(error){
       res.status(400).json({msg: error.message});
   }
}


const getLog = async (req, res) => {

    const { correo, password } = req.body;

    const user = await Alumno.findOne({
        where: {
            correo: correo
        }
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    // Comparar la contraseña encriptada almacenada con la proporcionada en el inicio de sesión

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(user.password)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
        res.status(401).json({ error: 'Contraseña incorrecta' });
        return;
    }

    try {
        // Generar un token JWT
        const token = jwt.sign(
            { correo: user.correo },
            'secreto_del_token',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    getTest,
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumno,
    getAlumnoByBoleta,
    updateAlumnoedit,
    getLog,
};