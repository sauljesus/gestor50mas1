import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import axios from 'axios';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import CloseButton from 'react-bootstrap/CloseButton';
import { getdireccion } from '../helpers/direccion';

const DirectorForm = ({ page }) => {
  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showContra1, setShowContra1] = useState(false);
  const [showContra2, setShowContra2] = useState(false);

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

  const crearUsuario = (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName('error-n');
    if (nerrors.length != 6) {
      setMessage("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else {
      const user = {
        'nombre': `${e.target.elements.txtnombreU.value}`,
        'apellidoPaterno': `${e.target.elements.txtapPaternoU.value}`,
        'apellidoMaterno': `${e.target.elements.txtapMaternoU.value}`,
        'correo': `${e.target.elements.txtEmailU.value}`,
        'password': `${e.target.elements.txtpassU.value}`,
        'confpassword': `${e.target.elements.txtconfpassU.value}`
      };
      console.log(user);
      axios.post(`${getdireccion()}/newDir`, user).then((res) => {
        setMessage(res.data.msg);
        setShowNotification(true);
        document.getElementById("crear-usuario").reset();
        reset();
        setTimeout(() => {
        }, 5000);
      }).catch((err) => {
        var mensaje = err.response.data.msg;
        console.log(mensaje);
        setMessage(mensaje);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      })
    }
  };

  const reset = () => {
    setShowContra1(false);
    setShowContra2(false);
    setNombre("");
    setApellidoM("");
    setApellidoP("");
    setCorreo("");
    setContraseña("");
    setContraseña2("");
  }

  const verContra = () => {
    setShowContra1(!showContra1);
    var tipo = document.getElementById("passWRD");
    if (tipo.type == "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  }

  const verContra2 = () => {
    setShowContra2(!showContra2);
    var tipo = document.getElementById("passWRD2");
    if (tipo.type == "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  }

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

  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");

  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length == 0) setNombre(v); }
  const vnombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaApellidoP = (v) => { if (letras(v.charAt(v.length - 1)) || v.length == 0) setApellidoP(v); }
  const vapellidoP = () => { if (apellidoP.length >= 3) document.getElementById("e-apellidoP").classList.add('error-n'); else { document.getElementById("e-apellidoP").classList.remove('error-n'); } }
  const validaApellidoM = (v) => { if (letras(v.charAt(v.length - 1)) || v.length == 0) setApellidoM(v); }
  const vapellidoM = () => { if (apellidoM.length >= 3) document.getElementById("e-apellidoM").classList.add('error-n'); else { document.getElementById("e-apellidoM").classList.remove('error-n'); } }
  const validaCorreo = (v) => { if ((charEmail(v.charAt(v.length - 1)) || v.length == 0)) setCorreo(v); }
  const vCorreo = () => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correo)) {
      document.getElementById("e-correo").classList.add('error-n');
    } else {
      document.getElementById("e-correo").classList.remove('error-n');
    }
  }
  const validaContraseña = (v) => { if ((letrasSAYN(v.charAt(v.length - 1)) || v.length == 0 || caracteresEspeciales(v.charAt(v.length - 1)))) setContraseña(v); }
  const vContraseña = () => {
    let flagn = false;
    let flagc = false;
    for (let i = 0; i < contraseña.length; i++) {
      if (numeros(contraseña[i]))
        flagn = true;
      if (caracteresEspeciales(contraseña[i]))
        flagc = true;
    }
    if (contraseña.length > 7 && flagc && flagn) document.getElementById("e-contraseña").classList.add('error-n'); else { document.getElementById("e-contraseña").classList.remove('error-n'); }
  }
  const validaContraseña2 = (v) => { if ((letrasSAYN(v.charAt(v.length - 1)) || v.length == 0 || caracteresEspeciales(v.charAt(v.length - 1)))) setContraseña2(v); }
  const vContraseña2 = () => { if (contraseña != contraseña2) document.getElementById("e-contraseña2").classList.remove('error-n'); else document.getElementById("e-contraseña2").classList.add('error-n'); }

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
                  <form id="crear-usuario" className='f-cont-form-reg' onSubmit={crearUsuario}>
                    <h1 className='f-log-semititu'>Nombre</h1>
                    <input id="r-nombre" required onChange={(e) => { validaNombre(e.target.value) }} onBlur={() => vnombre()} value={nombre} maxLength={45} minLength={3} className='f-log-input-r' type="text" name="txtnombreU" placeholder="Nombre" />
                    <h5 className="f-error error-n" id="e-nombre">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Apellido Paterno</h1>
                    <input id="r-apellidoP" required onChange={(e) => { validaApellidoP(e.target.value) }} onBlur={() => vapellidoP()} value={apellidoP} maxLength={30} minLength={3} className='f-log-input-r' type="text" name="txtapPaternoU" placeholder="Apellido Paterno" />
                    <h5 className="f-error error-n" id="e-apellidoP">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Apellido Materno</h1>
                    <input onChange={(e) => { validaApellidoM(e.target.value) }} onBlur={() => vapellidoM()} value={apellidoM} required minLength={3} maxLength={30} className='f-log-input-r' type="text" name="txtapMaternoU" placeholder="Apellido Materno" />
                    <h5 className="f-error error-n" id="e-apellidoM">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Correo</h1>
                    <input onChange={(e) => { validaCorreo(e.target.value) }} onBlur={() => vCorreo()} value={correo} required minLength={5} maxLength={50} className='f-log-input-r' type="email" name="txtEmailU" placeholder="Correo" />
                    <h5 className="f-error error-n" id="e-correo">Correo no válido</h5>

                    <h1 className='f-log-semititu'>Contraseña</h1>
                    <div className='input-contraseña'>
                      <input onChange={(e) => { validaContraseña(e.target.value) }} onBlur={() => vContraseña()} value={contraseña} minLength={8} maxLength={50} required className='f-log-input-r' type="password" id="passWRD" name="txtpassU" placeholder="Contraseña" />
                      <div className='Button-contraseña' onClick={() => verContra()}>{showContra1 ? <RxEyeOpen /> : <RxEyeClosed />}</div>
                    </div>
                    <h5 className="f-error error-n" id="e-contraseña">Contraseña debe ser mayor a 7 caracteres, contener al menos 1 número y 1 caracter especial: ~ @ # _ ^ % / . : ; = </h5>

                    <h1 className='f-log-semititu'>Confirmar Contraseña</h1>
                    <div className='input-contraseña'>
                      <input onChange={(e) => { validaContraseña2(e.target.value) }} onBlur={() => vContraseña2()} value={contraseña2} minLength={8} maxLength={50} required className='f-log-input-r' id="passWRD2" type="password" name="txtconfpassU" placeholder="Contraseña" />
                      <div className='Button-contraseña' onClick={() => verContra2()}>{showContra2 ? <RxEyeOpen /> : <RxEyeClosed />}</div>
                    </div>
                    <h5 className="f-error error-n" id="e-contraseña2">Contraseñas no coinciden</h5>

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

};

export default DirectorForm;









