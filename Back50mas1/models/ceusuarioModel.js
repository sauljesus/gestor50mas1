const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

// Definir el modelo de la tabla certificado
const Ceusuario = db.define('ceusuario', {
  boleta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 16]
    }
  },
  fechaIngreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaTermino: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estadoPermanencia: {
    type: DataTypes.STRING,
    allowNull: false,
    enum: ['Baja', 'Inscrito', 'Termino'],
    validate: {
      notEmpty: true,
    }
  },
  talleresCursados: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 16]
    }
  },
  promedio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 4]
    }
  }
},{
  freezeTableName: true 
});
  
  // Exportar el modelo
  module.exports = Ceusuario;
