import React from 'react';
import { useEffect, useState } from 'react';
import { AiFillHome, AiOutlineReconciliation } from 'react-icons/ai';
import { GoThreeBars, GoGraph } from 'react-icons/go';
import { BiSearchAlt, BiEdit, BiIdCard } from 'react-icons/bi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { FaRegClipboard } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import descarga from '../images/descarga.png';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../styles/notif.css';

import '../styles/navbar.css';

function Navbar({ visible, show, page, tipe }) {
  const [navVisible, showNavbar] = useState(true);
  const [navAd, setNavAd] = useState(false);
  const [listInsert, setListInsert] = useState(false);

  useEffect(() => {
    console.log(tipe)
    if (tipe == "P") {
      console.log("P");
    }
    else {
      setNavAd(true);
    }
  }, []);

  const handleIngresoManual = (e) => {
    setListInsert(!listInsert);
  }
  return (
    <div className="sticky">
      <div className="mobile-nav">
        <button
          className="mobile-nav-btn"
          onClick={() => showNavbar(!navVisible)}
        >
          <GoThreeBars size={24} />
        </button>
      </div>
      <nav className={!navVisible ? 'navbart' : 'i'}>
        <button
          type="button"
          className="nav-btn"
          onClick={() => showNavbar(!navVisible)}
        >
          {<GoThreeBars size={30} />}
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

          {navAd && (<div className="links nav-top">
            <Link to="/estadisticas" className={page === "Estadisticas" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <GoGraph /></div>
              <span>Estadísiticas</span>
            </Link>
            <Link to="/consultas" className={page === "Consultas" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <BiSearchAlt /></div>
              <span>Consultar registros</span>
            </Link>
            <Link to="/masivecharge" className={page === "Cargar Información" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <SiMicrosoftexcel /></div>
              <span>Cargar información</span>
            </Link>
            <NavLink onClick={() => handleIngresoManual()} className={page === "Ingreso Manual" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <BiEdit /></div>
              <span>Ingreso manual de registros</span>
              <span className={listInsert?"":"qr"}><IoMdArrowDropdown /></span>
            </NavLink>
            {listInsert && (
              <>
              <Link to="/newAlumno" className={"nav-list"}>
              <span>Registrar Alumno</span>
            </Link>
            <Link to="/newTaller" className={"nav-list"}>
              <span>Registrar Taller</span>
            </Link>
            <Link to="/newProfesor" className={"nav-list"}>
              <span>Registrar Profesor</span>
            </Link>
              </>
            )}
            <Link to="/inscripciones" className={page === "Inscripciones" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <BiIdCard /></div>
              <span>Inscripciones a talleres</span>
            </Link>


            <Link to="/solicitudes" className={page === "Solicitudes" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <FaRegClipboard /></div>
              <span>Solicitudes de constancias</span>
            </Link>


          </div>
          )}
          {!navAd && (<div className="links nav-top">
            <Link to="/mis-grupos" className={page === "Grupos" ? "nav-link-selected" : "nav-link"}>
              <div className='icones shadow-box'> <AiOutlineReconciliation /></div>
              <span>Mis grupos</span>
            </Link>
          </div>
          )}

        </div>
      </nav >
    </div >
  );
}

export default Navbar;