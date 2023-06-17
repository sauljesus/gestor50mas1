import React from 'react';
import '../styles/profile.css';
import {AiFillCamera} from 'react-icons/ai';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";


const Profile = ({ page, page2}) => (
    <>
        <Navbar page={page} /> 
        <div className='body_index'>
            <div className="main-container">
                <Header page={page} page2={page2}/>
                <div className="p-content">
                    <div className="p-main">
                        <div className='p-cont-foto'>
                            <img className="imagen-perfil"
                                src={IMG}
                                alt=""
                            ></img> 
                            <div className="boton-perfil">
                                <AiFillCamera/>
                            </div>                           
                        </div>
                        <div className='p-cont-nombre'>
                            <div className='p-txt-nombre'>Mauricio Taboada</div>
                            <div className='p-text-user'>
                                <div className='p-text-dark'>Username:</div>
                                <div className='p-text-gray'>MauricioTaboada@gmail.com</div>
                            </div>
                            <div className='p-text-user'>
                                <div className='p-text-dark'>Email:</div>
                                <div className='p-text-gray'>MauricioTaboada@gmail.com</div>
                            </div>
                        </div>
                        <div className='p-btn-actualizar'>
                            <div className='p-btn'>Actualizar</div>
                        </div>
                    </div>
                    <div className="p-info">
                        <div className='p-title-cont'>
                            <div>Información del usuario</div>
                        </div>
                        <div className='p-data-cont'>
                            <div className='p-data-cont1'>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>Nombre:</div>
                                    <div className='p-txt-data2'>Mauricio</div>
                                </div>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>Segundo Nombre:</div>
                                    <div className='p-txt-data2'>Manuel</div>
                                </div>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>Apellidos:</div>
                                    <div className='p-txt-data2'>Taboada Sánchez</div>
                                </div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>Username:</div>
                                    <div className='p-text-gray'>MauricioTaboada@gmail.com</div>
                                </div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>Email:</div>
                                    <div className='p-text-gray'>MauricioTaboada@gmail.com</div>
                                </div>
                            </div>
                            <div className='p-data-cont2'>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>Edad:</div>
                                    <div className='p-txt-data2'>25</div>
                                </div>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>Sexo:</div>
                                    <div className='p-txt-data2'>M</div>
                                </div>
                                <div className='p-txt-cont-inf'>
                                    <div className='p-txt-data1'>CURP:</div>
                                    <div className='p-txt-data2 p-txt-m-sm'>YUVG15350202HDFRDSA8</div>
                                </div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>RFC:</div>
                                    <div className='p-text-gray'>YUVG15350202</div>
                                </div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>Dirección:</div>
                                    <div className='p-text-gray '>Avenida siempre viva MZ14 Lt19</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Profile;