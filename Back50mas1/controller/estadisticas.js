const argon2 = require('argon2');
const {Router} = require('express');
const { check } = require('express-validator'); 
const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

const getTest = async(req,res) => {
    res.status(200).json({msg:'Hola TT-B063'});
}

const getEstadistica1 = async(req ,res) => {
    try{
        const response = await db.query("SELECT COUNT(*) as total, calificacion FROM talleres_alumno GROUP BY calificacion", { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}
const getEstadistica2 = async(req ,res) => {
    try{
        const response = await db.query("SELECT COUNT(*) as total, nivelAcademico FROM alumno GROUP BY nivelAcademico", { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}
const getEstadistica3 = async(req ,res) => {
    try{
        const response = await db.query("SELECT COUNT(*) as total, A.codigo_taller, B.nombre FROM talleres_alumno A, talleres B WHERE A.codigo_taller = B.codigo_taller GROUP BY A.codigo_taller LIMIT 8", { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}
const getEstadistica4 = async(req ,res) => {
    try{
        const response = await db.query("SELECT SUM(CASE WHEN edad < 30 THEN 1 ELSE 0 END) AS 'Menor de 30', SUM(CASE WHEN edad > 29 AND edad < 40 THEN 1 ELSE 0 END) AS '30 - 39', SUM(CASE WHEN edad > 39 AND edad < 50 THEN 1 ELSE 0 END) AS '40 - 49', SUM(CASE WHEN edad > 49 AND edad < 60 THEN 1 ELSE 0 END) AS '50 - 59', SUM(CASE WHEN edad > 59 THEN 1 ELSE 0 END) AS 'Más de 60' FROM alumno;", { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}


module.exports = {
    getTest,
    getEstadistica1,
    getEstadistica2,
    getEstadistica3,
    getEstadistica4,
};