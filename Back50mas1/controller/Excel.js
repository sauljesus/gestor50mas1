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
const fs = require('fs');
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
      console.log(tables);

      for (let i = 0; i < workbook.SheetNames.length; i++){  
        if(workbook.SheetNames[i]=="Alumnos"){  
          const worksheealumnos = workbook.Sheets[workbook.SheetNames[i]];
          const alumnos = xlsx.utils.sheet_to_json(worksheealumnos);
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
        }else if(workbook.SheetNames[i]=="Talleres"){  
          const worksheetalleres = workbook.Sheets[workbook.SheetNames[i]];
          const talleres = xlsx.utils.sheet_to_json(worksheetalleres);

          for (let c = 0; c < talleres.length; c++){
            jsonDatasavecursos = talleres[c];
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
      } else if(workbook.SheetNames[i]=="Profesores"){  
        const worksheetusuarios = workbook.Sheets[workbook.SheetNames[i]];
        const usuarios = xlsx.utils.sheet_to_json(worksheetusuarios);
        for (let u = 0; u < usuarios.length; u++){
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
    }else {   return res.status(200).json({ message: 'La Hoja'+workbook.SheetNames[i]+'es incorrecta o no pertenece a una tabla en la base de datos' });
  }
  }

    // Borrar el archivo después de utilizarlo
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.error('Error borrando el archivo', error);
      } else {
        console.log('File deleted');
      }
    });

      return res.status(200).json({ message: 'Carga de Excel completada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error processing the uploaded file' });
    }
  });

};




module.exports = {
    uploadFile
};