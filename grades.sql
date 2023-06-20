-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2023 at 08:03 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grades`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumno`
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
  `correo` varchar(30) NOT NULL,
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

--
-- Dumping data for table `alumno`
--

INSERT INTO `alumno` (`boleta`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `curp`, `rfc`, `estadoCivil`, `calle`, `numero`, `colonia`, `municipio`, `estado`, `CP`, `telefono`, `celular`, `correo`, `password`, `edad`, `nivelAcademico`, `sexo`, `hijos`, `nivelAHijos`, `trabaja`, `Empresa`, `direccionEmpresa`, `registroMedico`, `status`, `createdAt`, `updatedAt`) VALUES
(2023060000, 'María', 'Pérez', 'Hernández', 'PEHM890101HDFRNO01', 'PEHM890101', 'Casado', 'Calle50', '20', 'Reforma', 'CiudaddeMéxico', 'CiudaddeMéxico', 23456, 2147483647, 2147483647, 'maria.perez@example.com', 'pass456', 32, 'Maestría', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '87654321', 'Activo', '2023-06-18 13:45:22', '2023-06-19 22:08:40'),
(2023060001, 'Pedro', 'López', 'García', 'LOGP900202HDFRNO02', 'LOGP900202', 'Viudo', 'Calle3', '30', 'Juárez', 'CiudaddeMéxico', 'CiudaddeMéxico', 34567, 2147483647, 2147483647, 'pedro.lopez@example.com', 'pass789', 29, 'Doctorado', 'Masculino', 'Si', 'Primaria', 'Si', 'Empresa2', 'Dirección2', '76543210', 'Activo', '2023-06-18 13:45:22', '2023-06-18 13:45:22'),
(2023060002, 'Ana', 'González', 'Rodríguez', 'GORA910303HDFRNO05', 'GORA910303', 'Divorciado', 'Calle4', '40', 'Polanco', 'CiudaddeMéxico', 'CiudaddeMéxico', 45678, 2147483647, 2147483647, 'ana.gonzalez@example.com', 'passabc', 33, 'Licenciatura', 'Femenino', 'Si', 'Secundaria', 'No', 'N/A', 'N/A', '65432109', 'Activo', '2023-06-18 13:45:22', '2023-06-18 13:45:22'),
(2023060003, 'Carlos', 'Torres', 'Sánchez', 'TOSC850404HDFRNO07', 'TOSC850404', 'Union_libre', 'Calle5', '50', 'DelValle', 'CiudaddeMéxico', 'CiudaddeMéxico', 56789, 2147483647, 2147483647, 'carlos.torres@example.com', 'passdef', 31, 'Licenciatura', 'Masculino', 'No', 'N/A', 'Si', 'Empresa3', 'Dirección3', '54321098', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060004, 'Sofía', 'Martínez', 'González', 'MAGO920707HDFRNO09', 'MAGO920707', 'Soltero', 'Calle8', '80', 'Tlalpan', 'CiudaddeMéxico', 'CiudaddeMéxico', 89012, 2147483647, 2147483647, 'sofia.martinez@example.com', 'passmno', 27, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '21098765', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060005, 'Javier', 'Sánchez', 'Torres', 'SATO860808HDFRNO10', 'SATO860808', 'Soltero', 'Calle9', '90', 'Nápoles', 'CiudaddeMéxico', 'CiudaddeMéxico', 90123, 2147483647, 2147483647, 'javier.sanchez@example.com', 'passpqr', 31, 'Doctorado', 'Masculino', 'Si', 'Primaria', 'No', 'N/A', 'N/A', '10987654', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060006, 'Paola', 'López', 'Hernández', 'LOHP840202HDFRNO06', 'LOHP840202', 'Casado', 'Calle10', '100', 'SantaFe', 'CiudaddeMéxico', 'CiudaddeMéxico', 12345, 2147483647, 2147483647, 'paola.lopez@example.com', 'passstu7', 37, 'Maestría', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '9876543', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060007, 'José', 'González', 'Gómez', 'GOGJ810101HDFRNO12', 'GOGJ810101', 'Soltero', 'Calle11', '110', 'Polanco', 'CiudaddeMéxico', 'CiudaddeMéxico', 23456, 2147483647, 2147483647, 'jose.gonzalez@example.com', 'passvwx', 29, 'Licenciatura', 'Masculino', 'No', 'N/A', 'Si', 'Empresa5', 'Dirección5', '98765432', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060008, 'Fernanda', 'Hernández', 'Pérez', 'HEPF900303HDFRNO15', 'HEPF900303', 'Divorciado', 'Calle12', '120', 'DelValle', 'CiudaddeMéxico', 'CiudaddeMéxico', 34567, 2147483647, 2147483647, 'fernanda.hernandez@example.com', 'passyza', 32, 'Licenciatura', 'Femenino', 'Si', 'Secundaria', 'Si', 'Empresa6', 'Dirección6', '87654321', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060009, 'Miguel', 'Martínez', 'López', 'MALO870404HDFRNO13', 'MALO870404', 'Soltero', 'Calle13', '130', 'Juárez', 'CiudaddeMéxico', 'CiudaddeMéxico', 45678, 2147483647, 2147483647, 'miguel.martinez@example.com', 'passbcd', 30, 'Doctorado', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '76543210', 'Activo', '2023-06-18 13:45:23', '2023-06-18 13:45:23'),
(2023060010, 'Isabella', 'González', 'Rodríguez', 'GORI920505HDFRNO17', 'GORI920505', 'Casado', 'Calle14', '140', 'Reforma', 'CiudaddeMéxico', 'CiudaddeMéxico', 56789, 2147483647, 2147483647, 'isabella.gonzalez@example.com', 'passefg', 28, 'Licenciatura', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa7', 'Dirección7', '65432109', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060011, 'Diego', 'Torres', 'Sánchez', 'TOSD850606HDFRNO19', 'TOSD850606', 'Soltero', 'Calle15', '150', 'Centro', 'CiudaddeMéxico', 'CiudaddeMéxico', 67890, 2147483647, 2147483647, 'diego.torres@example.com', 'passhij', 29, 'Licenciatura', 'Masculino', 'No', 'N/A', 'Si', 'Empresa8', 'Dirección8', '54321098', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060012, 'Valeria', 'Hernández', 'Martínez', 'HEMV910707HDFRNO21', 'HEMV910707', 'Casado', 'Calle16', '160', 'Roma', 'CiudaddeMéxico', 'CiudaddeMéxico', 78901, 2147483647, 2147483647, 'valeria.hernandez@example.com', 'passklm', 27, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '32109876', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060013, 'Alejandro', 'Sánchez', 'García', 'SAGA860808HDFRNO23', 'SAGA860808', 'Soltero', 'Calle17', '170', 'Condesa', 'CiudaddeMéxico', 'CiudaddeMéxico', 89012, 2147483647, 2147483647, 'alejandro.sanchez@example.com', 'passnop', 31, 'Maestría', 'Masculino', 'Si', 'Preparatoria', 'Si', 'Empresa9', 'Dirección9', '21098765', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060014, 'Camila', 'Martínez', 'González', 'MAGO930303HDFRNO25', 'MAGO930303', 'Soltero', 'Calle18', '180', 'Tlalpan', 'CiudaddeMéxico', 'CiudaddeMéxico', 90123, 2147483647, 2147483647, 'camila.martinez@example.com', 'passqrs', 26, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '10987654', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060015, 'Juan', 'Pérez', 'López', 'PELJ931127HDFRNO01', 'PELJ931127', 'Soltero', 'Calle 1', '190', 'Roma Norte', 'Ciudad de México', 'Ciudad de México', 12345, 2147483647, 2147483647, 'juan.perez@example.com', 'pass123', 29, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '123456789', 'Activo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060016, 'Ana', 'García', 'Ramírez', 'GARA890317HDFRNO02', 'GARA890317', 'Casado', 'Calle 2', '200', 'Condesa', 'Ciudad de México', 'Ciudad de México', 23456, 2147483647, 2147483647, 'ana.garcia@example.com', 'pass456', 32, 'Maestría', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa1', 'Dirección1', '987654321', 'Inactivo', '2023-06-18 13:45:24', '2023-06-18 13:45:24'),
(2023060017, 'Luis', 'Rodríguez', 'Morales', 'ROML880520HDFRNO03', 'ROML880520', 'Soltero', 'Calle 3', '210', 'Polanco', 'Ciudad de México', 'Ciudad de México', 34567, 2147483647, 2147483647, 'luis.rodriguez@example.com', 'pass789', 33, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '876543210', 'Activo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060018, 'María', 'López', 'Hernández', 'LOHM850715HDFRNO04', 'LOHM850715', 'Casado', 'Calle 4', '220', 'Santa Fe', 'Ciudad de México', 'Ciudad de México', 45678, 2147483647, 2147483647, 'maria.lopez@example.com', 'passabc', 36, 'Doctorado', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '765432109', 'Activo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060019, 'Roberto', 'Torres', 'Gómez', 'TOGR890213HDFRNO05', 'TOGR890213', 'Soltero', 'Calle 5', '230', 'Del Valle', 'Ciudad de México', 'Ciudad de México', 56789, 2147483647, 2147483647, 'roberto.torres@example.com', 'passdef', 32, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '654321098', 'Inactivo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060020, 'Laura', 'Morales', 'Sánchez', 'MOSL910520HDFRNO06', 'MOSL910520', 'Casado', 'Calle 6', '240', 'Reforma', 'Ciudad de México', 'Ciudad de México', 67890, 2147483647, 2147483647, 'laura.morales@example.com', 'passtuv', 31, 'Maestría', 'Femenino', 'Si', 'Preparatoria', 'Si', 'Empresa2', 'Dirección2', '543210987', 'Activo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060021, 'Carlos', 'Gómez', 'González', 'GOGC850610HDFRNO07', 'GOGC850610', 'Soltero', 'Calle 7', '250', 'Centro', 'Ciudad de México', 'Ciudad de México', 78901, 2147483647, 2147483647, 'carlos.gomez@example.com', 'passmno', 36, 'Licenciatura', 'Masculino', 'Si', 'Primaria', 'No', 'N/A', 'N/A', '432109876', 'Activo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060022, 'Gabriela', 'Sánchez', 'Torres', 'SAGT920731HDFRNO08', 'SAGT920731', 'Casado', 'Calle 8', '260', 'Roma Sur', 'Ciudad de México', 'Ciudad de México', 89012, 2147483647, 2147483647, 'gabriela.sanchez@example.com', 'passpqr', 29, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '321098765', 'Inactivo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060023, 'Alejandro', 'Hernández', 'Martínez', 'HEAM900405HDFRNO09', 'HEAM900405', 'Soltero', 'Calle 9', '270', 'Tlalpan', 'Ciudad de México', 'Ciudad de México', 90123, 2147483647, 2147483647, 'alejandro.hernandez@example.co', 'passstu', 31, 'Doctorado', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987654', 'Activo', '2023-06-18 13:45:25', '2023-06-18 13:45:25'),
(2023060024, 'Patricia', 'Méndez', 'Vargas', 'MEVP910101HDFRNO10', 'MEVP910101', 'Casado', 'Calle 10', '280', 'Condesa', 'Ciudad de México', 'Ciudad de México', 11223, 2147483647, 2147483647, 'patricia.mendez@example.com', 'passvwx', 32, 'Licenciatura', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa3', 'Dirección3', '109876543', 'Activo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060025, 'Eduardo', 'Romero', 'Silva', 'ROSE880505HDFRNO11', 'ROSE880505', 'Soltero', 'Calle 11', '290', 'Santa Fe', 'Ciudad de México', 'Ciudad de México', 22334, 2147483647, 2147483647, 'eduardo.romero@example.com', 'passyza', 36, 'Maestría', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '98765432', 'Inactivo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060026, 'Carmen', 'Fuentes', 'Morales', 'FUMC850710HDFRNO12', 'FUMC850710', 'Casado', 'Calle 12', '300', 'Polanco', 'Ciudad de México', 'Ciudad de México', 33445, 2147483647, 2147483647, 'carmen.fuentes@example.com', 'passxyz', 30, 'Licenciatura', 'Femenino', 'Si', 'Preparatoria', 'Si', 'Empresa4', 'Dirección4', '987654321', 'Activo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060027, 'Francisco', 'Castillo', 'Ruiz', 'CARI900201HDFRNO13', 'CARI900201', 'Soltero', 'Calle 13', '310', 'Del Valle', 'Ciudad de México', 'Ciudad de México', 44556, 2147483647, 2147483647, 'francisco.castillo@example.com', 'pass456', 31, 'Doctorado', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '876543210', 'Inactivo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060028, 'Andrea', 'Vargas', 'Navarro', 'VANA910303HDFRNO14', 'VANA910303', 'Casado', 'Calle 14', '320', 'Reforma', 'Ciudad de México', 'Ciudad de México', 55667, 2147483647, 2147483647, 'andrea.vargas@example.com', 'pass789', 35, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '765432109', 'Activo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060029, 'Ricardo', 'Méndez', 'Sánchez', 'MESA890717HDFRNO15', 'MESA890717', 'Soltero', 'Calle 15', '330', 'Roma Sur', 'Ciudad de México', 'Ciudad de México', 66778, 2147483647, 2147483647, 'ricardo.mendez@example.com', 'passabc', 29, 'Maestría', 'Masculino', 'Si', 'Primaria', 'Si', 'Empresa5', 'Dirección5', '654321098', 'Activo', '2023-06-18 13:45:26', '2023-06-18 13:45:26'),
(2023060030, 'Laura', 'Ramírez', 'Torres', 'RATO900102HDFRNO16', 'RATO900102', 'Casado', 'Calle 16', '340', 'Tlalpan', 'Ciudad de México', 'Ciudad de México', 77889, 2147483647, 2147483647, 'laura.ramirez@example.com', 'passdef', 33, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '543210987', 'Inactivo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060031, 'Sergio', 'Sánchez', 'Gómez', 'SAGS930504HDFRNO17', 'SAGS930504', 'Soltero', 'Calle 17', '350', 'Condesa', 'Ciudad de México', 'Ciudad de México', 88990, 2147483647, 2147483647, 'sergio.sanchez@example.com', 'passmno', 30, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '432109876', 'Activo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060032, 'Mariana', 'González', 'Romero', 'GORR880313HDFRNO18', 'GORR880313', 'Casado', 'Calle 18', '360', 'Santa Fe', 'Ciudad de México', 'Ciudad de México', 89901, 2147483647, 2147483647, 'mariana.gonzalez@example.com', 'passpqr', 32, 'Licenciatura', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa6', 'Dirección6', '321098765', 'Activo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060033, 'Daniel', 'Morales', 'Fuentes', 'MOFD890410HDFRNO19', 'MOFD890410', 'Soltero', 'Calle 19', '370', 'Polanco', 'Ciudad de México', 'Ciudad de México', 99012, 2147483647, 2147483647, 'daniel.morales@example.com', 'passtuv', 33, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987654', 'Inactivo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060034, 'Carolina', 'Castillo', 'Vargas', 'CAVA920212HDFRNO20', 'CAVA920212', 'Casado', 'Calle 20', '380', 'Del Valle', 'Ciudad de México', 'Ciudad de México', 11223, 2147483647, 2147483647, 'carolina.castillo@gmail.com', 'passvwx', 29, 'Maestría', 'Femenino', 'Si', 'Preparatoria', 'Si', 'Empresa7', 'Dirección7', '109876543', 'Activo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060035, 'Pedro', 'Romero', 'Méndez', 'ROME880809HDFRNO21', 'ROME880809', 'Soltero', 'Calle 21', '390', 'Reforma', 'Ciudad de México', 'Ciudad de México', 22334, 2147483647, 2147483647, 'pedro.romero@example.com', 'passyza', 34, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '98765432', 'Inactivo', '2023-06-18 13:45:27', '2023-06-18 13:45:27'),
(2023060036, 'Gabriela', 'Fuentes', 'Ramírez', 'FURA890615HDFRNO22', 'FURA890615', 'Casado', 'Calle 22', '400', 'Centro', 'Ciudad de México', 'Ciudad de México', 33445, 2147483647, 2147483647, 'gabriela.fuentes@example.com', 'passxyz', 31, 'Doctorado', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '987654321', 'Activo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060037, 'Andrés', 'Navarro', 'Sánchez', 'NASA900630HDFRNO23', 'NASA900630', 'Soltero', 'Calle 23', '410', 'Roma Sur', 'Ciudad de México', 'Ciudad de México', 44556, 2147483647, 2147483647, 'andres.navarro@example.com', 'pass456', 32, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '876543210', 'Activo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060038, 'Vanessa', 'Vargas', 'Ramírez', 'VARV910930HDFRNO24', 'VARV910930', 'Casado', 'Calle 24', '420', 'Tlalpan', 'Ciudad de México', 'Ciudad de México', 55667, 2147483647, 2147483647, 'vanessa.vargas@example.com', 'pass789', 30, 'Maestría', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa8', 'Dirección8', '765432109', 'Activo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060039, 'Alejandro', 'Méndez', 'Silva', 'MESA880315HDFRNO25', 'MESA880315', 'Soltero', 'Calle 25', '430', 'Condesa', 'Ciudad de México', 'Ciudad de México', 66778, 2147483647, 2147483647, 'alejandro.mendez@example.com', 'passabc', 31, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '654321098', 'Inactivo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060040, 'Natalia', 'Ramírez', 'Sánchez', 'RASA910504HDFRNO26', 'RASA910504', 'Casado', 'Calle 26', '440', 'Polanco', 'Ciudad de México', 'Ciudad de México', 77889, 2147483647, 2147483647, 'natalia.ramirez@example.com', 'passdef', 29, 'Maestría', 'Femenino', 'Si', 'Preparatoria', 'Si', 'Empresa9', 'Dirección9', '543210987', 'Activo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060041, 'Gabriel', 'Sánchez', 'Gómez', 'SAGG930515HDFRNO27', 'SAGG930515', 'Soltero', 'Calle 27', '450', 'Santa Fe', 'Ciudad de México', 'Ciudad de México', 88990, 2147483647, 2147483647, 'gabriel.sanchez@example.com', 'passmno', 32, 'Licenciatura', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '432109876', 'Activo', '2023-06-18 13:45:28', '2023-06-18 13:45:28'),
(2023060042, 'Fernanda', 'González', 'Romero', 'GOFR890520HDFRNO28', 'GOFR890520', 'Casado', 'Calle 28', '460', 'Condesa', 'Ciudad de México', 'Ciudad de México', 89901, 2147483647, 2147483647, 'fernanda.gonzalez@example.com', 'passpqr', 33, 'Licenciatura', 'Femenino', 'Si', 'Primaria', 'Si', 'Empresa10', 'Dirección10', '321098765', 'Inactivo', '2023-06-18 13:45:29', '2023-06-18 13:45:29'),
(2023060043, 'Andrés', 'Morales', 'Fuentes', 'MOFA890717HDFRNO29', 'MOFA890717', 'Soltero', 'Calle 29', '470', 'Del Valle', 'Ciudad de México', 'Ciudad de México', 99012, 2147483647, 2147483647, 'andres.morales@example.com', 'passstu', 31, 'Maestría', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987654', 'Activo', '2023-06-18 13:45:29', '2023-06-18 13:45:29'),
(2023060044, 'Carolina', 'Castillo', 'Méndez', 'CAME880809HDFRNO30', 'CAME880809', 'Casado', 'Calle 30', '480', 'Roma Sur', 'Ciudad de México', 'Ciudad de México', 11223, 2147483647, 2147483647, 'carolina.castillo@example.com', 'passvwx', 32, 'Licenciatura', 'Femenino', 'No', 'N/A', 'No', 'N/A', 'N/A', '109876543', 'Activo', '2023-06-18 13:45:29', '2023-06-18 13:45:29'),
(2023060045, 'Mauricio', 'Taboada', 'Sanchez', 'MMTS890717HDFRNO29', 'MMTS890717', 'Soltero', '3RA de carlos macilla', '6', 'Iztapalapa', 'Ciudad de México', 'Ciudad de México', 9200, 2147483647, 2147483647, 'mauricio.taboada@gmail.com', 'passstu1', 31, 'Maestría', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987654', 'Activo', '2023-06-18 13:45:29', '2023-06-18 13:45:29'),
(2023060046, 'Yesua', 'Perez', 'Vidales', 'MMTS890717HDFRNO30', 'MMTS890718', 'Soltero', '3RA de carlos macilla', '7', 'Iztapalapa', 'Ciudad de México', 'Ciudad de México', 9200, 2147483647, 2147483647, 'Yesua_perez@gmail.com', 'passstu2', 32, 'Maestría', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987655', 'Activo', '2023-06-18 13:45:29', '2023-06-18 13:45:29'),
(2023060047, 'Saul', 'Martinez', 'Soto', 'MMTS890717HDFRNO31', 'MMTS890719', 'Soltero', '3RA de carlos macilla', '8', 'Iztapalapa', 'Ciudad de México', 'Ciudad de México', 9200, 2147483647, 2147483647, 'Saul.soto@gmail.com', 'passstu3', 33, 'Maestría', 'Masculino', 'No', 'N/A', 'No', 'N/A', 'N/A', '210987656', 'Activo', '2023-06-18 13:45:29', '2023-06-18 13:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `certificado`
--

CREATE TABLE `certificado` (
  `folioCertificado` varchar(15) NOT NULL,
  `estado` enum('Generado','Pendiente') DEFAULT NULL,
  `fechaExpedicion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `certificado`
--

INSERT INTO `certificado` (`folioCertificado`, `estado`, `fechaExpedicion`) VALUES
('CERT-1', 'Pendiente', '2023-06-19 23:20:33');

-- --------------------------------------------------------

--
-- Table structure for table `ceusuario`
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
-- Table structure for table `talleres`
--

CREATE TABLE `talleres` (
  `codigo_taller` varchar(11) NOT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `periodo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `talleres`
--

INSERT INTO `talleres` (`codigo_taller`, `correo`, `nombre`, `descripcion`, `periodo`) VALUES
('T001', 'Profesor.test@gmail.com', 'Taller de Electricidad', 'Aprende los fundamentos de la electricidad', '2023-2024'),
('T002', 'Profesor.test@gmail.com', 'Taller de Electrónica', 'Explora los componentes electrónicos y circuitos', '2022-2023'),
('T003', 'Profesor.test@gmail.com', 'Taller de Construcción', 'Aprende técnicas básicas de construcción', '2022-2023'),
('T004', 'sandra.guitron@gmail.com', 'Taller de Pintura', 'Descubre diferentes técnicas de pintura', '2022-2023'),
('T005', 'Profesor.test@gmail.com', 'Taller de Carpintería', 'Aprende a trabajar con madera y herramientas de carpintería', '2022-2023'),
('T006', 'hector.manzanilla@gmail.com', 'Taller de Soldadura', 'Explora los fundamentos de la soldadura', '2022-2023'),
('T007', NULL, 'Taller de Programación', 'Aprende a programar en diferentes lenguajes', '2022-2023'),
('T008', NULL, 'Taller de Fotografía', 'Aprende técnicas avanzadas de fotografía', '2022-2023'),
('T009', NULL, 'Taller de Diseño Gráfico', 'Explora el diseño gráfico y herramientas de diseño', '2022-2023'),
('T010', NULL, 'Taller de Marketing Digital', 'Aprende estrategias de marketing en línea', '2022-2023'),
('T011', NULL, 'Taller de Jardinería', 'Descubre cómo crear y mantener un jardín', '2022-2023'),
('T012', NULL, 'Taller de Cocina', 'Aprende a preparar diferentes platos y técnicas culinarias', '2022-2023'),
('T013', NULL, 'Taller de Escritura Creativa', 'Explora tu creatividad a través de la escritura', '2022-2023'),
('T014', NULL, 'Taller de Costura', 'Aprende a coser y confeccionar prendas', '2022-2023'),
('T015', NULL, 'Taller de Arte Urbano', 'Descubre el arte callejero y las técnicas de grafiti', '2022-2023'),
('T016', NULL, 'Taller de Cerámica', 'Aprende a trabajar con arcilla y crear cerámicas', '2022-2023'),
('T017', NULL, 'Taller de Danza', 'Explora diferentes estilos de danza', '2022-2023'),
('T018', NULL, 'Taller de Música', 'Aprende a tocar un instrumento musical', '2022-2023'),
('T019', NULL, 'Taller de Yoga', 'Practica ejercicios de yoga y meditación', '2022-2023'),
('T020', NULL, 'Taller de Mindfulness', 'Aprende técnicas de atención plena y reducción del estrés', '2022-2023'),
('T021', NULL, 'Taller de Escultura', 'Crea esculturas en diferentes materiales', '2022-2023'),
('T022', NULL, 'Taller de Robótica', 'Explora el mundo de la robótica y programación de robots', '2022-2023'),
('T023', NULL, 'Taller de Artesanía', 'Aprende a crear artesanías con diferentes materiales', '2022-2023'),
('T024', NULL, 'Taller de Teatro', 'Desarrolla habilidades de actuación y puesta en escena', '2022-2023'),
('T025', NULL, 'Taller de Idiomas', 'Aprende un nuevo idioma y practica habilidades lingüísticas', '2022-2023'),
('T026', NULL, 'Taller de Medio Ambiente', 'Explora temas de sostenibilidad y conservación', '2022-2023'),
('T027', NULL, 'Taller de Moda', 'Descubre el mundo de la moda y diseño de prendas', '2022-2023'),
('T028', NULL, 'Taller de Nutrición', 'Aprende sobre alimentación saludable y nutrición', '2022-2023'),
('T029', NULL, 'Taller de Automoción', 'Explora el mantenimiento y reparación de vehículos', '2022-2023'),
('T030', NULL, 'Taller de Ciencia', 'Descubre experimentos científicos y fenómenos naturales', '2022-2023');

-- --------------------------------------------------------

--
-- Table structure for table `talleres_alumno`
--

CREATE TABLE `talleres_alumno` (
  `boleta` int(10) NOT NULL,
  `codigo_taller` varchar(11) NOT NULL,
  `calificacion` int(3) DEFAULT NULL,
  `estado` enum('Aprobada','Reprobada') DEFAULT NULL,
  `certificado` varchar(15) DEFAULT NULL,
  `folioCertificado` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `talleres_alumno`
--

INSERT INTO `talleres_alumno` (`boleta`, `codigo_taller`, `calificacion`, `estado`, `certificado`, `folioCertificado`) VALUES
(2023060034, 'T002', 10, 'Aprobada', '', 'CERT-1'),
(2023060033, 'T002', 6, 'Aprobada', '', NULL),
(2023060033, 'T003', 6, 'Aprobada', '', NULL),
(2023060034, 'T006', NULL, NULL, NULL, NULL),
(2023060033, 'T001', 10, 'Aprobada', NULL, NULL),
(2023060033, 'T004', NULL, NULL, NULL, NULL),
(2023060033, 'T015', NULL, NULL, NULL, NULL),
(2023060033, 'T005', 4, 'Reprobada', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
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
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `password`, `tipoUsuario`, `status`, `inicioLaboral`, `finLaboral`) VALUES
('Admin', 'Admin', 'Admon', 'Admin.admin@admin.com', '$2b$10$bdG11SlW1FpqQlFLZidcKuJaSsbA1W1lmcTbXVPno4fcj91Ja/ZZ6', 'Administrador', 'Activo', '0000-00-00 00:00:00', NULL),
('Benjamin', 'Cruz', 'Torres', 'benjamin.torres@gmail.com', '$2b$10$1oo.3UzGu99ayzEtm.4vaeQWoN4O4yUNyyw4WGX.e/u4LO6UuYnPC', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL),
('Héctor', 'Manuel', 'Manzanilla', 'hector.manzanilla@gmail.com', '$2b$10$/gVmdg/gVP8vYYb6XFI0SORkQK.CyA0.m9NCBQ7M2cPiwtEAFmSFK', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL),
('Israel', 'Salas', 'Ramirez', 'Israel.ramirez@gmail.com', '$2b$10$P.qwxVEPe08i/WGgw9TsAuqazQt/HUW25PwU.fP7flaHkzcESuuu6', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL),
('Laura', 'Mendez', 'Segundo', 'laura.segundo@gmail.com', '$2b$10$wELP9t5IJsUqaufkju9a0u63wj0QHLUntNA3H79WoS1gcpMsz.PJ6', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL),
('Profesor', 'prueba', 'test', 'Profesor.test@gmail.com', '$2b$10$6dVqzrp1.KH/2CrNfFnhaOQ9Vk7aVoX3LoeHk/Z2VnT8xDV/iX03u', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL),
('Sandra', 'Morales', 'Guitron', 'sandra.guitron@gmail.com', '$2b$10$dlCEwCDkfoRD/PLOilhH.ONnXAUmB4dX6XJYd5S3S4jZfqjcmcWDG', 'Profesor', 'Activo', '0000-00-00 00:00:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`boleta`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indexes for table `certificado`
--
ALTER TABLE `certificado`
  ADD PRIMARY KEY (`folioCertificado`) USING BTREE;

--
-- Indexes for table `ceusuario`
--
ALTER TABLE `ceusuario`
  ADD PRIMARY KEY (`boleta`);

--
-- Indexes for table `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`codigo_taller`),
  ADD KEY `correo` (`correo`);

--
-- Indexes for table `talleres_alumno`
--
ALTER TABLE `talleres_alumno`
  ADD KEY `codigo_taller` (`codigo_taller`),
  ADD KEY `boleta` (`boleta`,`codigo_taller`,`folioCertificado`) USING BTREE,
  ADD KEY `folioCertificado` (`folioCertificado`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ceusuario`
--
ALTER TABLE `ceusuario`
  ADD CONSTRAINT `ceusuario_ibfk_1` FOREIGN KEY (`boleta`) REFERENCES `alumno` (`boleta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `talleres`
--
ALTER TABLE `talleres`
  ADD CONSTRAINT `FK_talleres_usuarios` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `talleres_alumno`
--
ALTER TABLE `talleres_alumno`
  ADD CONSTRAINT `talleres_alumno_ibfk_1` FOREIGN KEY (`codigo_taller`) REFERENCES `talleres` (`codigo_taller`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_alumno_ibfk_2` FOREIGN KEY (`boleta`) REFERENCES `alumno` (`boleta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `talleres_alumno_ibfk_4` FOREIGN KEY (`folioCertificado`) REFERENCES `certificado` (`folioCertificado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
