const User = require ('../models/alumnoModel');
const argon2 = require('argon2');

const getTest = async(req,res) => {
    res.status(200).json({msg:'Hola TT-B063'});
}

const getAlumnos = async(req ,res) => {
    try{
        const response = await User.findAll({
            attributes:['boleta','nombre','apellidoPaterno','apellidoMaterno', 'correo','tipoUsuario','createdAt','status'] //Falta usrpic en db
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
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
        const response = await User.findOne({
            attributes:['nombre','apellidoPaterno','apellidoMaterno', 'correo','tipoUsuario'], //Falta usrpic en db
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
        const response = await User.findOne({
            attributes:['boleta','nombre','apellidoPaterno','apellidoMaterno','curp','rfc','estadoCivil','calle','numero','colonia','municipio','estado','CP','telefono','celular','correo','password','edad','nivelAcademico','sexo','hijos','nivelAHijos','trabaja','Empresa','direccionEmpresa','registroMedico','tipoUsuario','status'],//Falta usrpic en db;
            where: {
                boleta: req.params.boleta
            }
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

const updateAlumno = async(req ,res) => {
    const user = await User.findOne({
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
        await User.update({
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
const deleteAlumno = async(req ,res) => {
    const user = await User.findOne({
        where: {
           correo: req.params.correo
       }
   });
   if(!user) return res.status(404).json({msg:"Usuario no encontrado"});
   try{
    await User.update({
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
 module.exports = {
    getTest,
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumno,
    getAlumnoByBoleta,
};