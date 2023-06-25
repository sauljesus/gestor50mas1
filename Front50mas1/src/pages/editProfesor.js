import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/edit.css';
import { AiFillCamera } from 'react-icons/ai';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}

function EditProfesor({ page }) {
  const [profe, setProfe] = useState([]);
  const { correo } = useParams();
  const [showNotification, setShowNotification] = useState(false);
  const [msgNoti, setMsgNoti] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correoS, setCorreoS] = useState("");


  useEffect(() => {
    fetchProfesor();
  }, []);

  const fetchProfesor = () => {
    axios.get(`${getdireccion()}/usuario/${correo}`)
      .then(response => {
        let d = response.data;
        setProfe(response.data);
        setNombre(d.nombre);
        setCorreoS(d.correo);
        setApellidoM(d.apellidoMaterno);
        setApellidoP(d.apellidoPaterno);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length === 0) setNombre(v); }
  const vnombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaApellidoP = (v) => { if (letras(v.charAt(v.length - 1)) || v.length === 0) setApellidoP(v); }
  const vapellidoP = () => { if (apellidoP.length >= 3) document.getElementById("e-apellidoP").classList.add('error-n'); else { document.getElementById("e-apellidoP").classList.remove('error-n'); } }
  const validaApellidoM = (v) => { if (letras(v.charAt(v.length - 1)) || v.length === 0) setApellidoM(v); }
  const vapellidoM = () => { if (apellidoM.length >= 3) document.getElementById("e-apellidoM").classList.add('error-n'); else { document.getElementById("e-apellidoM").classList.remove('error-n'); } }
  const validaCorreo = (v) => { if ((charEmail(v.charAt(v.length - 1)) || v.length === 0)) setCorreoS(v); }
  const vCorreo = () => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correoS)) {
      document.getElementById("e-correo").classList.add('error-n');
    } else {
      document.getElementById("e-correo").classList.remove('error-n');
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName('error-n');
    if (nerrors.length != 4) {
      setMsgNoti("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else{
      let Prof = profe;
      Prof["nombre"] = nombre;
      Prof["apellidoMaterno"] = apellidoM;
      Prof["apellidoPaterno"] = apellidoP;
      Prof["correo"] = correoS;
      try {
        const response = await axios.put(`${getdireccion()}/profesoredit/${correo}`, Prof);
  
        setShowNotification(true);
        setMsgNoti("Profesor actualizado correctamente");
        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
  
      } catch (error) {
        if (error.response.data.msg.toString().includes("Correo ya registrado"))
          setMsgNoti("Profesor no se pudo actualizar, el correo ya se encuentra registrado");
        else
          setMsgNoti("Profesor no se pudo actualizar");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    }
    
  };

  const caracteresEspeciales = (c) => {
    let chars = ["~", "@", "#", "_", "^", "%", "/", ".", ":", ";", "="];
    if (c === " ")
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
  const letrasE = (c) => { if (letras(c) || c === " ") return true; return false; };
  const letrasSA = (c) => {
    if (c === " ") {
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
    if (c === " " || c === "+" || c === "-") {
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
    if (c === " ")
      return false;
    if (letras(c))
      return true;
    if (numeros(c))
      return true;
    if (caracteres.indexOf(c) > -1)
      return true;
    return false;
  }

  return (
    <>
      {showNotification && (
        <div className="notification">
          {msgNoti}
        </div>
      )}
      <Navbar page={page} type={"A"} />
      <div className='body_index'>
        <div className="main-container">
          <Header page={page} page2={"Edición"} />
          <div className="p-content">
            <div className="p-main">

              <div className='p-cont-foto'>
                <img className="imagen-perfil"
                  src={IMG}
                  alt=""
                ></img>
                <div className="boton-perfil">
                  <AiFillCamera />

                </div>
              </div>
              <div className='p-cont-nombre'>
                <div className='p-txt-nombre'>{profe.nombre} {profe.apellidoPaterno} {profe.apellidoMaterno}</div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Correo:</div>
                  <div className='p-text-gray'>{profe.correo}</div>
                </div>
              </div>
              <div className='p-btn-actualizar'>
                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
              </div>
            </div>
            <div className="t-info">
              <div className='p-title-cont'>
                <div>Información del Profesor</div>
              </div>
              <form >
                <div className="form">
                  <div className="column">
                    <div className="form-field">
                      <label htmlFor="nombre">Nombre:</label>
                      <input required onChange={(e) => { validaNombre(e.target.value) }} onBlur={() => vnombre()} value={nombre} maxLength={45} minLength={3} type="text" id="name" className='cimput' />
                      <h5 className="f-error error-n" id="e-nombre">Campo debe ser mayor de 2 caracteres</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                      <input required onChange={(e) => { validaApellidoP(e.target.value) }} onBlur={() => vapellidoP()} value={apellidoP} maxLength={30} minLength={3} type="text" id="appat" className='cimput' />
                      <h5 className="f-error error-n" id="e-apellidoP">Campo debe ser mayor de 2 caracteres</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                      <input onChange={(e) => { validaApellidoM(e.target.value) }} onBlur={() => vapellidoM()} value={apellidoM} required minLength={3} maxLength={30} type="text" id="apmat" className='cimput' />
                    </div>
                    <h5 className="f-error error-n" id="e-apellidoM">Campo debe ser mayor de 2 caracteres</h5>
                  </div>
                  <div className="column">
                    <div className="form-field">
                      <label htmlFor="correo">Correo:</label>
                      <input onChange={(e) => { validaCorreo(e.target.value) }} onBlur={() => vCorreo()} value={correoS} required minLength={5} maxLength={50} type="text" id="correo" className='cimput' />
                      <h5 className="f-error error-n" id="e-correo">Correo invalido</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="status">Estatus:</label>
                      <select name="status" className='cimput' onChange={(e) => setProfe({
                        ...profe,
                        status: e.target.value
                      })}>
                        <option value="Activo" selected={profe.status === "Activo" ? true : false} >Activo</option>
                        <option value="Inactivo" selected={profe.status === "Inactivo" ? true : false} >Inactivo</option>
                      </select>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default EditProfesor;