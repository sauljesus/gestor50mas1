import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../styles/ingreso.css';


const IngresoManual = ({ page }) => {
    // const [showTaller, setShowTaller] = useState(false);
    const [message, setMessage] = useState("");
    const [showAlumno, setShowAlumno] = useState(true);
    const [showTaller, setShowTaller] = useState(false);
    const [showProfesor, setShowProfesor] = useState(false);
    const [textPage, setTextPage] = useState("Registro de alumno");
    const [year, setYear] = useState(new Date().getFullYear());
    const [alumno, setAlumno] = useState([]);
    const [profesor, setProfesor] = useState([]);
    const [taller, setFormValues_taller] = useState({
        codigo_taller: '',
        nombre: '',
        descripcion: '',
        periodo: year+'-'+(year+1)
      });

    const { boleta } = useParams();
    const [showNotification, setShowNotification] = useState(false);

    const setShow = (type) => {
        if (type == "alumno"){
            setShowAlumno(true);
            setShowProfesor(false);
            setShowTaller(false);
        }
        if (type == "profesor"){
            setShowAlumno(false);
            setShowProfesor(true);
            setShowTaller(false);
        }
        if (type == "taller"){
            setShowAlumno(false);
            setShowProfesor(false);
            setShowTaller(true);
        }
    }

       
    const handleChange_taller = (e) => {
        setFormValues_taller({
              ...taller,
              [e.target.name]: e.target.value
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put('http://localhost:5000/alumnocreate/'+alumno.boleta, alumno);
        
          setShowNotification(true);
          // Ocultar la notificación después de 3 segundos
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);

        } catch (error) {
          console.error(error);
        }
    };

    const handleSubmit_profesor = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put('http://localhost:5000/profesorcreate/'+profesor.id_profesor, profesor);
        
          setShowNotification(true);
          // Ocultar la notificación después de 3 segundos
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);

        } catch (error) {
          console.error(error);
        }
    };

    const handleSubmit_taller = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put('http://localhost:5000/tallercreate', taller);
          setShowNotification(true);
          // Ocultar la notificación después de 3 segundos
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);

        } catch (error) {
          console.error(error);
        }
    };

    /***********************************************
    ****Funciones para form alumno  inicio *********  
    ***********************************************/
    const crearUsuario= (e) =>{
        e.preventDefault();
        const user = {
            'nombre': `${e.target.elements.txtNombre.value}` ,
            'apellidoPaterno': `${e.target.elements.txtApellidoPaterno.value}` ,
            'apellidoMaterno': `${e.target.elements.txtApellidoMaterno.value}`,
            'curp':`${e.target.elements.txtCurp.value}`,
            'rfc':`${e.target.elements.txtrfc.value}`,
            'estadoCivil':`${e.target.elements.dpdEstadoCivil.value}`,
            'calle':`${e.target.elements.txtCalle.value}`,
            'numero':`${e.target.elements.txtNum.value}`,
            'colonia':`${e.target.elements.txtColonia.value}`,
            'municipio':`${e.target.elements.txtMunicipio.value}`,
            'estado':`${e.target.elements.txtEstado.value}`,
            'CP':`${e.target.elements.txtCp.value}`,
            'telefono':`${e.target.elements.txtTelefono.value}`,
            'celular':`${e.target.elements.txtCelular.value}`,
            'correo':`${e.target.elements.txtCorreo.value}`,
            'password': `${e.target.elements.txtPass.value}`,
            'confpassword': `${e.target.elements.txtConfpass.value}`,
            'edad':`${e.target.elements.txtEdad.value}`,
            'nivelAcademico':`${e.target.elements.txtNivelAcademico.value}`,
            'sexo':`${e.target.elements.dpdSexo.value}`,
            'hijos':`${e.target.elements.dpdHijos.value}`,
            'nivelAHijos':`${e.target.elements.txtNivelAHijos.value}`,
            'trabaja':`${e.target.elements.dpdTrabaja.value}`,
            'empresa':`${e.target.elements.txtEmpresa.value}`,
            'direccionEmpresa':`${e.target.elements.txtdireccionEmpresa.value}`,
            'registroMedico':`${e.target.elements.txtregistroMedico.value}`,
            'status':'Activo'
        };
        console.log(user);
        //server
        //axios.post(`http://20.55.91.62:5000/users`,user).then((res)=>{
          //local
        axios.post(`http://localhost:5000/alumno`,user).then((res)=>{
          //console.log(res);
          console.log(res.data.errors[0].msg);
          setMessage(res.data.msg);
          setShowNotification(true);
          setTimeout(() => {
              setShowNotification(false);
            }, 5000);
          alert();
          window.location.replace('/');
        }).catch((err)=>{
            var mensaje = ""
            for (var i = 0;i<err.response.data.errors.length;i++){
                console.log(err.response.data.errors[i].msg);
                mensaje += `${err.response.data.errors[i].msg}`;
            }
            console.log(mensaje);
            setMessage(mensaje);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
              }, 5000);
            //window.location.replace(`/`);
        })
    }
    const [estadotype,setestadotype] = useState(['Soltero', 'Casado','Divorciado','Viudo','Union_Libre']);
    const Estado = estadotype.map((Estado) => Estado);
    const estadoCivilChange = (e) => {
        console.log(estadotype[e.target.value]);
    };
    const [sextype,setsextype] = useState(['Masculino', 'Femenino']);
    const Sexo = sextype.map((Sexo) => Sexo);
    const sexChange = (e) => {
        console.log(sextype[e.target.value]);
    };
    const [sontype,setsontype] = useState(['Si', 'No']);
    const Hijo = sontype.map((Hijo) => Hijo);
    const hijosChange = (e) => {
        console.log(sontype[e.target.value]);
    };
    const [worktype,setworktype] = useState(['Si', 'No']);
    const Trabajo = worktype.map((Trabajo) => Trabajo);
    const workChange = (e) => {
        console.log(worktype[e.target.value]);
    };
    /***********************************************
    ****Funciones para form alumno  fin    *********  
    ***********************************************/


    return (
        <> 
        {showNotification && (
            <div className="notification">
              Registro realizado correctamente
            </div>
          )}
            <Navbar page={page} />
            <div className='s-body_index'>
                <div className="main-container">
                    <Header page={page} page2={textPage} />
                    <div className="s-content">
                        <div className='ing-grid'>
                            <DropdownButton id="dropdown-basic-button" title='Seleccionar el tipo de registro' className='ing-drop'>
                                <Dropdown.Item onClick={() => { setShow("alumno"); setTextPage("Registro de alumno") }}>Alumno</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShow("taller"); setTextPage("Registro de taller") }}>Taller</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShow("profesor"); setTextPage("Registro de profesor") }}>Profesor</Dropdown.Item>
                            </DropdownButton>

                            <div className={showAlumno ? "ing-content-form" : "ing-display-n"}>
                                <div className='s-box-head'>
                                    <div className='s-text-head'>Registar alumno</div>
                                </div>
                                <div className='f-block'>
                                  <form className='f-cont-form-reg' onSubmit={crearUsuario} >
                                      <h1 className='f-log-semititu'>Nombre</h1>
                                      <input className='f-log-input' type="text" name="txtNombre" placeholder="Nombre"/>
                                      <h1 className='f-log-semititu'>Apellido Paterno</h1>
                                      <input className='f-log-input' type="text" name="txtApellidoPaterno" placeholder="Apellido Paterno"/>
                                      <h1 className='f-log-semititu'>Apellido Materno</h1>
                                      <input className='f-log-input' type="text" name="txtApellidoMaterno" placeholder="Apellido Materno"/>
                                      <h1 className='f-log-semititu'>CURP</h1>
                                      <input className='f-log-input' type="text" name="txtCurp" placeholder="CURP"/>
                                      <h1 className='f-log-semititu'>RFC</h1>
                                      <input className='f-log-input' type="text" name="txtrfc" placeholder="RFC"/>
                                      <h1 className='f-log-semititu'>Estado Civil</h1>
                                      <select className='f-log-input' name="dpdEstadoCivil" onChange={estadoCivilChange} >
                                          {Estado.map((estCiv, key) => (<option key={key} value={estCiv}>{estCiv}</option>))}
                                      </select>
                                      <h1 className='f-log-semititu'>Calle</h1>
                                      <input className='f-log-input' type="text" name="txtCalle" placeholder="Calle"/>
                                      <h1 className='f-log-semititu'>Número</h1>
                                      <input className='f-log-input' type="text" name="txtNum" placeholder="Número"/>
                                      <h1 className='f-log-semititu'>Colonia</h1>
                                      <input className='f-log-input' type="text" name="txtColonia" placeholder="Colonia"/>
                                      <h1 className='f-log-semititu'>Municipio</h1>
                                      <input className='f-log-input' type="text" name="txtMunicipio" placeholder="Municipio"/>
                                      <h1 className='f-log-semititu'>Estado</h1>
                                      <input className='f-log-input' type="text" name="txtEstado" placeholder="Estado"/>
                                      <h1 className='f-log-semititu'>Código Postal</h1>
                                      <input className='f-log-input' type="text" name="txtCp" placeholder="Código Postal"/>
                                      <h1 className='f-log-semititu'>Teléfono</h1>
                                      <input className='f-log-input' type="text" name="txtTelefono" placeholder="Teléfono"/>
                                      <h1 className='f-log-semititu'>Celular</h1>
                                      <input className='f-log-input' type="text" name="txtCelular" placeholder="Celular"/>
                                      <h1 className='f-log-semititu'>Correo</h1>
                                      <input className='f-log-input' type="text" name="txtCorreo" placeholder="Correo"/>
                                      <h1 className='f-log-semititu'>Contraseña</h1>
                                      <input className='f-log-input' type="password" name="txtPass" placeholder="Contraseña"/>
                                      <h1 className='f-log-semititu'>Confirmar Contraseña</h1>
                                      <input className='f-log-input' type="password" name="txtConfpass" placeholder="Contraseña"/>
                                      <h1 className='f-log-semititu'>Edad</h1>
                                      <input className='f-log-input' type="text" name="txtEdad" placeholder="Edad"/>
                                      <h1 className='f-log-semititu'>Nivel Académico</h1>
                                      <input className='f-log-input' type="text" name="txtNivelAcademico" placeholder="Nivel Académico"/>
                                      <h1 className='f-log-semititu'>Sexo</h1>
                                      <select className='f-log-input' name="dpdSexo" onChange={sexChange} >
                                          {Sexo.map((sexos, key) => (<option key={key} value={sexos}>{sexos}</option>))}
                                      </select>
                                      <h1 className='f-log-semititu'>Hijos</h1>
                                      <select className='f-log-input' name="dpdHijos" onChange={hijosChange} >
                                          {Hijo.map((hi, key) => (<option key={key} value={hi}>{hi}</option>))}
                                      </select>
                                      <h1 className='f-log-semititu'>Nivel Académico Hijos</h1>
                                      <input className='f-log-input' type="text" name="txtNivelAHijos" placeholder="Nivel Académico Hijos"/>
                                      <h1 className='f-log-semititu'>Trabaja</h1>
                                      <select className='f-log-input' name="dpdTrabaja" onChange={workChange} >
                                          {Trabajo.map((tr, key) => (<option key={key} value={tr}>{tr}</option>))}
                                      </select>
                                      <h1 className='f-log-semititu'>Empresa</h1>
                                      <input className='f-log-input' type="text" name="txtEmpresa" placeholder="Empresa"/>
                                      <h1 className='f-log-semititu'>Dirección Empresa</h1>
                                      <input className='f-log-input' type="text" name="txtdireccionEmpresa" placeholder="Dirección Empresa"/>
                                      <h1 className='f-log-semititu'>Registro Medico</h1>
                                      <input className='f-log-input' type="text" name="txtregistroMedico" placeholder="Registro Medico"/>
                                      <button className='f-log-boton-formi'>Registrar</button>
                                  </form>
                                </div>
                            </div>
                            <div className={showTaller ? "ing-content-form" : "ing-display-n"}>
                                <div className='s-box-head'>
                                    <div className='s-text-head'>Registrar taller</div>
                                </div>
                                <div className='f-block'>
                                    <form className='f-cont-form-reg' onSubmit={handleSubmit_taller} >
                                        <h1 className='f-log-semititu'>Codigo taller</h1>
                                        <input className='f-log-input' value={taller.codigo_taller} type="text" name="codigo_taller" onChange={handleChange_taller} />
                                        <h1 className='f-log-semititu'>Nombre</h1>
                                        <input className='f-log-input' value={taller.nombre} type="text" name="nombre"  onChange={handleChange_taller} />
                                        <h1 className='f-log-semititu'>Descripcion</h1>
                                        <input className='f-log-input'value={taller.descripcion} type="text" name="descripcion"  onChange={handleChange_taller}/>
                                        <button className='f-log-boton-formi'>Registrar</button>
                                    </form>
                                </div>
                            </div>
                            <div className={showProfesor ? "ing-content-form" : "ing-display-n"}>
                                <div className='s-box-head'>
                                    <div className='s-text-head'>Registar profesor</div>
                                </div>
                                <div className='f-block'>
                                    <form className='f-cont-form-reg' >
                                        <h1 className='f-log-semititu'>Nombre(s)</h1>
                                        <input className='f-log-input' type="text" name="nombre" placeholder="" />
                                        <h1 className='f-log-semititu'>Apellido Paterno</h1>
                                        <input className='f-log-input' type="text" name="txtEmail" placeholder="" />
                                        <h1 className='f-log-semititu'>Apellido Materno</h1>
                                        <input className='f-log-input' type="text" name="txtEmail" placeholder="" />
                                        <h1 className='f-log-semititu'>Email</h1>
                                        <input className='f-log-input' type="text" name="txtEmail" placeholder="" />

                                        <button className='f-log-boton-formi'>Registrar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IngresoManual;