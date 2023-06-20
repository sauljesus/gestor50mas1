const { QueryTypes } = require('sequelize');
const db = require('../config/Database');
const Talumno = require('../models/TalleresAlumnosModel');

const getMiGrupo = async (req, res) => {
    try {
        const response = await db.query(`SELECT A.boleta, calificacion, nombre, apellidoPaterno, apellidoMaterno FROM talleres_alumno A, alumno B WHERE A.boleta = B.boleta AND codigo_taller = '${req.params.grupo}';`, { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const setCalificaciones = async (req, res) => {
    try {
        let array = req.body;
        for (const element in array) {
            let estado = parseInt(array[element], 10) > 5 ? "Aprobada" : "Reprobada";
            const [results, metadata] = await db.query(`UPDATE talleres_alumno SET calificacion = ${array[element]}, estado = '${estado}' WHERE boleta = ${element} AND codigo_taller = '${req.params.grupo}';`);
        }
        res.status(200).json({ msg: "OK" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
}

const getTalleresInscrito = async (req, res) => {
    try {
        const response = await db.query(`SELECT A.codigo_taller, A.nombre, B.estado, B.calificacion FROM talleres A, talleres_alumno B WHERE A.codigo_taller = B.codigo_taller AND boleta = '${req.params.boleta}';`, { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const inscribirATaller = async (req, res) => {
    const { alumno, taller } = req.body;
    console.log(alumno);
    console.log(taller);
    try {
        const response = await db.query(`SELECT count(*) as total, correo FROM talleres WHERE codigo_taller = '${taller}'`, { type: QueryTypes.SELECT });
        if (response[0].total === 0) {
            res.status(200).json({ data: response, msg: 'No se encontró el taller' });
        } else {
            try {
                await Talumno.create({
                    boleta: alumno,
                    codigo_taller: taller,
                    correo: response[0].correo
                })
                res.status(201).json({ msg: "Registro Exitoso" });
            } catch (error) {
                console.log(error);
                res.status(400).json({ msg: error.message });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}


const setCertificado = async (req, res) => {
    const {folioCertificado , boleta , codigo_taller } = req.body;
    try {
        await Talumno.update({
            folioCertificado: folioCertificado, 
        }, {
            where: {
                boleta: boleta,
                codigo_taller: codigo_taller
            }
        });
        res.status(200).json({ msg: "Tabla actualizada" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
}

const getCertsbyboleta = async(req ,res) => {
    try{
        const response = await Talumno.findAll({
            attributes:['boleta','codigo_taller','calificacion','estado','folioCertificado'],//Falta usrpic en db;
            where: {
                boleta: req.params.boleta
            }
        });
        console.log(response)
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    getMiGrupo,
    setCalificaciones,
    getTalleresInscrito,
    inscribirATaller,
    setCertificado,
    getCertsbyboleta
};