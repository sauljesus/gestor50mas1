const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

const generarBoleta  = async() =>{
    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth() + 1;
    var me = mes < 10 ? '0' + mes : mes;
    const regsitro  =await db.query("SELECT COUNT(*) as total FROM alumno", { type: QueryTypes.SELECT });
    const conteo = regsitro[0].total+1;
    var boleta = conteo.toString().padStart(4, '0'); 
    //res.status(200).json({msg:});
    //console.log(regsitro[0].total);
    //console.log(regsitro[0].total.toString().padStart(4, '0'))
    return `${year}${me}${boleta}`;
} 


module.exports = {
    generarBoleta
}