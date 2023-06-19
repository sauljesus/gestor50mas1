const Alumno = require ('../models/alumnoModel');
const Course = require ('../models/TalleresModel');
const User = require ('../models/usuariosModel');
const argon2 = require('argon2');
const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const {Router} = require('express');
const { check } = require('express-validator'); 
const Users = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const { generarBoleta} = require('../helpers/generarBoleta');
let jsonDatasave;
let jsonDatasaveu;
let jsonDatasavecursos;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio de destino para guardar los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const filePath = req.file.path;

      try {
      const workbook = xlsx.readFile(filePath);
      const tables= workbook.SheetNames;
     // console.log(tables);
        // Leer la primera hoja de cálculo
        const worksheet1 = workbook.Sheets[workbook.SheetNames[0]];
        const alumnos = xlsx.utils.sheet_to_json(worksheet1);

        // Leer la segunda hoja de cálculo
        const worksheet2 = workbook.Sheets[workbook.SheetNames[1]];
        const cursos = xlsx.utils.sheet_to_json(worksheet2);

        // Leer la segunda hoja de cálculo
        const worksheet3 = workbook.Sheets[workbook.SheetNames[2]];
        const usuarios = xlsx.utils.sheet_to_json(worksheet3);
    
        for (let i = 0; i < alumnos.length; i++){
          jsonDatasave = alumnos[i];
          const hashedPassword = await bcrypt.hash(jsonDatasave.password, 10);
          console.log(hashedPassword);
          try{
            await Alumno.create({
                boleta: await generarBoleta(),
                nombre: jsonDatasave.nombre,
                apellidoPaterno: jsonDatasave.apellidoPaterno, 
                apellidoMaterno: jsonDatasave.apellidoMaterno,
                curp: jsonDatasave.curp,
                rfc: jsonDatasave.rfc,
                estadoCivil: jsonDatasave.estadoCivil,
                calle: jsonDatasave.calle,
                numero: jsonDatasave.numero,
                colonia: jsonDatasave.colonia,
                municipio: jsonDatasave.municipio,
                estado:jsonDatasave.estado,
                CP: jsonDatasave.CP,
                telefono:jsonDatasave.telefono,
                celular: jsonDatasave.celular,
                correo:  jsonDatasave.correo,
                password: hashedPassword,
                edad: jsonDatasave.edad,
                nivelAcademico: jsonDatasave.nivelAcademico,
                sexo:jsonDatasave.sexo,
                hijos: jsonDatasave.hijos,
                nivelAHijos: jsonDatasave.nivelAHijos,
                trabaja: jsonDatasave.trabaja,
                empresa: jsonDatasave.empresa,
                direccionEmpresa: jsonDatasave.direccionEmpresa,
                registroMedico: jsonDatasave.registroMedico,
                tipoUsuario: jsonDatasave.tipoUsuario,
                status: jsonDatasave.status,
            });
          } catch (error) {
            console.error(error);
            //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
          }
        }

        for (let c = 0; c < cursos.length; c++){
          console.log(cursos[c]);
          jsonDatasavecursos = cursos[c];
          try{
            await Course.create({
              codigo_taller: jsonDatasavecursos.codigo_taller,
              nombre: jsonDatasavecursos.nombre,
              descripcion: jsonDatasavecursos.descripcion, 
              periodo: jsonDatasavecursos.periodo,
            });
          } catch (error) {
            console.error(error);
            //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
          }
        }

        for (let u = 0; u < usuarios.length; u++){
          console.log(usuarios[u]);
          jsonDatasaveu = usuarios[u];
          const hashedPasswordu = await bcrypt.hash(jsonDatasaveu.password, 10);
          try{
            await Users.create({
              nombre: jsonDatasaveu.nombre,
              apellidoPaterno : jsonDatasaveu.apellidoPaterno,
              apellidoMaterno: jsonDatasaveu.apellidoMaterno,
              correo: jsonDatasaveu.correo,
              password:	 hashedPasswordu,
              tipoUsuario:	jsonDatasaveu.tipoUsuario,
              status:	jsonDatasaveu.status,
              inicioLaboral:	jsonDatasaveu.inicioLaboral,
        
            });
          } catch (error) {
            console.error(error);
            //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
          }
        }

      return res.status(200).json({ message: 'Carga de Excel completada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error processing the uploaded file' });
    }
  });

};


const masiveCharge = async(req ,res) => {
  try{
    await Alumno.create({
        boleta: await generarBoleta(),
        nombre: jsonDatasave.nombre,
        apellidoPaterno: jsonDatasave.apellidoPaterno, 
        apellidoMaterno: jsonDatasave.apellidoMaterno,
        curp: jsonDatasave.curp,
        rfc: jsonDatasave.rfc,
        estadoCivil: jsonDatasave.estadoCivil,
        calle: jsonDatasave.calle,
        numero: jsonDatasave.numero,
        colonia: jsonDatasave.colonia,
        municipio: jsonDatasave.municipio,
        estado:jsonDatasave.estado,
        CP: jsonDatasave.CP,
        telefono:jsonDatasave.telefono,
        celular: jsonDatasave.celular,
        correo:  jsonDatasave.correo,
        password: jsonDatasave.password,
        edad: jsonDatasave.edad,
        nivelAcademico: jsonDatasave.nivelAcademico,
        sexo:jsonDatasave.sexo,
        hijos: jsonDatasave.hijos,
        nivelAHijos: jsonDatasave.nivelAHijos,
        trabaja: jsonDatasave.trabaja,
        empresa: jsonDatasave.empresa,
        direccionEmpresa: jsonDatasave.direccionEmpresa,
        registroMedico: jsonDatasave.registroMedico,
        tipoUsuario: jsonDatasave.tipoUsuario,
        status: jsonDatasave.status,
    });
    return res.status(200).json({ message: 'Carga de infomacion a la BD realizada con exito' });
  } catch (error) {
    console.error(error);
    //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
  }

}

const masiveChargecursos = async(req ,res) => {
  try{
    await Course.create({
      codigo_taller: jsonDatasavecursos.codigo_taller,
      nombre: jsonDatasavecursos.nombre,
      descripcion: jsonDatasavecursos.descripcion, 
      periodo: jsonDatasavecursos.periodo,
    });
    return res.status(200).json({ message: 'Carga de infomacion a la BD realizada con exito' });
  } catch (error) {
    console.error(error);
    //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
  }

}

const mschargeusers = async (req ,res) => {
  try{
    await Users.create({
      nombre: jsonDatasaveu.nombre,
      apellidoPaterno : jsonDatasaveu.apellidoPaterno,
      apellidoMaterno: jsonDatasaveu.apellidoMaterno,
      correo: jsonDatasaveu.correo,
      password:	 jsonDatasaveu.password,
      tipoUsuario:	jsonDatasaveu.tipoUsuario,
      status:	jsonDatasaveu.status,
      inicioLaboral:	jsonDatasaveu.inicioLaboral,

    });
    return res.status(200).json({ message: 'Carga de infomacion a la BD realizada con exito' });
  } catch (error) {
    console.error(error);
    //return res.status(500).json({ error: 'Ocurrio un error al realizar la carga' });
  }

}
module.exports = {
    uploadFile
};