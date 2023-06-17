import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {BsGearFill} from 'react-icons/bs';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import EditContainer from '../containers/editContainer';
import Edit from '../pages/edit';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';

function Consulta({page}) {
  const [alumnos, setAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [bolid, setBoleta] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [navVisible, showNavbar] = useState(true);
  const page2 = "Perfil";
  const pagee = "Dashboard";
  const [showAlumno, setShowAlumno] = useState(true);
  const [showTaller, setShowTaller] = useState(false);
  const [showProfesor, setShowProfesor] = useState(false);
  const [textPage, setTextPage] = useState("Registro de alumno");


  const setShow = (type) => {
    if (type == "alumno"){
        setShowAlumno(true);
        setShowProfesor(false);
        setShowTaller(false);
    }
    if (type == "profesor"){
        setShowAlumno(false);
        setShowProfesor(true);
        setShowTaller(false);
    }
    if (type == "taller"){
        setShowAlumno(false);
        setShowProfesor(false);
        setShowTaller(true);
    }
}

  useEffect(() => {
    fetchAlumnos();
    fetchProfesores();
    fetchTalleres();
  }, []);

  const fetchAlumnos = () => {
    axios.get('http://localhost:5000/alumnos')
      .then(response => {
        console.log(response.data);
        setAlumnos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchTalleres = () => {
    axios.get('http://localhost:5000/talleres')
      .then(responset => {
        console.log(responset.data);
        setTalleres(responset.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchProfesores = () => {
    axios.get('http://localhost:5000/usuarios')
      .then(responsep => {
        console.log(responsep.data);
        setProfesores(responsep.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const searchAlumno = () => {
    axios.get(`/alumnos/${searchText}`)
      .then(response => {
        setSelectedAlumno(response.data);
      })
      .catch(error => {
        console.error(error);
        setSelectedAlumno(null);
      });
  };

    const [menuVisible, setMenuVisible] = useState(false);
  
    // Función para mostrar u ocultar el menú de edit emergente
    const toggleMenu = (alumno) => {
        console.log('Elemento seleccionado:', alumno.boleta);
        setMenuVisible(!menuVisible);
        setBoleta(alumno)
        console.log(bolid);
      };

  return (
    <>
      <Navbar page={page} /> 
      <div className='s-body_index'>
        <div className="main-container">
           <Header page={page} page2={page}/> 
            <div className="s-content">
            <DropdownButton id="dropdown-basic-button" title='Seleccionar el tipo de Consulta' className='ing-drop'>
                                <Dropdown.Item onClick={() => { setShow("alumno"); setTextPage("Registro de alumno") }}>Alumno</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShow("taller"); setTextPage("Registro de taller") }}>Taller</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShow("profesor"); setTextPage("Registro de profesor") }}>Profesor</Dropdown.Item>
            </DropdownButton>

            <div className={showAlumno ? "ing-content-form" : "ing-display-n"}>
                <div className='s-box-head'>
                    <div className='s-text-head'>Consulta de Usuarios</div>
                </div>
                {alumnos.map(alumno => (
                    <div className='s-box-list' key={alumno.boleta}>
                        <div className="s-box-element">
                            <div className='s-box-name'>
                                <div className='s-box-foto'>
                                    <img
                                        src={IMG}
                                        alt="estadistica1"
                                        className='s-img'
                                    />
                                </div>
                                <div className='s-box-nombre'>{alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</div>
                                <div className='s-box-email'>{alumno.correo}</div>
                            </div>
                            {alumno.status === 'Activo' ? (
                                <div className='s-status-generada s-status'>{alumno.status}</div>
                            ) : (
                                <div className='s-status-pendiente s-status'>{alumno.status}</div>
                            )}
                            <div className='s-txt-fecha'>{alumno.createdAt}</div>
                            <Link to={`/edit/${alumno.boleta}`}>Editar</Link>
                        </div>
                              
                              </div>
                          ))}
                    </div>


                    <div className={showTaller ? "ing-content-form" : "ing-display-n"}>
                <div className='s-box-head'>
                    <div className='s-text-head'>Consulta de Talleres</div>
                </div>
                {talleres.map(taller => (
                    <div className='s-box-list' key={taller.codigo_taller}>
                        <div className="s-box-element">
                            <div className='s-box-name'>
                                <div className='s-box-foto'>
                                    <img
                                        src={IMG}
                                        alt="estadistica1"
                                        className='s-img'
                                    />
                                </div>
                                <div className='s-box-nombre'>{taller.nombre}</div>
                                <div className='s-box-email'>{taller.descripcion}</div>
                            </div>
                            <div className='s-txt-fecha'>{taller.periodo}</div>
                            <Link to={`/edit/${taller.codigo_taller}`}>Editar</Link>
                        </div>
                              
                              </div>
                          ))}
                    </div>


                    <div className={showProfesor ? "ing-content-form" : "ing-display-n"}>
                <div className='s-box-head'>
                    <div className='s-text-head'>Consulta de Profesores</div>
                </div>
                {profesores.map(profesor => (
                    <div className='s-box-list' key={profesor.correo}>
                        <div className="s-box-element">
                            <div className='s-box-name'>
                                <div className='s-box-foto'>
                                    <img
                                        src={IMG}
                                        alt="estadistica1"
                                        className='s-img'
                                    />
                                </div>
                                <div className='s-box-nombre'>{profesor.nombre} {profesor.apellidoPaterno} {profesor.apellidoMaterno}</div>
                                <div className='s-box-email'>{profesor.correo}</div>
                            </div>
                            {profesor.status === 'Activo' ? (
                                <div className='s-status-generada s-status'>{profesor.status}</div>
                            ) : (
                                <div className='s-status-pendiente s-status'>{profesor.status}</div>
                            )}
                            <div className='s-txt-fecha'>{profesor.inicioLaboral}</div>
                            <Link to={`/edit/${profesor.correo}`}>Editar</Link>
                        </div>
                              
                              </div>
                          ))}
                    </div>


            </div>
            <div className='s-float-icon shadow-box'>
                <BsGearFill /> 
            </div>
        </div>
    </div>
    </>
  );
}

export default Consulta;