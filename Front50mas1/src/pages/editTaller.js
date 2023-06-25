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

function EditTaller({ page }) {
  const [talleres, setTalleres] = useState([]);
  const { taller } = useParams();
  const [showNotification, setShowNotification] = useState(false);
  const [msgNoti, setMsgNoti] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [desc, setDesc] = useState("");
  const [periodo, setPeriodo] = useState("");

  useEffect(() => {
    fetchTaller();
  }, []);

  const fetchTaller = () => {
    axios.get(`${getdireccion()}/taller/${taller}`)
      .then(response => {
        setTalleres(response.data);
        setCorreo(response.data.correo);
        setNombre(response.data.nombre);
        setDesc(response.data.descripcion);
        setPeriodo(response.data.periodo);
      })
      .catch(error => {
        console.error(error);
      });
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName("error-n");
    if (nerrors.length != 4) {
      setMsgNoti("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else {
      let Tal = talleres;
      Tal["nombre"] = nombre;
      Tal["descripcion"] = desc;
      Tal["periodo"] = periodo;
      Tal["correo"] = correo;
      try {
        const response = await axios.put(`${getdireccion()}/talleredit/${talleres.codigo_taller}`, Tal);

        setShowNotification(true);
        setMsgNoti("Taller actualizado correctamente");
        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

      } catch (error) {
        if (error.response.data.msg.toString().includes("Correo no registrado"))
          setMsgNoti("Taller no se pudo actualizar, correo ingresado no registrado");
        else
          setMsgNoti("Taller no se pudo actualizar");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    }

  };

  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length === 0) setNombre(v); }
  const vNombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaCorreo = (v) => { if ((charEmail(v.charAt(v.length - 1)) || v.length === 0)) setCorreo(v); }
  const vCorreo = () => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correo) || correo.length === 0) {
      document.getElementById("e-correo").classList.add('error-n');
    } else {
      document.getElementById("e-correo").classList.remove('error-n');
    }
  }
  const validaDesc = (v) => { setDesc(v); }
  const vDesc = () => { if (desc.length >= 3) document.getElementById("e-desc").classList.add('error-n'); else { document.getElementById("e-desc").classList.remove('error-n'); } }
  const validaPeriodo = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length === 0 || v.charAt(v.length - 1) === "-") setPeriodo(v); }
  const vPeriodo = () => { if (periodo.length >= 3) document.getElementById("e-periodo").classList.add('error-n'); else { document.getElementById("e-periodo").classList.remove('error-n'); } }

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
                <div className='p-txt-nombre'>{talleres.nombre}</div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Código</div>
                  <div className='p-text-gray'>{talleres.codigo_taller}</div>
                </div>
              </div>
              <div className='p-btn-actualizar'>
                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
              </div>
            </div>
            <div className="t-info">
              <div className='t-title-cont'>
                <div>Información del taller</div>
              </div>

              <form >
                <div className="t-form">
                  <div className="form-field">
                    <label htmlFor="nombre">Nombre:</label>
                    <input onChange={(e) => { validaNombre(e.target.value) }} onBlur={() => vNombre()} value={nombre} required minLength={3} maxlength={50} type="text" id="name" className='t-cimput' />
                    <h5 className="f-error error-n" id="e-nombre">Campo debe ser mayor de 2 caracteres</h5>
                  </div>
                  <div className="form-field">
                    <label htmlFor="correo">Encargado(correo):</label>
                    <input onChange={(e) => { validaCorreo(e.target.value) }} onBlur={() => vCorreo()} value={correo} type="text" id="correo" maxLength={50} className='t-cimput' />
                    <h5 className="f-error error-n" id="e-correo">Formato de correo invalido</h5>
                  </div>
                  <div className="form-field">
                    <label htmlFor="periodo">Periodo:</label>
                    <input required onChange={(e) => { validaPeriodo(e.target.value) }} onBlur={() => vPeriodo()} value={periodo} minLength={3} maxlength="20" type="text" id="periodo" className='t-cimput' />
                    <h5 className="f-error error-n" id="e-periodo">Campo debe ser mayor de 2 caracteres</h5>
                  </div>
                  <div className="form-field">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input onChange={(e) => { validaDesc(e.target.value) }} onBlur={() => vDesc()} value={desc} minLength={3} required maxlength="200" type="text" id="descripcion" className='t-cimput' />
                    <h5 className="f-error error-n" id="e-desc">Campo debe ser mayor de 2 caracteres</h5>
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

export default EditTaller;