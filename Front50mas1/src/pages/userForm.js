import React, { useState } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import axios from 'axios';

const UserForm = ({ page}) => {
    const crearUsuario= (e) =>{
        e.preventDefault();
        const user = {
            'nombre': `${e.target.elements.txtNombre.value}` ,
            'apellidoPaterno': `${e.target.elements.txtApellidoPaterno.value}` , 
            'apellidoMaterno': `${e.target.elements.txtApellidoMaterno.value}`,
            'correo':`${e.target.elements.txtCorreo.value}`,
            'password': `${e.target.elements.txtPass.value}`,
            'confpassword': `${e.target.elements.txtConfpass.value}`,
            'tipoUsuario':`${e.target.elements.dpdTipoUsuario.value}`,
            'status':'Activo'
        };  
        console.log(user); 
        //server 
        //axios.post(`http://20.55.91.62:5000/users`,user).then((res)=>{
          //local
        axios.post(`http://localhost:5000/users`,user).then((res)=>{
          //console.log(res);
          alert(res.data.msg);
          window.location.replace('/login');
        })
      }

    const [usuariotype,setusuariotype] = useState(['Profesor', 'Administrativo']);
    const Usuario = usuariotype.map((Usuario) => Usuario);
    const usuarioChange = (e) => {
        console.log(usuariotype[e.target.value]);
    };
    return( 
        <>
            <Navbar page={page} /> 
            <div className='s-body_index'>
                <div className="main-container">
                <Header page={page} page2={page}/> 
                    <div className="s-content">
                        <div className='s-box-head'>
                            <div className='s-text-head'>Registro de Usuarios</div>
                        </div>
                        <div className='f-block'>
                            <form className='f-cont-form-reg' onSubmit={crearUsuario} >
                                <h1 className='f-log-semititu'>Nombre</h1>  
                                <input className='f-log-input' type="text" name="txtNombre" placeholder="Nombre"/>
                                <h1 className='f-log-semititu'>Apellido Paterno</h1>  
                                <input className='f-log-input' type="text" name="txtApellidoPaterno" placeholder="Apellido Paterno"/>
                                <h1 className='f-log-semititu'>Apellido Materno</h1>  
                                <input className='f-log-input' type="text" name="txtApellidoMaterno" placeholder="Apellido Materno"/>
                                <h1 className='f-log-semititu'>Tipo de Usaurio</h1>  
                                <select className='f-log-input' name="dpdTIpoUsuario" onChange={usuarioChange} >
                                    {Usuario.map((user, key) => (<option key={key} value={user}>{user}</option>))}
                                </select> 
                                <h1 className='f-log-semititu'>Correo</h1>  
                                <input className='f-log-input' type="text" name="txtCorreo" placeholder="Correo"/>
                                <h1 className='f-log-semititu'>Contraseña</h1>  
                                <input className='f-log-input' type="password" name="txtPass" placeholder="Contraseña"/>
                                <h1 className='f-log-semititu'>Confirmar Contraseña</h1>  
                                <input className='f-log-input' type="password" name="txtConfpass" placeholder="Confirmar Contraseña"/>
                                <button className='f-log-boton-formi'>Registrar</button>                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
    };

export default UserForm;









