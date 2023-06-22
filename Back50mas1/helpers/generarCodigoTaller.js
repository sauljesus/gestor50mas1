const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

const generarCodigoTaller  = async() =>{
    const cod = "T";
    const regsitro  =await db.query("SELECT COUNT(*) as total FROM talleres", { type: QueryTypes.SELECT });
    const conteo = regsitro[0].total+1;
    var codt = conteo.toString().padStart(3, '0'); 
    //res.status(200).json({msg:});
    //console.log(regsitro[0].total);
    //console.log(regsitro[0].total.toString().padStart(4, '0'))
    return `${cod}${codt}`;
} 


module.exports = {
    generarCodigoTaller
}