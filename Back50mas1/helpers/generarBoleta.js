const { QueryTypes } = require('sequelize');
const db = require('../config/Database');

const generarBoleta  = async() =>{
    const toDay = new Date();
    console.log("log directo: ",toDay.toLocaleString("es-MX", {timeZone: "America/Chihuahua"}))
    var today = toDay.toLocaleDateString("es-MX", {timeZone: "America/Chihuahua"}).split("/");
     var year = today[2];
     var mes = today[1];
     var dia = today[0];
    const regsitro  =await db.query("SELECT COUNT(*) as total FROM alumno", { type: QueryTypes.SELECT });
    const conteo = regsitro[0].total+1;
    var boleta = conteo.toString().padStart(4, '0'); 
    //res.status(200).json({msg:});
    //console.log(regsitro[0].total);
    //console.log(regsitro[0].total.toString().padStart(4, '0'))
    return `${year}${mes}${dia}${boleta}`;
} 


module.exports = {
    generarBoleta
}