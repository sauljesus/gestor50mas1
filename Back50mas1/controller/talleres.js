const Talleres = require ('../models/TalleresModel');
const argon2 = require('argon2');
const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

const getTestM = async(req,res) => {
    res.status(200).json({msg:'Test Talleres'});
}

const getTalleres = async(req ,res) => {
    try{
        const response = await Talleres.findAll({
            attributes:['codigo_taller','nombre','descripcion','periodo'] //Falta usrpic en db
        });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}


const createtaller = async(req ,res) => {
    const {codigo_taller,nombre,descripcion,periodo} = req.body;
        console.log(req.body);
    try{
        await Talleres.create({
            codigo_taller:codigo_taller,
            nombre: nombre,
            descripcion:descripcion,
            periodo:periodo,
        });
        res.status(200).json({msg: "Taller Creado exitosamente"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}

const getTalleresByCorreo = async(req ,res) => {
    try{
        const response = await db.query(`SELECT codigo_taller, periodo, A.nombre as taller, B.nombre, B.apellidoPaterno, B.apellidoMaterno from talleres A, usuarios B WHERE A.correo = B.correo AND A.correo = '${req.params.correo}';`, { type: QueryTypes.SELECT });
        res.status(200).json(response);
    } catch(error){
        res.status(500).json({msg: error.message}); 
    }
}

 module.exports = {
    getTestM,
    getTalleres,
    createtaller,
    getTalleresByCorreo,
};