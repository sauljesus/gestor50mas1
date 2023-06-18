import React, { useState } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Table from 'react-bootstrap/Table';
import Header from '../components/header';
import { NavLink } from 'react-router-dom';


const MisGrupos = ({ page, page2 }) => {
    const correo = "profesor@profe.com";


    return (
        <>
            <Navbar page={page} page2={page2} />
            <div className='s-body_index'>
                <div className="main-container">
                    <Header page={page} page2={page} />
                    <div className="s-content">
                        <div className='s-box-head'>
                            <div className='s-text-head'>Mis Grupos</div>
                        </div>

                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Curso</th>
                                    <th>Periodo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Carpinteria</td>
                                    <td>2023-1</td>
                                    <td><NavLink>Ver</NavLink></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Taller de cocina</td>
                                    <td>2023-1</td>
                                    <td><NavLink>Ver</NavLink></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td >Electricidad</td>
                                    <td>2022-2</td>
                                    <td><NavLink>Ver</NavLink></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MisGrupos;