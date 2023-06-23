import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGearFill } from 'react-icons/bs';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearchAlt } from 'react-icons/bi';
import CloseButton from 'react-bootstrap/CloseButton';
import { getdireccion } from '../helpers/direccion';


function Consulta({ page }) {
  const [alumnos, setAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [showAlumno, setShowAlumno] = useState(true);
  const [showTaller, setShowTaller] = useState(false);
  const [showProfesor, setShowProfesor] = useState(false);
  const [textPage, setTextPage] = useState("Consulta de alumno");
  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const setShow = (type) => {
    if (type == "alumno") {
      setShowAlumno(true);
      setShowProfesor(false);
      setShowTaller(false);
    }
    if (type == "profesor") {
      setShowAlumno(false);
      setShowProfesor(true);
      setShowTaller(false);
    }
    if (type == "taller") {
      setShowAlumno(false);
      setShowProfesor(false);
      setShowTaller(true);
    }
  }

  useEffect(() => {
    async function cargarUsuario() {
      console.log("token " + localStorage.getItem('jwt'));
      if (!(localStorage.getItem('jwt'))) {
        setcargarUsuario(false);
        setMessage("Por favor inicia sesión");
        setShowNotification(true);
        setTimeout(() => {
          window.location.replace(`/login`);
        }, 3000);
        return;
      }
      try {
        const { data } = await axios.get(`${getdireccion()}/checkJwtUser`, { headers: { 'Authorization': localStorage.getItem('jwt') } });
        if (data.tipoUsuario == 'Profesor') {
          setMessage("No tiene premiso para ver esta pagina");
          setShowNotification(true);
          setTimeout(() => {
            window.location.replace(`/mis-grupos`);
          }, 3000);
        } else {
          fetchAlumnos();
          fetchProfesores();
          fetchTalleres();
          return;
        }
      } catch (err) {
        setMessage("Por favor inicia sesión");
        setShowNotification(true);
        setTimeout(() => {
          window.location.replace(`/login`);
        }, 3000);
        console.log(err);
      }
    }
    cargarUsuario();
  }, []);

  const fetchAlumnos = () => {
    axios.get(`${getdireccion()}/alumnos`)
      .then(response => {
        setAlumnos(response.data);
        setDataAlumno(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchTalleres = () => {
    axios.get(`${getdireccion()}/talleres`)
      .then(response => {
        setTalleres(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchProfesores = () => {
    axios.get(`${getdireccion()}/usuarios`)
      .then(responsep => {
        setProfesores(responsep.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  ///////////////////////ALUMNO
  const [sAlumno, setSAlumno] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [dataAlumno, setDataAlumno] = useState([]);
  const handleSearchAlumno = (e) => {
    setSAlumno(e.target.value);
  }
  const searchAlumno = () => {
    let cont = [];
    alumnos.forEach(alumno => {
      if (alumno.boleta.toString().includes(sAlumno))
        cont.push(alumno);
    });
    setDataAlumno(cont);
    setShowClear(true);
  }
  const clearSearch = () => {
    setDataAlumno(alumnos);
    setSAlumno("");
    setShowClear(false);
  }
  const [aPage, setAPage] = useState(1);
  const [aPageSize, setAPageSize] = useState();

  return (
    <>
      {showNotification && (
        <div className="notification" style={{ color: "#ffffff" }}>
          {message}
        </div>
      )}
      <Navbar page={page} type={"A"} />
      <div className='s-body_index'>
        <div className="main-container">
          <Header page={page} page2={textPage} />
          <div className="s-content">
            <DropdownButton id="dropdown-basic-button" title='Seleccionar el tipo de Consulta' className='ing-drop'>
              <Dropdown.Item onClick={() => { setShow("alumno"); setTextPage("Consulta de alumno") }}>Alumno</Dropdown.Item>
              <Dropdown.Item onClick={() => { setShow("taller"); setTextPage("Consulta de taller") }}>Taller</Dropdown.Item>
              <Dropdown.Item onClick={() => { setShow("profesor"); setTextPage("Consulta de profesor") }}>Profesor</Dropdown.Item>
            </DropdownButton>

            <div className={showAlumno ? "ing-content-form" : "ing-display-n"}>
              <div className='c-box-head'>
                <div className='c-search-box'>
                  <InputGroup className="mb-3 no-float">
                    <Form.Control
                      placeholder="Boleta"
                      onChange={(e) => handleSearchAlumno(e)}
                      value={sAlumno}
                    />
                    <InputGroup.Text className={showClear ? 'c-search-btn' : 'qr'} onClick={() => clearSearch()}><CloseButton /></InputGroup.Text>
                    <InputGroup.Text className='c-search-btn' onClick={() => searchAlumno()}><BiSearchAlt /></InputGroup.Text>
                  </InputGroup>
                  <div className='c-text-head'>Consulta de Alumnos</div>
                </div>
              </div>
              {dataAlumno.map(alumno => (
                <div className='s-box-list' key={alumno.boleta}>
                  <div className="s-box-element">
                    <div className='s-box-name'>
                      <div className='s-box-foto'>
                        <img
                          src={"https://ui-avatars.com/api/?name=" + alumno.nombre + "+" + alumno.apellidoPaterno + "&background=8844bd&color=fafbfd&bold=true"}
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
                    <div className='s-txt-fecha'>{alumno.boleta}</div>
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
                      <div className='s-box-nombre'>{taller.codigo_taller} {taller.nombre}</div>
                      <div className='s-box-email'>{taller.descripcion}</div>
                    </div>
                    <div className='s-txt-fecha'>{taller.periodo}</div>
                    <Link to={`/edit-taller/${taller.codigo_taller}`}>Editar</Link>
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
                    <Link to={`/edit-profesor/${profesor.correo}`}>Editar</Link>
                  </div>

                </div>
              ))}
            </div>


          </div>
          {/* <div className='s-float-icon shadow-box'>
            <BsGearFill />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Consulta;