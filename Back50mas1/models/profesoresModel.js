const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

const Profesores = db.define('profesores',{
    id_profesor:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 16]
        }
    },
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
    status:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true 
});

module.exports = Profesores;