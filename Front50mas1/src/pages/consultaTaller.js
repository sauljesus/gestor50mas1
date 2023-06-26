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


function ConsultaTaller({ page }) {
  const [talleres, setTalleres] = useState([]);
  const [searchT, setSearchT] = useState([]);
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

  const fetchTalleres = () => {
    axios.get(`${getdireccion()}/talleres`)
      .then(response => {
        setTalleres(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const exportToExcel = (data, filename) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, filename + '.xlsx');
  };

  const handleExportTalleres = () => {
    exportToExcel(talleres, 'Talleres'); // 'datos' será el nombre del archivo Excel
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
    if (rango1 !== "" && parseInt(rango1) < 0)
      document.getElementById("e-rango").classList.remove("error-n");
    else if (rango2 !== "" && parseInt(rango2) < 0)
      document.getElementById("e-rango").classList.remove("error-n");
    else
      if (rango1 !== "" && rango2 !== "") {
        let r1 = parseInt(rango1, 10);
        let r2 = parseInt(rango2, 10);
        if (r1 > r2) {
          document.getElementById("e-rango").classList.remove("error-n");
        } else {
          filtro1 = [];
          document.getElementById("e-rango").classList.add("error-n");
          talleres.forEach((taller, index) => {
            let code = taller.codigo_taller.substring(1, 4);
            if (parseInt(code) >= r1 && parseInt(code) <= r2) {
              filtro1.push(taller);
            }
          })
        }
      } else if (rango1 !== "" && rango2 === "") {
        filtro1 = [];
        let r1 = parseInt(rango1, 10);
        document.getElementById("e-rango").classList.add("error-n");
        talleres.forEach((taller, index) => {
          let code = taller.codigo_taller.substring(1, 4);
          if (parseInt(code) >= r1) {
            filtro1.push(taller);
          }
        })
      }
      else if (rango2 !== "" && rango1 === "") {
        filtro1 = [];
        let r2 = parseInt(rango2, 10);
        document.getElementById("e-rango").classList.add("error-n");
        talleres.forEach((taller, index) => {
          let code = taller.codigo_taller.substring(1, 4);
          if (parseInt(code) <= r2) {
            filtro1.push(taller);
          }
        })
      }
    let res = [];
    let filtro2;
    let date1 = document.getElementById("fecha1").value;
    let date2 = document.getElementById("fecha2").value;

    if (date1 !== "" && date2 !== "") {
      if (date1 > date2) {
        document.getElementById("e-fecha").classList.remove("error-n");
      } else {
        document.getElementById("e-fecha").classList.add("error-n");
        filtro2 = filtro1 ? filtro1 : talleres;
        filtro2.forEach((taller, key) => {
          let creado = taller.createdAt.substring(0, 10);
          if (creado >= date1 && creado <= date2) {
            res.push(taller);
          }
        })
      }
    } else if (date1 !== "") {
      document.getElementById("e-fecha").classList.add("error-n");
      filtro2 = filtro1 ? filtro1 : talleres;
      filtro2.forEach((taller, key) => {
        let creado = taller.createdAt.substring(0, 10);
        if (creado >= date1) {
          res.push(taller);
        }
      })
    } else if (date2 !== "") {
      document.getElementById("e-fecha").classList.add("error-n");
      filtro2 = filtro1 ? filtro1 : talleres;
      filtro2.forEach((taller, key) => {
        let creado = taller.createdAt.substring(0, 10);
        if (creado <= date2) {
          res.push(taller);
        }
      })
    }
    if (filtro2) {
      setSearchT(res);
      if (res.length === 0) {
        setSearchT([]);
        setMessage("Ningún taller encontrado");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false)
        }, 3000);
      }
    }
    else if (filtro1) {
      setSearchT(filtro1);
      if (filtro1.length === 0) {
        setSearchT([]);
        setMessage("Ningún taller encontrado");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false)
        }, 3000);
      }
    }
    else {
      setSearchT([]);
      setMessage("Ningún filtro realizado");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false)
      }, 3000);
    }
  }
  const vRango1 = (c) => { if ((numeros(c.charAt(c.length - 1)) || c.length == 0) && c.length < 4) setRango1(c); }
  const vRango2 = (c) => { if ((numeros(c.charAt(c.length - 1)) || c.length == 0) && c.length < 4) setRango2(c); }

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
          <Header page={page} page2={"Consulta de talleres"} />
          <div className="c-content">

            <div className={"ing-content-form"}>
              <div className='s-box-head'>
                <div className='s-text-head'>Consulta de Talleres</div>
              </div>
              <div className='c-box-form'>
                <div className='c-form-1'>
                  Rango de código:
                  <div className='c-form-rangos'>
                    <InputGroup className="">
                      <Form.Control
                        placeholder="Desde"
                        type="number"
                        value={rango1}
                        onChange={(e) => vRango1(e.target.value)}
                        maxLength={3}
                      />
                      <InputGroup.Text id="basic-addon1">-</InputGroup.Text>
                      <Form.Control
                        placeholder="Hasta"
                        type="number"
                        value={rango2}
                        onChange={(e) => vRango2(e.target.value)}
                        maxLength={3}
                      />
                    </InputGroup>
                  </div>
                  <h5 className="f-error error-n" id="e-rango">Rango invalido, filtro ignorado</h5>
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
                </div>
                <div className='c-form-btn'>
                  <InputGroup.Text onClick={() => handleSearch()} className='c-search-btn-b mb-2'>Buscar <BiSearchAlt /></InputGroup.Text>
                </div>
              </div>
              {searchT.map(taller => (
                <div className='s-box-list' key={taller.codigo_taller}>
                  <div className="c-box-element">
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

          </div>
        </div>
      </div>
    </>
  );
}

export default ConsultaTaller;