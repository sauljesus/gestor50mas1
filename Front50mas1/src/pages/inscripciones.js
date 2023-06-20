import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearchAlt } from 'react-icons/bi';

function Inscripciones({ page }) {
  const [textPage, setTextPage] = useState("Inscribir alumno");
  const [showTable, setShowTable] = useState(false);
  const [showAlumno, setShowAlumno] = useState(true);
  const [showTaller, setShowTaller] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notiMsg, setNotiMsg] = useState("");
  const [status, setStatus] = useState();
  const [sAlumno, setSAlumno] = useState("");
  const [sTaller, setSTaller] = useState("");

  const setShow = (type) => {
    setSAlumno("");
    setSTaller("");
    if (type == "alumno") {
      setShowAlumno(true);
      setShowTaller(false);
    }
    if (type == "taller") {
      setShowAlumno(false);
      setShowTaller(true);
    }
  }

  ///////////////////////INSCRIBIR POR ALUMNO /////////
  const [alumnos, setAlumnos] = useState([]);
  const [talleres, setTalleres] = useState([]);



  const fetchTalleres = () => {
    axios.get(`http://localhost:5000/alumno/${sAlumno}`)
      .then(response => {
        if (response.data) {
          setStatus(response.data.status);
          setShowTable(true);
          axios.get(`http://localhost:5000/talleresAlumno/talleresInscrito/${sAlumno}`)
            .then(response => {
              setTalleres(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          setNotiMsg("Alumno no encontrado");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const inscribirTaller = () => {
    let flag = true;
    talleres.forEach(element => {
      if(element.codigo_taller.toString() === sTaller.toString()){
        flag = false;
        setNotiMsg("Alumno ya inscrito a este grupo");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
      }
    });
    if (flag)
      axios.post(`http://localhost:5000/talleresAlumno/inscribirATaller`, { alumno: sAlumno, taller: sTaller })
        .then(response => {
          setSTaller("");
          setNotiMsg(response.data.msg);
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
          fetchTalleres();
        })
        .catch(error => {
          console.error(error);
          setNotiMsg("No se pudo inscribir");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        });
  }

  const handleSearchAlumno = (e) => {
    setSAlumno(e.target.value);
  }
  const handleSearchTaller = (e) => {
    setSTaller(e.target.value);
  };









  const [dataAlumno, setDataAlumno] = useState([]);
  const fetchAlumnos = () => {
    axios.get('http://localhost:5000/alumnos')
      .then(response => {
        setAlumnos(response.data);
        setDataAlumno(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };





  return (
    <>
      {showNotification && (
        <div className="notification">
          {notiMsg}
        </div>
      )}
      <Navbar page={page} />
      <div className='s-body_index'>
        <div className="main-container">
          <Header page={page} page2={textPage} />
          <div className="s-content">
            {/* <DropdownButton id="dropdown-basic-button" title='Seleccionar el tipo de inscripción' className='ing-drop'>
              <Dropdown.Item onClick={() => { setShow("alumno"); setTextPage("Inscribir alumno") }}>Alumno</Dropdown.Item>
              <Dropdown.Item onClick={() => { setShow("taller"); setTextPage("Inscribir a taller") }}>Taller</Dropdown.Item>
            </DropdownButton> */}

            <div className={showAlumno ? "ing-content-form" : "ing-display-n"}>
              <div className='c-box-head'>
                <div className='i-search-box'>
                  <div className='c-text-head'>Inscribir alumno</div>
                  <InputGroup className="mb-3 no-float">
                    <Form.Control
                      placeholder="Boleta"
                      onChange={(e) => handleSearchAlumno(e)}
                      value={sAlumno}
                    />
                    <InputGroup.Text className='c-search-btn' onClick={() => fetchTalleres()}><BiSearchAlt /></InputGroup.Text>
                  </InputGroup>

                </div>
              </div>

              <div className={showTable ? "" : "qr"}>
                <div className='i-form-container'>
                  <h1 className='i-details'>Inscribir al grupo:</h1>
                  <InputGroup className="no-float">
                    <Form.Control
                      placeholder="Código taller"
                      onChange={(e) => handleSearchTaller(e)}
                      value={sTaller}
                    />
                    <InputGroup.Text className='c-search-btn' onClick={() => inscribirTaller()}>Aceptar</InputGroup.Text>
                  </InputGroup>
                </div>
                <div className='i-table-header'>
                  <div className='s-txt-fecha'>#</div>
                  <div className='s-txt-fecha'>Taller</div>
                  <div className='s-txt-fecha'>Calificación</div>
                  <div className='s-txt-fecha'>Estado</div>
                </div>
                {talleres.map(taller => (
                  <div className='s-box-list' key={taller.codigo_taller}>
                    <div className="i-table-header">
                      <div className='i-box-nombre'>{taller.codigo_taller}</div>
                      <div className='i-box-nombre'>{taller.nombre}</div>
                      <div className='s-txt-fecha'>{taller.calificacion}</div>
                      <div className='s-txt-fecha'>{taller.estado}</div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className={showTaller ? "ing-content-form" : "ing-display-n"}>
              <div className='s-box-head'>
                <div className='s-text-head'>Consulta de Talleres</div>
              </div>
              {talleres.map(taller => (
                <div className='s-box-list' key={taller.codigo_taller}>
                  <div className="s-box-element">
                    <div className='s-box-name'>
                      <div className='s-box-nombre'>{taller.nombre}</div>
                      <div className='s-box-email'>{taller.descripcion}</div>
                    </div>
                    <div className='s-txt-fecha'>{taller.periodo}</div>
                    <Link to={`/edit-taller/${taller.codigo_taller}`}>Editar</Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inscripciones;