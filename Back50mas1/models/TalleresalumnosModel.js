const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

const Talumno = db.define('talleres_alumno',{
    boleta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 16]
        }
    },
    codigo_taller:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 11]
        }
    }, 
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    }, 
    calificacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 4]
        }
    },
    estado:{
      type: DataTypes.STRING,
      allowNull: false,
      enum: ['Aprobada','Reprobada'],
      validate:{
          notEmpty: true,
      }
    }, 
    certificado:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 15]
        }
    },
    folioCertificado:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 15]
        }
    }
},{
    timestamps: false,
    freezeTableName: true 
});

module.exports = Talumno;