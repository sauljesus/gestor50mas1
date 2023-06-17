const {Sequelize}  = require('sequelize');

// server
// const db = new Sequelize('eboard','sjmartinez','Ma39404116tt',{
//     host: "localhost",
//     dialect: "mariadb"
// }) 

// local
const db = new Sequelize('grades','root','',{
    host: "localhost",
    dialect: "mariadb"
}) 
   
module.exports = db;