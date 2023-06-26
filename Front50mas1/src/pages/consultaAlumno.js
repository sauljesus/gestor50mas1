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
import { BiSearchAlt } from 'react-icons/bi';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { getdireccion } from '../helpers/direccion';
import * as XLSX from 'xlsx';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function ConsultaAlumno({ page }) {
  const [alumnos, setAlumnos] = useState([]);
  const [searchT, setSearchT] = useState([]);
  const [searchA, setSearchA] = useState([]);
  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [rango1, setRango1] = useState("");
  const [rango2, setRango2] = useState("");
  const [fecha1, setFecha1] = useState();
  const [fecha2, setFecha2] = useState();

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
        if (data.tipoUsuario !== 'Administrador') {
          setMessage("No tiene premiso para ver esta pagina");
          setShowNotification(true);
          setTimeout(() => {
            window.location.replace(`/mis-grupos`);
          }, 3000);
        } else {
          fetchAlumnos();
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
      })
      .catch(error => {
        console.error(error);
      });
  };
  const numeros = (c) => {
    if (c == " " || c == "+" || c == "-") {
      return false;
    }
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (numeros.indexOf(c) > -1)
      return true;
    return false;
  }
  const handleSearch = () => {
    let filtro1;
    if (rango1.length < 12 && rango1 !== "") {
      document.getElementById("e-rango").classList.remove("error-n");
    } else if (rango1 !== "") {
      filtro1 = [];
      document.getElementById("e-rango").classList.add("error-n");
      alumnos.forEach((alumno, index) => {
        let code = alumno.boleta;
        if (parseInt(code) == rango1) {
          console.log(parseInt(code));
          filtro1.push(alumno);
        }
      })
      setSearchA(filtro1);
    }
    let date1 = document.getElementById("fecha1").value;
    let date2 = document.getElementById("fecha2").value;
    let res;
    if (rango1.length < 12) {
      document.getElementById("e-fecha2").classList.add("error-n");
      if (date1 !== "" && date2 !== "") {
        if (date1 > date2) {
          document.getElementById("e-fecha").classList.remove("error-n");
        } else {
          res = [];
          document.getElementById("e-fecha").classList.add("error-n");
          let filtro2 = alumnos;
          filtro2.forEach((alumno, key) => {
            let fec = alumno.boleta.toString().substring(0, 8);
            let fech = fec.substring(0, 4) + "-" + fec.substring(4, 6) + "-" + fec.substring(6, 8);
            if (fech >= date1 && fech <= date2) {
              res.push(alumno);
            }
            setSearchA(res);
          })
        }
      } else if (date1 !== "") {
        res = [];
        document.getElementById("e-fecha").classList.add("error-n");
        let filtro2 = alumnos;
        filtro2.forEach((alumno, key) => {
          let fec = alumno.boleta.toString().substring(0, 8);
          let fech = fec.substring(0, 4) + "-" + fec.substring(4, 6) + "-" + fec.substring(6, 8);
          if (fech >= date1) {
            res.push(alumno);
          }
          setSearchA(res);
        })
      } else if (date2 !== "") {
        res = [];
        document.getElementById("e-fecha").classList.add("error-n");
        let filtro2 = alumnos;
        filtro2.forEach((alumno, key) => {
          let fec = alumno.boleta.toString().substring(0, 8);
          let fech = fec.substring(0, 4) + "-" + fec.substring(4, 6) + "-" + fec.substring(6, 8);
          if (fech <= date2) {
            res.push(alumno);
          }
          setSearchA(res);
        })
      }
    }
    if (rango1.length === 12 && (date1 !== "" || date2 !== "")) {
      document.getElementById("e-fecha2").classList.remove("error-n");
    }
    if (!filtro1 && !res) {
      setSearchA([]);
      setMessage("Ningún filtro realizado");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false)
      }, 3000);
    }
    if (filtro1 || res) {
      if (filtro1) {
        if (filtro1.length === 0) {
          setSearchA([]);
          setMessage("Ningún alumno encontrado");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false)
          }, 3000);
        }
      }
      if (res) {
        if (res.length === 0) {
          setSearchA([]);
          setMessage("Ningún alumno encontrado");
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false)
          }, 3000);
        }
      }
    }
    // if (filtro2) {
    //   setSearchA(res);
    //   if (res.length === 0) {
    //     setSearchA([]);
    //     setMessage("Ningún Alumno encontrado");
    //     setShowNotification(true);
    //     setTimeout(() => {
    //       setShowNotification(false)
    //     }, 3000);
    //   }
    // }
    // else if (filtro1) {
    //   setSearchA(filtro1);
    //   if (filtro1.length === 0) {
    //     setSearchA([]);
    //     setMessage("Ningún Alumno encontrado");
    //     setShowNotification(true);
    //     setTimeout(() => {
    //       setShowNotification(false)
    //     }, 3000);
    //   }
    // }
    // else {
    //   setSearchA([]);
    //   setMessage("Ningún filtro realizado");
    //   setShowNotification(true);
    //   setTimeout(() => {
    //     setShowNotification(false)
    //   }, 3000);
    // }
  }

  const vRango1 = (c) => { if ((numeros(c.charAt(c.length - 1)) || c.length == 0) && c.length < 13) setRango1(c); }



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
          <Header page={page} page2={"Consulta de Alumnos"} />
          <div className="c-content">

            <div className={"ing-content-form"}>
              <div className='s-box-head'>
                <div className='s-text-head'>Consulta de Alumnos</div>
              </div>
              <div className='c-box-form'>
                <div className='c-form-1'>
                  Boleta
                  <div className='c-form-rangos'>
                    <InputGroup className="">
                      <Form.Control
                        placeholder="boleta"
                        type="number"
                        id='txtBoleta'
                        value={rango1}
                        onChange={(e) => vRango1(e.target.value)}
                        maxLength={12}
                      />
                    </InputGroup>
                  </div>
                  <h5 className="f-error error-n" id="e-rango">Boleta invalido, filtro ignorado</h5>
                </div>
                <div className='c-form-1'>
                  Fecha de creación:
                  <div className='c-form-rangos'>
                    <InputGroup className="">
                      <Form.Control
                        id="fecha1"
                        placeholder="Desde"
                        type="date"
                      />
                      <InputGroup.Text id="basic-addon1">-</InputGroup.Text>
                      <Form.Control
                        id="fecha2"
                        placeholder="Hasta"
                        type="date"
                      />
                    </InputGroup>
                  </div>
                  <h5 className="f-error error-n" id="e-fecha">Rango invalido, filtro ignorado</h5>
                  <h5 className="f-error error-n" id="e-fecha2">Boleta ingresada, filtro ignorado</h5>
                </div>
                <div className='c-form-btn'>
                  <InputGroup.Text onClick={() => handleSearch()} className='c-search-btn-b mb-2'>Buscar <BiSearchAlt /></InputGroup.Text>
                </div>
              </div>
              {searchA.map(alumno => (
                <div className='s-box-list' key={alumno.boleta}>
                  <div className="c-box-element">
                    <div className='s-box-name'>
                      <div className='s-box-foto'>
                        <img
                          src={IMG}
                          alt="estadistica1"
                          className='s-img'
                        />
                      </div>
                      <div className='s-box-nombre'>{alumno.boleta} {alumno.nombre}</div>
                      <div className='s-box-email'>{alumno.correo}</div>
                    </div>
                    <div className='s-txt-fecha'>{alumno.createdAt}</div>
                    <Link to={`/edit/${alumno.boleta}`}>Editar</Link>
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

export default ConsultaAlumno;