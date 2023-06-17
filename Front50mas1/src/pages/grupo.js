import React, { useState } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Table from 'react-bootstrap/Table';
import Header from '../components/header';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const GrupoContainer = ({ page }) => (
    <>
        <Navbar page={page} page2={page} />
        <div className='s-body_index'>
            <div className="main-container">
                <Header page={page} page2={page} />
                <div className="s-content">
                    <div className='s-box-head'>
                        <div className='s-text-head'>Grupo X</div>
                    </div>
                    <div className='s-box-list-2'>
                        <Form>
                            <Row className="mb-3 s-form">
                                <Form.Group as={Col} sm={5} className='form-header-name'>
                                    <Form.Label>Nombre</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} sm={4} className='form-header'>
                                    <Form.Label>Boleta</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} sm={1} className='form-header'>
                                    <Form.Label>Calificación</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 form-element">
                                <Form.Group as={Col} sm={5} controlId="formNombre">
                                    <Form.Label>Pérez Vidales Yesua David</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} sm={4} className='form-center' controlId="formBoleta">
                                    <Form.Label>1234567891</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} sm={1} controlId="formCalificación">
                                    <Form.Select defaultValue=" ">
                                        {Array.from({ length: 11 }).map((_, index) => (
                                            <option key={index}>{index}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 form-element">
                                <Form.Group as={Col} sm={5} controlId="formNombre">
                                    <Form.Label>Pérez Vidales Yesua David</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} sm={4} className='form-center' controlId="formBoleta">
                                    <Form.Label>1234567891</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col} sm={1} controlId="formCalificación">
                                    <Form.Select defaultValue=" ">
                                        {Array.from({ length: 11 }).map((_, index) => (
                                            <option key={index}>{index}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <button className='f-log-boton-formi mt-5 '>Guardar</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default GrupoContainer;