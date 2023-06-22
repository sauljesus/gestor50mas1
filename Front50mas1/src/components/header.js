import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import {FaUserCircle, FaSignOutAlt} from 'react-icons/fa';
import {BsGearFill, BsFillBellFill} from 'react-icons/bs';
import '../styles/navbar.css';

function Header({page, page2}) {
    const logOut = () =>{
        localStorage.removeItem('jwt');
        window.location.replace('/login');
    }
	return (
        <div className="header">
            <div className="route">
                <div className="route-text-up"> 
                    <div className="route-icon">
                        <AiFillHome/>
                    </div>
                        / {page}
                </div>
                <div className="route-text-down">{page2} </div>
            </div>
            <div className="corner-icons">
                <div className="route-icons">
                    {/* <FaUserCircle/> */}
                </div>
            </div>
            <div className="corner-icons">
                <div className="route-icons">
                    {/* <BsGearFill/> */}
                </div>
                <div className="route-icons">
                    <button style={{border:'none'}} onClick={logOut} title='Cerrar Sesión'><FaSignOutAlt/></button>
                </div>
            </div>
        </div>
    );
}

export default Header;