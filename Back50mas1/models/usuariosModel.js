const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

const Users = db.define('usuarios',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 45]
        }
    },
    apellidoPaterno:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 25]
        }
    },
    apellidoMaterno:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 25]
        }
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }, 
    tipoUsuario:{
        type: DataTypes.STRING,
        requied:true,
        enum: ['Profesor','Administrador'],
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    status:{
        type: DataTypes.STRING,
    },
    inicioLaboral: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finLaboral: {
        type: DataTypes.DATE,
        allowNull: true,
      }
},{
    timestamps: false,
    freezeTableName: true 
});

module.exports = Users;