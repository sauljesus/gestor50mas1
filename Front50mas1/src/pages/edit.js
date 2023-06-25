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
import states from '../helpers/states.json';
//${getdireccion()}

function Edit({ page }) {
  const [alumno, setAlumno] = useState([]);
  const { boleta } = useParams();
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [curp, setCurp] = useState("");
  const [rfc, setRFC] = useState("");
  const [edad, setEdad] = useState("");
  const [cp, setCP] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setmunicipio] = useState("");
  const [colonia, setcolonia] = useState("");
  const [colonias, setColonias] = useState([]);
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [sexo, setSexo] = useState("");
  const [sextype, setsextype] = useState(['Masculino', 'Femenino']);
  const Sexo = sextype.map((Sexo) => Sexo);

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = () => {
    axios.get(`${getdireccion()}/alumno/${boleta}`)
      .then(response => {
        let d = response.data;
        setAlumno(response.data);
        setNombre(d.nombre);
        setApellidoM(d.apellidoMaterno);
        setApellidoP(d.apellidoPaterno);
        setCurp(d.curp);
        setEdad(d.edad);
        setRFC(d.rfc);
        setEstado(d.estado);
        setmunicipio(d.municipio);
        setcolonia(d.colonia);
        setCalle(d.calle);
        setNumero(d.numero);
        setSexo(d.sexo);
        setCP(d.CP);
        setColonias([d.colonia]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName('error-n');
    if (nerrors.length !== 10) {
      setMessage("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else {
      try {
        let Al = alumno;
        Al["nombre"] = nombre;
        Al["apellidoPaterno"] = apellidoP;
        Al["apellidoMaterno"] = apellidoM;
        Al["edad"] = edad;
        Al["sexo"] = document.getElementById('sexo').value;
        Al["curp"] = curp;
        Al["rfc"] = rfc;
        Al["CP"] = cp;
        Al["estado"] = estado;
        Al["municipio"] = municipio;
        Al["colonia"] = document.getElementById('conolia').value;
        Al["calle"] = calle;
        Al["numero"] = numero;

        const response = await axios.put(`${getdireccion()}/alumnoedit/${alumno.boleta}`, Al);
        setMessage("Registro actualizado correctamente");
        setShowNotification(true);
        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

      } catch (error) {
        console.error(error);
        setMessage("No se pudo actualizar el registro");
        setShowNotification(true);
        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    }
  };


  //Funciones Validaciones
  const letras = (c) => {
    let acentos = ["á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"];
    if (letrasSA(c))
      return true;
    if (acentos.indexOf(c) > -1)
      return true;
    return false;
  }
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
  const preventNumber = (c) => {
    if (c.key === "+" || c.key === "-")
      c.preventDefault();
  }
  const letrasE = (c) => { if (letras(c) || c === " ") return true; return false; };

  //Validaciones
  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length === 0) setNombre(v); }
  const vnombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaApellidoP = (v) => { if (letras(v.charAt(v.length - 1)) || v.length === 0) setApellidoP(v); }
  const vapellidoP = () => { if (apellidoP.length >= 3) document.getElementById("e-apellidoP").classList.add('error-n'); else { document.getElementById("e-apellidoP").classList.remove('error-n'); } }
  const validaApellidoM = (v) => { if (letras(v.charAt(v.length - 1)) || v.length === 0) setApellidoM(v); }
  const vapellidoM = () => { if (apellidoM.length >= 3) document.getElementById("e-apellidoM").classList.add('error-n'); else { document.getElementById("e-apellidoM").classList.remove('error-n'); } }
  const validaCURP = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length === 0) setCurp(v.toUpperCase()); }
  const vCURP = () => {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    if (curp.length === 18 && curp.match(re)) document.getElementById("e-CURP").classList.add('error-n'); else { document.getElementById("e-CURP").classList.remove('error-n'); }
  }
  const validaRFC = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length === 0) setRFC(v.toUpperCase()); }
  const vRFC = () => {
    var re = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
    if (rfc.match(re)) document.getElementById("e-RFC").classList.add('error-n'); else { document.getElementById("e-RFC").classList.remove('error-n'); }
  }
  const validaCP = (v) => {
    if (numeros(v.charAt(v.length - 1)) || v.length === 0) setCP(v);
    if (v.length === 5) {
      let estado = [];
      let col = []
      estado = states.filter(item => item.cp === parseInt(v, 10));
      if (estado.length > 0) {
        setEstado(estado[0].estado);
        setmunicipio(estado[0].municipio);
        document.getElementById("e-CP").classList.add('error-n');
        estado.forEach(element => {
          col.push(element.asentamiento)
        });
        setColonias(col);
      }
      else if (parseInt(v) === alumno.CP) {
        document.getElementById("e-CP").classList.add('error-n');
      }
      else {
        document.getElementById("e-CP").classList.remove('error-n');
      }
    }
  }
  const vCP = () => { if (cp.length < 5) document.getElementById("e-CP").classList.remove('error-n'); else { } }
  const validaCalle = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length === 0 || numeros(v.charAt(v.length - 1))) setCalle(v); }
  const vCalle = () => { if (calle.length >= 3) document.getElementById("e-calle").classList.add('error-n'); else { document.getElementById("e-calle").classList.remove('error-n'); } }
  const validaNumero = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length === 0) && v.length < 5) setNumero(v); }
  const vNumero = () => { if (numero > 0) document.getElementById("e-numero").classList.add('error-n'); else { document.getElementById("e-numero").classList.remove('error-n'); } }
  const validaEdad = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length === 0) && v.length < 3) setEdad(v); }
  const vEdad = () => { if (edad > 150) document.getElementById("e-edad2").classList.remove('error-n'); else if (edad < 18) document.getElementById("e-edad1").classList.remove('error-n'); else { document.getElementById("e-edad1").classList.add('error-n'); document.getElementById("e-edad2").classList.add('error-n'); } }

  return (
    <>
      {showNotification && (
        <div className="notification">
          {message}
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
                <div className='p-txt-nombre'>{alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Boleta</div>
                  <div className='p-text-gray'>{alumno.boleta}</div>
                </div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Email:</div>
                  <div className='p-text-gray'>{alumno.correo}</div>
                </div>
              </div>
              <div className='p-btn-actualizar'>
                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
              </div>
            </div>
            <div className="p-info">
              <div className='p-title-cont'>
                <div>Información del usuario</div>
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
                      <h5 className="f-error error-n" id="e-apellidoM">Campo debe ser mayor de 2 caracteres</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="edad">Edad:</label>
                      <input onChange={(e) => { validaEdad(e.target.value) }} onBlur={() => vEdad()} value={edad} required maxLength={3} minLength={2} type="number" id="edad" className='cimput' />
                      <h5 className="f-error error-n" id="e-edad1">Edad debe ser mayor a 18 años</h5>
                      <h5 className="f-error error-n" id="e-edad2">Edad debe ser menor a 150 años</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="sexo">Sexo:</label>
                      <select className='cimput' id="sexo" name="dpdSexo">
                        {Sexo.map((sexos, key) => (<option key={key} value={sexos}>{sexos}</option>))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="curp">CURP:</label>
                      <input onChange={(e) => { validaCURP(e.target.value) }} onBlur={() => vCURP()} value={curp} minLength={18} required maxLength={18} type="text" id="CURP" className='cimput' />
                      <h5 className="f-error error-n" id="e-CURP">Curp no válido</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="rfc">RFC:</label>
                      <input onChange={(e) => { validaRFC(e.target.value) }} onBlur={() => vRFC()} value={rfc} minLength={9} required maxLength={13} type="text" id="RFC" className='cimput' />
                      <h5 className="f-error error-n" id="e-RFC">RFC no válido</h5>
                    </div>
                  </div>

                  <div className="column">
                    <div className="form-field">
                      <label htmlFor="cp">Código Postal:</label>
                      <input onChange={(e) => { validaCP(e.target.value) }} onBlur={() => vCP()} value={cp} required minLength={5} maxLength={5} type="text" id="CP" className='cimput' />
                      <h5 className="f-error error-n" id="e-CP">Código Postal no encontrado</h5>
                    </div>

                    <div className="form-field">
                      <label htmlFor="estado">Estado:</label>
                      <input disabled required value={estado} maxLength={30} type="text" id="estado" className='cimput' />
                    </div>

                    <div className="form-field">
                      <label htmlFor="municipio">Municipio:</label>
                      <input disabled value={municipio} required maxLength={30} type="text" id="Municipio" className='cimput' />
                    </div>

                    <div className="form-field">
                      <label htmlFor="colonia">Colonia:</label>
                      <select required maxLength={40} className='cimput' type="text" name="txtColonia" id="conolia" placeholder="Colonia">
                        {colonias.map((mun, key) => (<option key={key} value={mun} selected={mun === colonia ? "selected" : ""}>{mun}</option>))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="calle">Calle:</label>
                      <input onChange={(e) => { validaCalle(e.target.value) }} onBlur={() => vCalle()} value={calle} required minLength={3} maxLength={45} type="text" id="Calle" className='cimput' />
                      <h5 className="f-error error-n" id="e-calle">Campo debe ser mayor de 2 caracteres</h5>
                    </div>
                    <div className="form-field">
                      <label htmlFor="numero">Numero:</label>
                      <input onKeyDown={(e) => preventNumber(e)} onChange={(e) => { validaNumero(e.target.value) }} onBlur={() => vNumero()} value={numero} required minLength={1} maxLength={4} type="text" id="Numero" className='cimput' />
                      <h5 className="f-error error-n" id="e-numero">Número no válido</h5>
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

export default Edit;