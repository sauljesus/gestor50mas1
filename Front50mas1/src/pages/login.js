import React from 'react';
import '../styles/login.css';
import IMG from "../images/logo-no-background.png";


const Login = () => (
    <>
        <div className='log-fullscreen' >
            <div className='log-container'>
                <div className='log-loginfo'>
                    <div className='log-header'>
                        <img className='log-imacos' src={IMG} alt="logo fundacion 50 + 1"/>
                    </div> 
                    <form className='log-cont-form-reg' >
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

export default Login;