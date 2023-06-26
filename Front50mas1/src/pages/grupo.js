import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}

const Grupo = ({ page, page2 }) => {
  const location = useLocation();
  const codigo = location.state.taller;
  const taller = location.state.nombre_taller;
  const [data, setData] = useState([]);
  const [calificaciones, setCalificaciones] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${getdireccion()}/miGrupo/${codigo}`)
      .then(response => {
        setData(response.data);
        response.data.forEach(calificacion => {
          var cal = calificaciones;
          cal[calificacion.boleta] = calificacion.calificacion;
          setCalificaciones(cal);
        })
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getdireccion()}/setCalificaciones/${codigo}`, calificaciones);
      setMessage("Calificaciones guardadas correctamente");
    } catch (error) {
      setMessage(error);
      console.error(error);
    }
    setShowNotification(true);

  };

  const handleOption = (boleta) => {
    let cal = calificaciones;
    let name = "form-select" + boleta;
    cal[boleta] = document.getElementById(name).value;;
    setCalificaciones(cal);
  };

  return (
    <>
      <Navbar page={page} page2={page2} type={"P"}/>
      <div className='s-body_index'>
        <div className="main-container">
          <Header page={page2} page2={page + " " + codigo} />
          {showNotification && (
            <div className="notification">
              <CloseButton variant="white" className='button-alert' onClick={() => setShowNotification(false)} />
              {message}
            </div>
          )}
          <div className="s-content">
            <div className='s-box-head'>
              <div className='s-text-head'>{taller}</div>
            </div>
            <div className='s-box-list-2'>
              <Form onSubmit={handleSubmit}>
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
                {data.map(alumno => (
                  <Row className="mb-3 form-element" key={alumno.boleta}>
                    <Form.Group as={Col} sm={5} controlId="formNombre">
                      <Form.Label>{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombre}</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} sm={4} className='form-center' controlId="formBoleta">
                      <Form.Label id={"boleta" + alumno.boleta}>{alumno.boleta}</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col} sm={2} controlId="formCalificación">
                      <Form.Select id={"form-select" + alumno.boleta} defaultValue={alumno.calificacion ? alumno.calificacion : ""} onChange={() => handleOption(alumno.boleta)}>
                        <option value=""></option>
                        {Array.from({ length: 11 }).map((_, index) => (
                          <option key={index} className={alumno.calificacion ? alumno.calificacion === index ? "f-font-bold" : "" : ""} value={index} >{index}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                ))}
                <button className='f-log-boton-formi mt-5' type="submit">Guardar</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Grupo;