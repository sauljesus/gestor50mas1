import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import '../styles/ingreso.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { getdireccion } from '../helpers/direccion';
import states from '../helpers/states.json';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
//${getdireccion()}


const StudentForm = ({ visible, show, page }) => {
  const [message, setMessage] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [alumno, setAlumno] = useState([]);
  const [showContra1, setShowContra1] = useState(false);
  const [showContra2, setShowContra2] = useState(false);

  const [cargarUsuario, setcargarUsuario] = useState(true);

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
  }, [])
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${getdireccion()}/alumnocreate/${alumno.boleta}`, alumno);

      setShowNotification(true);
      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const crearAlumno = (e) => {
    e.preventDefault();
    let nerrors = document.getElementsByClassName('error-n');
    if (nerrors.length != 18) {
      setMessage("Hay uno o más campos erroneos");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    else {
      const user = {
        'nombre': `${e.target.elements.txtNombre.value}`,
        'apellidoPaterno': `${e.target.elements.txtApellidoPaterno.value}`,
        'apellidoMaterno': `${e.target.elements.txtApellidoMaterno.value}`,
        'curp': `${e.target.elements.txtCurp.value}`,
        'rfc': `${e.target.elements.txtrfc.value}`,
        'estadoCivil': `${e.target.elements.dpdEstadoCivil.value}`,
        'calle': `${e.target.elements.txtCalle.value}`,
        'numero': `${e.target.elements.txtNum.value}`,
        'colonia': `${e.target.elements.txtColonia.value}`,
        'municipio': `${e.target.elements.txtMunicipio.value}`,
        'estado': `${e.target.elements.txtEstado.value}`,
        'CP': `${e.target.elements.txtCp.value}`,
        'telefono': `${e.target.elements.txtTelefono.value}`,
        'celular': `${e.target.elements.txtCelular.value}`,
        'correo': `${e.target.elements.txtCorreo.value}`,
        'password': `${e.target.elements.txtPass.value}`,
        'confpassword': `${e.target.elements.txtConfpass.value}`,
        'edad': `${e.target.elements.txtEdad.value}`,
        'nivelAcademico': `${e.target.elements.txtNivelAcademico.value}`,
        'sexo': `${e.target.elements.dpdSexo.value}`,
        'hijos': `${e.target.elements.dpdHijos.value}`,
        'nivelAHijos': `${e.target.elements.txtNivelAHijos.value}`,
        'trabaja': `${e.target.elements.dpdTrabaja.value}`,
        'empresa': `${e.target.elements.txtEmpresa.value}`,
        'direccionEmpresa': `${e.target.elements.txtdireccionEmpresa.value}`,
        'registroMedico': `${e.target.elements.txtregistroMedico.value}`,
        'status': 'Activo'
      };

      axios.post(`${getdireccion()}/alumno`, user).then((res) => {
        setMessage(res.data.msg);
        setShowNotification(true);
        document.getElementById("crear-alumno").reset();
        reset();
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
        //alert();
      }).catch((err) => {
        console.log(err);
        var mensaje = err.response.data.msg;
        console.log(mensaje);
        setMessage(mensaje);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      })
    }
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

  const [estadotype, setestadotype] = useState(['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Union_Libre']);
  const [niveltype, setestadoniveltype] = useState(['Ninguno', 'Primaria', 'Secundaria', 'Bachillerato', 'Preparatoria', 'Licenciatura', 'Ingeniería', 'Doctorado', 'Maestría', 'Otro']);
  const [nivelAtype, setestadonivelAtype] = useState([]);
  const Estado = estadotype.map((Estado) => Estado);
  const estadoCivilChange = (e) => {
    console.log(estadotype[e.target.value]);
  };
  const [sextype, setsextype] = useState(['Masculino', 'Femenino']);
  const Sexo = sextype.map((Sexo) => Sexo);
  const sexChange = (e) => {
    console.log(sextype[e.target.value]);
  };
  const [sontype, setsontype] = useState(['Si', 'No']);
  const Hijo = sontype.map((Hijo) => Hijo);
  const hijosChange = (e) => {
    console.log(sontype[e.target.value]);
  };
  const [worktype, setworktype] = useState(['Si', 'No']);
  const Trabajo = worktype.map((Trabajo) => Trabajo);
  const workChange = (e) => {
    console.log(worktype[e.target.value]);
  };

  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [curp, setCurp] = useState("");
  const [rfc, setRFC] = useState("");
  const [cp, setCP] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setmunicipio] = useState("");
  const [colonia, setcolonia] = useState([]);
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setcelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [direccionEmpresa, setDireccionEmpresa] = useState("");
  const [registroMedico, setRegistroMedico] = useState("");

  const reset = () => {
    setNombre("");
    setApellidoP("");
    setApellidoM("");
    setCurp("");
    setRFC("");
    setCP("");
    setEstado("");
    setmunicipio("");
    setcolonia([]);
    setCalle("");
    setNumero("");
    setEdad("");
    setTelefono("");
    setcelular("");
    setCorreo("");
    setContraseña("");
    setContraseña2("");
    setEmpresa("");
    setDireccionEmpresa("");
    setRegistroMedico("");
    setShowContra1(false);
    setShowContra2(false);
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
  const preventNumber = (c) => {
    if (c.key == "+" || c.key == "-")
      c.preventDefault();
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
  const letrasE = (c) => { if (letras(c) || c == " ") return true; return false; };
  const validaNombre = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length == 0) setNombre(v); }
  const vnombre = () => { if (nombre.length >= 3) document.getElementById("e-nombre").classList.add('error-n'); else { document.getElementById("e-nombre").classList.remove('error-n'); } }
  const validaApellidoP = (v) => { if (letras(v.charAt(v.length - 1)) || v.length == 0) setApellidoP(v); }
  const vapellidoP = () => { if (apellidoP.length >= 3) document.getElementById("e-apellidoP").classList.add('error-n'); else { document.getElementById("e-apellidoP").classList.remove('error-n'); } }
  const validaApellidoM = (v) => { if (letras(v.charAt(v.length - 1)) || v.length == 0) setApellidoM(v); }
  const vapellidoM = () => { if (apellidoM.length >= 3) document.getElementById("e-apellidoM").classList.add('error-n'); else { document.getElementById("e-apellidoM").classList.remove('error-n'); } }
  const validaCURP = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length == 0) setCurp(v.toUpperCase()); }
  const vCURP = () => {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    if (curp.length == 18 && curp.match(re)) document.getElementById("e-CURP").classList.add('error-n'); else { document.getElementById("e-CURP").classList.remove('error-n'); }
  }
  const validaRFC = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length == 0) setRFC(v.toUpperCase()); }
  const vRFC = () => {
    var re = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
    if (rfc.match(re)) document.getElementById("e-RFC").classList.add('error-n'); else { document.getElementById("e-RFC").classList.remove('error-n'); }
  }
  const validaCP = (v) => {
    if (numeros(v.charAt(v.length - 1)) || v.length == 0) setCP(v);
    if (v.length == 5) {
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
        setcolonia(col);
      }
      else {
        document.getElementById("e-CP").classList.remove('error-n');
      }
    }
  }
  const vCP = () => { if (cp.length < 5) document.getElementById("e-CP").classList.remove('error-n'); else { } }
  const validaCalle = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length == 0 || numeros(v.charAt(v.length - 1))) setCalle(v); }
  const vCalle = () => { if (calle.length >= 3) document.getElementById("e-calle").classList.add('error-n'); else { document.getElementById("e-calle").classList.remove('error-n'); } }
  const validaNumero = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length == 0) && v.length < 5) setNumero(v); }
  const vNumero = () => { if (numero > 0) document.getElementById("e-numero").classList.add('error-n'); else { document.getElementById("e-numero").classList.remove('error-n'); } }
  const validaEdad = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length == 0) && v.length < 3) setEdad(v); }
  const vEdad = () => { if (edad > 150) document.getElementById("e-edad2").classList.remove('error-n'); else if (edad < 18) document.getElementById("e-edad1").classList.remove('error-n'); else { document.getElementById("e-edad1").classList.add('error-n'); document.getElementById("e-edad2").classList.add('error-n'); } }
  const validaTelefono = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length == 0) && v.length < 14) setTelefono(v); }
  const vTelefono = () => { if (telefono > 0) document.getElementById("e-telefono").classList.add('error-n'); else { document.getElementById("e-telefono").classList.remove('error-n'); } }
  const validaCelular = (v) => { if ((numeros(v.charAt(v.length - 1)) || v.length == 0) && v.length < 14) setcelular(v); }
  const vCelular = () => { if (celular > 0) document.getElementById("e-celular").classList.add('error-n'); else { document.getElementById("e-celular").classList.remove('error-n'); } }
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
  const validaEmpresa = (v) => { setEmpresa(v); }
  const vEmpresa = () => { if (empresa.length >= 3) document.getElementById("e-empresa").classList.add('error-n'); else { document.getElementById("e-empresa").classList.remove('error-n'); } }
  const validaDirEmpresa = (v) => { if (letrasE(v.charAt(v.length - 1)) || v.length == 0 || numeros(v.charAt(v.length - 1))) setDireccionEmpresa(v); }
  const vDireEmpresa = () => { if (direccionEmpresa.length >= 3) document.getElementById("e-Dempresa").classList.add('error-n'); else { document.getElementById("e-Dempresa").classList.remove('error-n'); } }
  const validaRegistro = (v) => { if (letrasSAYN(v.charAt(v.length - 1)) || v.length == 0) setRegistroMedico(v); }
  const vRegistro = () => { if (registroMedico.length >= 3) document.getElementById("e-registro").classList.add('error-n'); else { document.getElementById("e-registro").classList.remove('error-n'); } }

  const nivelAonchange = () => {
    let val = document.getElementById("selector-hijos").value;
    if (val === "Si") {
      setestadonivelAtype(['Ninguno','Preescolar', 'Primaria', 'Secundaria', 'Bachillerato', 'Preparatoria', 'Licenciatura', 'Ingeniería', 'Doctorado', 'Maestría', 'Otro'])
    } else if (val === "No") {
      setestadonivelAtype(['N/A']);
    } else {
      setestadonivelAtype([]);
    }
  }

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
          <Header page={page} page2={"Registro de alumnos"} />
          <div className="s-content">
            <div className='ing-grid'>
              <div className="ing-content-form">
                <div className='s-box-head'>
                  <div className='s-text-head'>Registar alumno</div>
                </div>
                <div className='f-block'>
                  <form id="crear-alumno" className='f-cont-form-reg' onSubmit={crearAlumno} >
                    <h1 className='f-log-semititu'>Nombre</h1>
                    <input id="r-nombre" required onChange={(e) => { validaNombre(e.target.value) }} onBlur={() => vnombre()} value={nombre} maxLength={45} minLength={3} className='f-log-input-r' type="text" name="txtNombre" placeholder="Nombre" />
                    <h5 className="f-error error-n" id="e-nombre">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Apellido Paterno</h1>
                    <input id="r-apellidoP" required onChange={(e) => { validaApellidoP(e.target.value) }} onBlur={() => vapellidoP()} value={apellidoP} maxLength={30} minLength={3} className='f-log-input-r' type="text" name="txtApellidoPaterno" placeholder="Apellido Paterno" />
                    <h5 className="f-error error-n" id="e-apellidoP">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Apellido Materno</h1>
                    <input onChange={(e) => { validaApellidoM(e.target.value) }} onBlur={() => vapellidoM()} value={apellidoM} required minLength={3} maxLength={30} className='f-log-input-r' type="text" name="txtApellidoMaterno" placeholder="Apellido Materno" />
                    <h5 className="f-error error-n" id="e-apellidoM">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Sexo</h1>
                    <select className='f-log-input-r' name="dpdSexo" onChange={sexChange} >
                      {Sexo.map((sexos, key) => (<option key={key} value={sexos}>{sexos}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Edad</h1>
                    <input onChange={(e) => { validaEdad(e.target.value) }} onBlur={() => vEdad()} value={edad} required maxLength={3} minLength={2} className='f-log-input-r' type="number" name="txtEdad" placeholder="Edad" />
                    <h5 className="f-error error-n" id="e-edad1">Edad debe ser mayor a 18 años</h5>
                    <h5 className="f-error error-n" id="e-edad2">Edad debe ser menor a 150 años</h5>

                    <h1 className='f-log-semititu' >CURP</h1>
                    <input onChange={(e) => { validaCURP(e.target.value) }} onBlur={() => vCURP()} value={curp} minLength={18} required maxLength={18} className='f-log-input-r' type="text" name="txtCurp" placeholder="CURP" />
                    <h5 className="f-error error-n" id="e-CURP">Curp no válido</h5>

                    <h1 className='f-log-semititu'>RFC</h1>
                    <input onChange={(e) => { validaRFC(e.target.value) }} onBlur={() => vRFC()} value={rfc} minLength={9} required maxLength={13} className='f-log-input-r' type="text" name="txtrfc" placeholder="RFC" />
                    <h5 className="f-error error-n" id="e-RFC">RFC no válido</h5>

                    <h1 className='f-log-semititu'>Estado Civil</h1>
                    <select className='f-log-input-r' name="dpdEstadoCivil" onChange={estadoCivilChange} >
                      {Estado.map((estCiv, key) => (<option key={key} value={estCiv}>{estCiv}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Código Postal</h1>
                    <input onChange={(e) => { validaCP(e.target.value) }} onBlur={() => vCP()} value={cp} required minLength={5} maxLength={5} className='f-log-input-r' type="text" name="txtCp" placeholder="Código Postal" />
                    <h5 className="f-error error-n" id="e-CP">Código Postal no encontrado</h5>

                    <h1 className='f-log-semititu'>Municipio</h1>
                    <input disabled value={municipio} required maxLength={30} className='f-log-input-r' type="text" name="txtMunicipio" placeholder="Municipio" />

                    <h1 className='f-log-semititu'>Estado</h1>
                    <input disabled required value={estado} maxLength={30} className='f-log-input-r' type="text" name="txtEstado" placeholder="Estado" />

                    <h1 className='f-log-semititu'>Colonia</h1>
                    <select required maxLength={40} className='f-log-input-r' type="text" name="txtColonia" placeholder="Colonia">
                      {colonia.map((mun, key) => (<option key={key} value={mun}>{mun}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Calle</h1>
                    <input onChange={(e) => { validaCalle(e.target.value) }} onBlur={() => vCalle()} value={calle} required minLength={3} maxLength={45} className='f-log-input-r' type="text" name="txtCalle" placeholder="Calle" />
                    <h5 className="f-error error-n" id="e-calle">Campo debe ser mayor de 2 caracteres</h5>

                    <h1 className='f-log-semititu'>Número</h1>
                    <input onKeyDown={(e) => preventNumber(e)} onChange={(e) => { validaNumero(e.target.value) }} onBlur={() => vNumero()} value={numero} required minLength={1} maxLength={4} className='f-log-input-r' type="number" name="txtNum" placeholder="Número" />
                    <h5 className="f-error error-n" id="e-numero">Número no válido</h5>

                    <h1 className='f-log-semititu'>Teléfono</h1>
                    <input onChange={(e) => { validaTelefono(e.target.value) }} onBlur={() => vTelefono()} value={telefono} required minLength={8} maxLength={13} className='f-log-input-r' type="number" name="txtTelefono" placeholder="Teléfono" />
                    <h5 className="f-error error-n" id="e-telefono">Número no válido</h5>

                    <h1 className='f-log-semititu'>Celular</h1>
                    <input onChange={(e) => { validaCelular(e.target.value) }} onBlur={() => vCelular()} value={celular} required minLength={8} maxLength={13} className='f-log-input-r' type="number" name="txtCelular" placeholder="Celular" />
                    <h5 className="f-error error-n" id="e-celular">Número no válido</h5>

                    <h1 className='f-log-semititu'>Correo</h1>
                    <input onChange={(e) => { validaCorreo(e.target.value) }} onBlur={() => vCorreo()} value={correo} required minLength={5} maxLength={50} className='f-log-input-r' type="email" name="txtCorreo" placeholder="Correo" />
                    <h5 className="f-error error-n" id="e-correo">Correo no válido</h5>

                    <h1 className='f-log-semititu'>Contraseña</h1>
                    <div className='input-contraseña'>
                      <input onChange={(e) => { validaContraseña(e.target.value) }} onBlur={() => vContraseña()} value={contraseña} minLength={8} maxLength={50} required className='f-log-input-r' type="password" id="passWRD" name="txtPass" placeholder="Contraseña" />
                      <div className='Button-contraseña' onClick={() => verContra()}>{showContra1 ? <RxEyeOpen /> : <RxEyeClosed />}</div>
                    </div>
                    <h5 className="f-error error-n" id="e-contraseña">Contraseña debe ser mayor a 7 caracteres, contener al menos 1 número y 1 caracter especial: ~ @ # _ ^ % / . : ; = </h5>

                    <h1 className='f-log-semititu'>Confirmar Contraseña</h1>
                    <div className='input-contraseña'>
                      <input onChange={(e) => { validaContraseña2(e.target.value) }} onBlur={() => vContraseña2()} value={contraseña2} minLength={8} maxLength={50} required className='f-log-input-r' id="passWRD2" type="password" name="txtConfpass" placeholder="Contraseña" />
                      <div className='Button-contraseña' onClick={() => verContra2()}>{showContra2 ? <RxEyeOpen /> : <RxEyeClosed />}</div>
                    </div>
                    <h5 className="f-error error-n" id="e-contraseña2">Contraseñas no coinciden</h5>

                    <h1 className='f-log-semititu'>Nivel Académico</h1>
                    <select required maxLength={30} className='f-log-input-r' type="text" name="txtNivelAcademico" placeholder="Nivel Académico">
                      {niveltype.map((niveles, key) => (<option key={key} value={niveles}>{niveles}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Hijos</h1>
                    <select className='f-log-input-r' name="dpdHijos" id="selector-hijos" onChange={() => nivelAonchange()} >
                      <option value={""}></option>
                      {Hijo.map((hi, key) => (<option key={key} value={hi}>{hi}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Nivel Académico Hijos</h1>
                    <select required maxLength={30} className='f-log-input-r' name="txtNivelAHijos" placeholder="Nivel Académico Hijos">
                      {nivelAtype.map((niveles, key) => (<option key={key} value={niveles}>{niveles}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Trabaja</h1>
                    <select className='f-log-input-r' name="dpdTrabaja" onChange={workChange} >
                      {Trabajo.map((tr, key) => (<option key={key} value={tr}>{tr}</option>))}
                    </select>

                    <h1 className='f-log-semititu'>Empresa</h1>
                    <input onChange={(e) => { validaEmpresa(e.target.value) }} onBlur={() => vEmpresa()} value={empresa} required minLength={3} maxLength={50} className='f-log-input-r' type="text" name="txtEmpresa" placeholder="Empresa" />
                    <h5 className="f-error error-n" id="e-empresa">Campo debe tener al menos 3 caracteres</h5>

                    <h1 className='f-log-semititu'>Dirección Empresa</h1>
                    <input onChange={(e) => { validaDirEmpresa(e.target.value) }} onBlur={() => vDireEmpresa()} value={direccionEmpresa} required minLength={3} maxLength={50} className='f-log-input-r' type="text" name="txtdireccionEmpresa" placeholder="Dirección Empresa" />
                    <h5 className="f-error error-n" id="e-Dempresa">Campo debe tener al menos 3 caracteres</h5>

                    <h1 className='f-log-semititu'>Registro Medico</h1>
                    <input onChange={(e) => { validaRegistro(e.target.value) }} onBlur={() => vRegistro()} value={registroMedico} required minLength={3} maxLength={50} className='f-log-input-r' type="text" name="txtregistroMedico" placeholder="Registro Medico" />
                    <h5 className="f-error error-n" id="e-registro">Campo debe tener al menos 3 caracteres</h5>

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

export default StudentForm;








