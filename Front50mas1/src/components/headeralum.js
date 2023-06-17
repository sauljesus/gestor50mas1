import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import {FaUserCircle} from 'react-icons/fa';
import {BsGearFill, BsFillBellFill} from 'react-icons/bs';
import '../styles/navbar.css';

function Header({page, page2, alumno}) {
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
                    <FaUserCircle/>
                </div>
            </div>
            <div className="corner-icons">
                <div className="route-icons">
                    <BsGearFill/>
                </div>
                <div className="route-icons">
                    <BsFillBellFill/>
                </div>
            </div>
        </div>
    );
}

export default Header;