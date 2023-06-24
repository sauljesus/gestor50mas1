const User = require('../models/usuariosModel');
const argon2 = require('argon2');
const { Router } = require('express');
const { check } = require('express-validator');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'tipoUsuario', 'status', 'inicioLaboral'] //Falta usrpic en db
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
}

const getUserByCorreo = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'tipoUsuario', 'status', 'inicioLaboral'],
      where: {
        correo: req.params.correo
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
}

const updateProfesoredit = async (req, res) => {
  const user = await User.findOne({
    where: {
      correo: req.params.correo
    }
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  const { nombre, apellidoPaterno, apellidoMaterno, correo, tipoUsuario, status } = req.body;
  try {
    await User.update({
      nombre: nombre,
      correo: correo,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      tipoUsuario: tipoUsuario,
      status: status,
    }, {
      where: {
        correo: req.params.correo,
      }
    });
    res.status(200).json({ msg: "Usuario Actualizado" });
  } catch (error) {
    if (error.name.toString().includes("SequelizeUniqueConstraintError")) {
      res.status(400).json({ msg: "Correo ya registrado" });
    }
    else
      res.status(400).json({ msg: error.message });
  }
}
const createUserP = async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, correo, password, confpassword, tipoUsuario, status } = req.body;
  if (password !== confpassword) return res.status(400).json({ msg: "Las contraseñas no coinciden" });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      correo: correo,
      password: hashedPassword,
      status: 'Activo',
      tipoUsuario: 'Profesor'
    });
    res.status(201).json({ msg: "Registro Exitoso" });
  } catch (error) {
    if (error.name.toString().includes("SequelizeUniqueConstraintError")) {
      res.status(400).json({ msg: "Correo ya registrado" });
    }
    else
      res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  getUsers,
  getUserByCorreo,
  updateProfesoredit,
  createUserP
};
