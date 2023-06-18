const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

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
            let estado = parseInt(array[element],10)>5?"Aprobada":"Reprobada";
            const [results, metadata] = await db.query(`UPDATE talleres_alumno SET calificacion = ${array[element]}, estado = '${estado}' WHERE boleta = ${element} AND codigo_taller = '${req.params.grupo}';`);
        }
        res.status(200).json({ msg: "OK" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getMiGrupo,
    setCalificaciones,
};