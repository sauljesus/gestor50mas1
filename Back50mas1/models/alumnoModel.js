const db = require('../config/Database');
const { Sequelize, DataTypes } = require('sequelize');

const Users = db.define('alumno',{
    boleta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 12]
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
            len: [3, 30]
        }
    },
    apellidoMaterno:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    curp:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    rfc:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 13]
        }
    },
    estadoCivil:{
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Soltero','Casado','Viudo','Divorciado','Union_libre'],
        validate:{
            notEmpty: true,
        }
    },
    calle:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 45]
        }
    },
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [0, 20]
        }
    },
    colonia:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 40]
        }
    },
    municipio:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    CP:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 6]
        }
    },
    telefono:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 13]
        }
    },
    celular:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 13]
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
    edad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 3]
        }
    },
    nivelAcademico:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    sexo:{
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Masculino','Femenino'],
        validate:{
            notEmpty: true,
        }
    },
    hijos:{
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Si','No'],
        validate:{
            notEmpty: true,
           
        }
    },
    nivelAHijos:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    trabaja:{
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Si','No'],
        validate:{
            notEmpty: true,
        }
    },
    empresa:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    direccionEmpresa:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    registroMedico:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    status:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true 
});

module.exports = Users;