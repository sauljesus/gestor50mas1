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
    calificacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        validate:{
            notEmpty: false,
            len: [1, 4]
        }
    },
    estado:{
      type: DataTypes.STRING,
      allowNull: true,
      enum: ['Aprobada','Reprobada'],
      validate:{
          notEmpty: false,
      }
    }, 
    certificado:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
        validate:{
            notEmpty: false,
            len: [1, 15]
        }
    },
    folioCertificado:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
        validate:{
            notEmpty: false,
            len: [1, 15]
        }
    }
},{
    timestamps: false,
    freezeTableName: true 
});

module.exports = Talumno;