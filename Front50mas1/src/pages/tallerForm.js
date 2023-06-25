import Navbar from '../components/navbar';
import Header from '../components/header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';
import '../styles/forms.css'
import { getdireccion } from '../helpers/direccion';


const TallerForm = ({ page }) => {

  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

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
            window.location.replace(`/home`);
          }, 3000);
        } else {
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

  const crearTaller = (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName("error-n");
    if (nerrors.length != 4) {
      setMessage("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else {
      const taller = {
        'correo': `${e.target.elements.txtcorreoTaller.value}`,
        'nombre': `${e.target.elements.txtnombreTaller.value}`,
        'descripcion': `${e.target.elements.txtdescripcionTaller.value}`,
        'periodo': `${e.target.elements.txtperiodoTaller.value}`
      };
      axios.post(`${getdireccion()}/tallercreate`, taller).then((res) => {
        setMessage(res.data.msg);
        setShowNotification(true);
        reset();
        setTimeout(() => {
        }, 5000);
      }).catch((err) => {
        console.log(err);
        var mensaje = err.response.data.msg;
        setMessage(mensaje);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      })
    }
  };

  const caracteresEspeciales = (c) => {
    let chars = ["~", "@", "#", "_", "^", "%", "/", ".", ":", ";", "="];
    if (c == " ")
      return false;
    if (chars.indexOf(c) > -1)
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
  const numeros = (c) => {
    if (c == " " || c == "+" || c == "-") {
      return false;
    }
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (numeros.indexOf(c) > -1)
      return true;
    return false;
  }
  const letrasSAYN = (c) => {
    if (letrasSA(c))
      return true;
    if (numeros(c))
      return true;
    return false;
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

  const reset = () => {
    setCorreo("");
    setNombre("");
    setDesc("");
    setPeriodo("");
  }

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [desc, setDesc] = useState("");
  const [periodo, setPeriodo] = useState("");

  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length == 0) setNombre(v); }
  const vNombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaCorreo = (v) => { if ((charEmail(v.charAt(v.length - 1)) || v.length == 0)) setCorreo(v); }
  const vCorreo = () => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correo) || correo.length == 0) {
      document.getElementById("e-correo").classList.add('error-n');
    } else {
      document.getElementById("e-correo").classList.remove('error-n');
    }
  }
  const validaDesc = (v) => { setDesc(v); }
  const vDesc = () => { if (desc.length >= 3) document.getElementById("e-desc").classList.add('error-n'); else { document.getElementById("e-desc").classList.remove('error-n'); } }
  const validaPeriodo = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length == 0 || v.charAt(v.length - 1) == "-") setPeriodo(v); }
  const vPeriodo = () => { if (periodo.length >= 3) document.getElementById("e-periodo").classList.add('error-n'); else { document.getElementById("e-periodo").classList.remove('error-n'); } }

  return (
    <>
      {showNotification && (
        <div className="notification">
          <CloseButton variant="white" className='button-alert' onClick={() => setShowNotification(false)} />
          {message}
        </div>
      )}
      <Navbar page={page} tipe={"A"} />
      <div className='s-body_index'>
        <div className="main-container">
          <Header page={page} page2={"Registro de talleres"} />
          <div className="s-content">
            <div className='ing-grid'>
              <div className="ing-content-form">
                <div className='s-box-head'>
                  <div className='s-text-head'>Registar nuevo taller</div>
                </div>
                <div className='f-block'>
                  <form id="crear-taller" className='f-cont-form-reg' onSubmit={crearTaller}>
                    <h1 className='f-log-semititu'>Correo del profesor a cargo</h1>
                    <input onChange={(e) => { validaCorreo(e.target.value) }} onBlur={() => vCorreo()} value={correo} className='f-log-input-r' maxLength="50" type="email" name="txtcorreoTaller" />
                    <h5 className="f-error error-n" id="e-correo">Formato de correo invalido</h5>

                    <h1 className='f-log-semititu'>Nombre</h1>
                    <input onChange={(e) => { validaNombre(e.target.value) }} onBlur={() => vNombre()} value={nombre} required className='f-log-input-r' minLength={3} maxLength="50" type="text" name="txtnombreTaller" />
                    <h5 className="f-error error-n" id="e-nombre">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Descripcion</h1>
                    <input onChange={(e) => { validaDesc(e.target.value) }} onBlur={() => vDesc()} value={desc} required minLength={3} className='f-log-input-r' maxLength="200" type="text" name="txtdescripcionTaller" />
                    <h5 className="f-error error-n" id="e-desc">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Periodo</h1>
                    <input onChange={(e) => { validaPeriodo(e.target.value) }} onBlur={() => vPeriodo()} value={periodo} required className='f-log-input-r' minLength={3} maxLength="20" type="text" name="txtperiodoTaller" />
                    <h5 className="f-error error-n" id="e-periodo">Campo debe ser mayor de 2 caracteres</h5>

                    <button className='f-log-boton-formi'>Registrar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default TallerForm;