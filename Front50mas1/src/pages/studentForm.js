import React, { useState } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import axios from 'axios';
import '../styles/notif.css';

const StudentForm = ({visible, show, page}) => {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
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
    return(
        <>
            {showNotification && (
                <div className="notification">
                {message}
                </div>
            )}
            <Navbar visible={visible} show={show} page={page} />
            <div className='s-body_index'>
            <div className="main-container">
                <Header page={page} page2={page}/>
                <div className="s-content">
                    <div className='s-box-head'>
                        <div className='s-text-head'>Registro de alumnos</div>
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
            </div>
            </div>
        </>
    );

    };

export default StudentForm;








