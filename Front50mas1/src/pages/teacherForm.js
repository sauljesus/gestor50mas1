import React, { useState } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';


const TeacherForm = ({ page}) => (
    <>
        <Navbar  page={page} type={"A"}/> 
        <div className='s-body_index'>
            <div className="main-container">
               <Header page={page} page2={page}/> 
                <div className="s-content">
                    <div className='s-box-head'>
                        <div className='s-text-head'>Registro de alumnos</div>
                    </div>
                    <div className='f-block'>
                        <form className='f-cont-form-reg' >
                            <h1 className='f-log-semititu'>Email</h1>  
                            <input className='f-log-input' type="text" name="txtEmail" placeholder="Email"/>
                            <h1 className='f-log-semititu'>Contraseña</h1>  
                            <input className='f-log-input' type="password" name="txtPass" placeholder="Contraseña"/>
                            <button className='f-log-boton-formi'>Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default TeacherForm;