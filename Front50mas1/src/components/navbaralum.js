import React from 'react';
import { useState } from 'react';
import {AiFillHome, AiOutlineReconciliation} from 'react-icons/ai';
import {GoThreeBars, GoGraph} from 'react-icons/go';
import {BiSearchAlt, BiEdit} from 'react-icons/bi';
import {SiMicrosoftexcel} from 'react-icons/si';
import descarga from '../images/descarga.png';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

function Navbaralum({visible, show, page}) {
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
                        <Link to="/alum/home" className={page==="Estadisticas" ? "nav-link-selected" : "nav-link" }>
                            <div className='icones shadow-box'> <GoGraph/></div> 
                            <span>Estadísiticas</span> 
                        </Link>
                        <Link to="/alum/mis-grupos" className={page==="Grupos" ? "nav-link-selected" : "nav-link" }>                            
                            <div className='icones shadow-box'> <AiOutlineReconciliation/></div> 
                            <span>Calificaciones</span> 
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbaralum;