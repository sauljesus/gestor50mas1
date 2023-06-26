import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { getdireccion } from '../helpers/direccion';
import * as XLSX from 'xlsx';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CloseButton from 'react-bootstrap/CloseButton';


function ConsultaProfesor({ page }) {
  const [profesores, setProfesores] = useState([]);
  const [searchP, setSearchP] = useState([]);
  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [correo, setCorreo] = useState("");

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
          fetchProfesores();
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

  const fetchProfesores = () => {
    axios.get(`${getdireccion()}/usuarios`)
      .then(responsep => {
        setProfesores(responsep.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(correo)) {
      document.getElementById("e-correo").classList.remove('error-n');
    } else {
      let profes = [];
      document.getElementById("e-correo").classList.add('error-n');
      profesores.forEach((profe, key) => {
        if (profe.correo == correo) {
          profes.push(profe);
        }
      })
      if (profes.length > 0) {
        setSearchP(profes);
      } else {
        setMessage("Ningún profesor encontrado");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }

    }
  }
  const charEmail = (c) => {
    let caracteres = ["@", "-", ".", "_"];
    if (c == " ")
      return false;
    if (letras(c))
      return true;
    if (numeros(c))
      return true;
    if (caracteres.indexOf(c) > -1)
      return true;
    return false;
  }
  const numeros = (c) => {
    if (c == " " || c == "+" || c == "-") {
      return false;
    }
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (numeros.indexOf(c) > -1)
      return true;
    return false;
  }
  const letras = (c) => {
    let acentos = ["á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"];
    if (letrasSA(c))
      return true;
    if (acentos.indexOf(c) > -1)
      return true;
    return false;
  }
  const letrasE = (c) => { if (letras(c) || c == " ") return true; return false; };
  const letrasSA = (c) => {
    if (c == " ") {
      return false;
    }
    let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ñ"];
    let mLetras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ñ"];
    if (letras.indexOf(c) > -1)
      return true;
    if (mLetras.indexOf(c) > -1)
      return true;
    return false;
  }
  const validaCorreo = (v) => { if ((charEmail(v.charAt(v.length - 1)) || v.length == 0)) setCorreo(v); }

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
          <Header page={page} page2={"Consulta de profesores"} />
          <div className="c-content">

            <div className={"ing-content-form"}>
              <div className='s-box-head'>
                <div className='s-text-head'>Consulta de Profesores</div>
              </div>
              <div className='c-box-search-p'>
                <InputGroup className="no-float">
                  <Form.Control
                    placeholder="Correo"
                    onChange={(e) => { validaCorreo(e.target.value) }}
                    value={correo}
                  />
                  <InputGroup.Text className='c-search-btn-p' onClick={() => handleSearch()}><h6>Buscar</h6> <BiSearchAlt /></InputGroup.Text>
                </InputGroup>
                <h5 className="f-error error-n" id="e-correo">Correo no válido</h5>
              </div>
              {searchP.map(profesor => (
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
        </div>
      </div>
    </>
  );
}

export default ConsultaProfesor;