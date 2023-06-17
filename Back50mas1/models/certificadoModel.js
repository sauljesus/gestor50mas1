const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

// Definir el modelo de la tabla certificado
const Certificado = db.define('certificado',{
  folioCertificado:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate:{
          notEmpty: true,
          len: [1, 15]
      }
  },
  estado:{
    type: DataTypes.STRING,
    allowNull: false,
    enum: ['Generado','Pendiente'],
    validate:{
        notEmpty: true,
    }
  },
  fechaExpedicion:{
      type: DataTypes.DATE,
      allowNull: false,
  }
},{
  freezeTableName: true 
});
  
  // Exportar el modelo
  module.exports = Certificado;


 