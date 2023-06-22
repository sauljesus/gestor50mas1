import React, { useState,useEffect } from 'react';
import '../styles/login.css';
import IMG from "../images/logo-no-background.png";
import Axios  from 'axios';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}


const Login = () => {
    const [cargarUsuario,setcargarUsuario] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(()=>{
        async function cargarUsuario(){
            console.log("token "+ localStorage.getItem('jwt'));
            if(!(localStorage.getItem('jwt'))){
                setcargarUsuario(false);
                return;
            }
            try {
                const  {data}  = await Axios.get(`${getdireccion()}/checkJwtUser`,{headers:{'Authorization':localStorage.getItem('jwt')}});
                console.log(data);
                setMessage("login existente redirigiendo");
                setShowNotification(true);
                setTimeout(() => {
                    if(data.tipoUsuario == 'Profesor')
                        window.location.replace(`/mis-grupos`);
                    else
                        window.location.replace('/estadisticas')    
                  }, 3000);
            }catch(err){
                console.log(err);

            }
        }
        cargarUsuario();
    },[]);

    const selUsuario= async (e) =>{
        e.preventDefault();
        const user = {"correo":`${e.target.elements.txtEmail.value}`,"password":`${e.target.elements.txtPass.value}`};  
        console.log(user.correo); 
        Axios.post(`${getdireccion()}/loginUser`,user).then((res)=>{
            const ms = "Login Exitoso";
            setMessage(ms);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
              }, 5000);
             //console.log(res.data.info);
             //console.log(res.data.jwt); 
             localStorage.setItem('jwt',res.data.jwt)
             //console.log(res.data.info);
             //console.log(res.data.jwt);
             if(res.data.info.tipoUsuario=='Profesor')
                        window.location.replace(`/mis-grupos`);
                    else
                        window.location.replace('/estadisticas')  
            //window.location.replace(`/estadisticas`);
        }).catch((err)=>{
            setMessage(err.response.data.msg);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
              }, 5000);
            window.location.replace(`/login`);
        })
    }

    return (
        <>
        {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
        <div className='log-fullscreen' >
            <div className='log-container'>
                <div className='log-loginfo'>
                    <div className='log-header'>
                        <img className='log-imacos' src={IMG} alt="logo fundacion 50 + 1"/>
                    </div> 
                    <form className='log-cont-form-reg' onSubmit={selUsuario} >
                        <h1 className='log-semititu'>Email</h1>  
                        <input className='log-input' type="text" name="txtEmail" placeholder="Email"/>
                        <h1 className='log-semititu'>Contraseña</h1>  
                        <input className='log-input' type="password" name="txtPass" placeholder="Contraseña"/>
                        <button className='log-boton-formi'>Iniciar sesion</button>
                    </form>
                </div>
                <div className='log-decoration'>
                    <div className='log-right-bg'/>
                    <div className='log-card'>
                        <h1 className='log-titulos'>Gestor de calificaciones 50 + 1</h1>
                        <h3 className='log-textop'>Inicia sesión para poder gestionar las calificaciones de tus alumnos y consultar otra información</h3>
                        <img className='log-imagen' src={IMG} alt="imagen fundacion 50 + 1"/>
                    </div>
                </div>
            </div>
        </div>

    </>
    );
}

export default Login;