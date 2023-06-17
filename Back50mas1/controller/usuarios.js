const User = require ('../models/usuariosModel');
const argon2 = require('argon2');
const {Router} = require('express');
const { check } = require('express-validator'); 

const getUsers = async(req ,res) => {
    try{
        const response = await User.findAll({
            attributes:['nombre','apellidoPaterno','apellidoMaterno', 'correo','tipoUsuario','status','inicioLaboral'] //Falta usrpic en db
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getUsers,
};
