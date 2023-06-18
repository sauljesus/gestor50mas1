const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

const Talleres = db.define('talleres',{
    codigo_taller:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 11]
        }
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 200]
        }
    },
    periodo:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 20]
        }
    }
},{
    timestamps: false,
    freezeTableName: true 
});

module.exports = Talleres;