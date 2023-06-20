const { QueryTypes } = require('sequelize');
const db = require('../config/Database');
const Certificado = require('../models/certificadoModel');

const getTest = async (req, res) => {
    res.status(200).json({ msg: 'Hola TT-B063' });
};

const getCertificados = async (req, res) => {
    try {
        const response = await db.query(
            "SELECT C.folioCertificado, C.estado, C.fechaExpedicion, A.boleta, T.nombre FROM certificado C, talleres_alumno A, talleres T WHERE C.folioCertificado = A.folioCertificado AND A.codigo_taller = T.codigo_taller;",
            { type: QueryTypes.SELECT }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getCertificadoByCodigo = async (req, res) => {
    try {
        const response = await db.query(
            `SELECT A.nombre, A.apellidoPaterno, A.apellidoMaterno, B.nombre as taller, B.periodo, C.calificacion FROM alumno A, talleres B, talleres_alumno C WHERE C.boleta = A.boleta AND B.codigo_taller = C.codigo_taller AND C.folioCertificado = '${req.params.codigoCertificado}'`,
            { type: QueryTypes.SELECT }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const posrCertificado = async (req, res) => {
var today = new Date();
    try {
        await Certificado.create({
            folioCertificado: req.params.folioCertificado,
            estado: 'Pendiente',
            fechaExpedicion:today,
        });
        res.status(201).json({ msg: 'Certificado creado' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

 module.exports = {
    getTest,
    getCertificados,
    getCertificadoByCodigo,
    posrCertificado
};