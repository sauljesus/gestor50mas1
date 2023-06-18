-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2023 a las 04:17:45
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grades`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `boleta` int(10) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidoPaterno` varchar(30) NOT NULL,
  `apellidoMaterno` varchar(30) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `estadoCivil` enum('Soltero','Casado','Viudo','Divorciado','Union_libre') NOT NULL,
  `calle` varchar(45) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `colonia` varchar(40) NOT NULL,
  `municipio` varchar(30) NOT NULL,
  `estado` varchar(30) NOT NULL,
  `CP` int(6) NOT NULL,
  `telefono` int(13) NOT NULL,
  `celular` int(13) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `edad` int(3) NOT NULL,
  `nivelAcademico` varchar(30) NOT NULL,
  `sexo` enum('Masculino','Femenino') NOT NULL,
  `hijos` enum('Si','No') NOT NULL,
  `nivelAHijos` varchar(50) NOT NULL,
  `trabaja` enum('Si','No') NOT NULL,
  `Empresa` varchar(50) DEFAULT NULL,
  `direccionEmpresa` varchar(50) DEFAULT NULL,
  `registroMedico` varchar(50) NOT NULL,
  `status` enum('Activo','Inactivo') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificado`
--

CREATE TABLE `certificado` (
  `folioCertificado` varchar(15) NOT NULL,
  `estado` enum('Generado','Pendiente') DEFAULT NULL,
  `fechaExpedicion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ceusuario`
--

CREATE TABLE `ceusuario` (
  `boleta` int(10) NOT NULL,
  `fechaIngreso` datetime NOT NULL,
  `fechaTermino` datetime NOT NULL,
  `estadoPermanencia` enum('Baja','Inscrito','Termino') NOT NULL,
  `talleresCursados` varchar(15) NOT NULL,
  `promedio` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres`
--

CREATE TABLE `talleres` (
  `codigo_taller` varchar(11) NOT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `periodo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres_alumno`
--

CREATE TABLE `talleres_alumno` (
  `boleta` int(10) NOT NULL,
  `codigo_taller` varchar(11) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `calificacion` int(3) DEFAULT NULL,
  `estado` enum('Aprobada','Reprobada') DEFAULT NULL,
  `certificado` varchar(15) NOT NULL,
  `folioCertificado` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(30) NOT NULL,
  `apellidoPaterno` varchar(30) NOT NULL,
  `apellidoMaterno` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `tipoUsuario` enum('Profesor','Administrador') NOT NULL,
  `status` enum('Activo','Inactivo') NOT NULL,
  `inicioLaboral` datetime NOT NULL DEFAULT current_timestamp(),
  `finLaboral` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`boleta`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `certificado`
--
ALTER TABLE `certificado`
  ADD PRIMARY KEY (`folioCertificado`) USING BTREE;

--
-- Indices de la tabla `ceusuario`
--
ALTER TABLE `ceusuario`
  ADD PRIMARY KEY (`boleta`);

--
-- Indices de la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`codigo_taller`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `talleres_alumno`
--
ALTER TABLE `talleres_alumno`
  ADD KEY `codigo_taller` (`codigo_taller`),
  ADD KEY `correo` (`correo`),
  ADD KEY `boleta` (`boleta`,`codigo_taller`,`correo`,`folioCertificado`) USING BTREE,
  ADD KEY `folioCertificado` (`folioCertificado`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ceusuario`
--
ALTER TABLE `ceusuario`
  ADD CONSTRAINT `ceusuario_ibfk_1` FOREIGN KEY (`boleta`) REFERENCES `alumno` (`boleta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `talleres_alumno`
--
ALTER TABLE `talleres_alumno`
  ADD CONSTRAINT `talleres_alumno_ibfk_1` FOREIGN KEY (`codigo_taller`) REFERENCES `talleres` (`codigo_taller`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_alumno_ibfk_2` FOREIGN KEY (`boleta`) REFERENCES `alumno` (`boleta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_alumno_ibfk_3` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_alumno_ibfk_4` FOREIGN KEY (`folioCertificado`) REFERENCES `certificado` (`folioCertificado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
