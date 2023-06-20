import React from 'react';
import { useState } from 'react';
import {AiFillHome, AiOutlineReconciliation} from 'react-icons/ai';
import {GoThreeBars, GoGraph} from 'react-icons/go';
import {BiSearchAlt, BiEdit, BiIdCard} from 'react-icons/bi';
import {SiMicrosoftexcel} from 'react-icons/si';
import {FaRegClipboard} from 'react-icons/fa';
import descarga from '../images/descarga.png';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

function Navbar({visible, show, page}) {
    const [navVisible, showNavbar] = useState(true);

	return (
        <div className="sticky">
            <div className="mobile-nav">
                <button
                    className="mobile-nav-btn"
                    onClick={() => showNavbar(!navVisible)}
                >
                <GoThreeBars size={24}  />
                </button>
            </div>
            <nav className={!navVisible ? 'navbart' : ''}>
                <button
                    type="button"
                    className="nav-btn"
                    onClick={() => showNavbar(!navVisible)}
                >
                    { <GoThreeBars size={30}/>}
                </button>
                <div>
                    <NavLink
                        className="logo"
                    >
                    <img
                        src={descarga}
                        alt="logo"
                    />
                    </NavLink>
                    <div className="links nav-top">
                        <Link to="/home" className={page==="Dashboard" ? "nav-link-selected" : "nav-link" }>
                            <div className='icones shadow-box'> <AiFillHome/></div> 
                            <span>Inicio</span>
                        </Link>
                        <Link to="/consultas" className={page==="Consultas" ? "nav-link-selected" : "nav-link" }>
                            <div className='icones shadow-box'> <BiSearchAlt/></div> 
                            <span>Consulta</span>
                        </Link>
                        <Link to="/estadisticas" className={page==="Estadisticas" ? "nav-link-selected" : "nav-link" }>
                            <div className='icones shadow-box'> <GoGraph/></div> 
                            <span>Estadísiticas</span> 
                        </Link>
                        <NavLink to="/ingreso" className={page==="Ingreso Manual" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <BiEdit/></div> 
                            <span>Ingreso manual</span> 
                        </NavLink>
                        <Link to="/masivecharge" className={page==="Cargar Información" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <SiMicrosoftexcel/></div> 
                            <span>Cargar información</span> 
                        </Link>
                        <Link to="/solicitudes" className={page==="Solicitudes" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <FaRegClipboard/></div> 
                            <span>Solicitudes</span> 
                        </Link>
                        <Link to="/mis-grupos" className={page==="Grupos" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <AiOutlineReconciliation/></div> 
                            <span>Mis grupos</span> 
                        </Link>
                        <Link to="/inscripciones" className={page==="Inscripciones" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <BiIdCard/></div> 
                            <span>Inscripciones</span> 
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;