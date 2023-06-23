import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/edit.css';
import { AiFillCamera } from 'react-icons/ai';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}

function Edit({ page }) {
  const [alumno, setAlumno] = useState([]);
  const { boleta } = useParams();
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = () => {
    axios.get(`${getdireccion()}/alumno/${boleta}`)
      .then(response => {
        setAlumno(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toastEmiter = async (texto) => {
    console.log(texto);
    toast.success(texto);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${getdireccion()}/alumnoedit/${alumno.boleta}` , alumno);

      setShowNotification(true);
      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showNotification && (
        <div className="notification">
          Registro actualizado correctamente
        </div>
      )}
      <Navbar page={page} type={"A"}/>
      <div className='body_index'>
        <div className="main-container">
          <Header page={page} page2={"Edición"} />
          <div className="p-content">
            <div className="p-main">

              <div className='p-cont-foto'>
                <img className="imagen-perfil"
                  src={IMG}
                  alt=""
                ></img>
                <div className="boton-perfil">
                  <AiFillCamera />

                </div>
              </div>
              <div className='p-cont-nombre'>
                <div className='p-txt-nombre'>{alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Boleta</div>
                  <div className='p-text-gray'>{alumno.boleta}</div>
                </div>
                <div className='p-text-user'>
                  <div className='p-text-dark'>Email:</div>
                  <div className='p-text-gray'>{alumno.correo}</div>
                </div>
              </div>
              <div className='p-btn-actualizar'>
                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
              </div>
            </div>
            <div className="p-info">
              <div className='p-title-cont'>
                <div>Información del usuario</div>
              </div>

              <form >
                <div className="form">
                  <div className="column">
                    <div className="form-field">
                      <label htmlFor="nombre">Nombre:</label>
                      <input type="text" id="name" className='cimput' value={alumno.nombre} onChange={(e) => setAlumno({
                        ...alumno,
                        nombre: e.target.value
                      })} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                      <input type="text" id="appat" className='cimput' value={alumno.apellidoPaterno} onChange={(e) => setAlumno({
                        ...alumno, apellidoPaterno: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                      <input type="text" id="apmat" className='cimput' value={alumno.apellidoMaterno} onChange={(e) => setAlumno({
                        ...alumno, apellidoMaterno: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="edad">Edad:</label>
                      <input type="text" id="edad" className='cimput' value={alumno.edad} onChange={(e) => setAlumno({
                        ...alumno, edad:
                          e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="sexo">Sexo:</label>
                      <input type="text" id="sexo" className='cimput' value={alumno.sexo} onChange={(e) => setAlumno({
                        ...alumno, sexo:
                          e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="curp">CURP:</label>
                      <input type="text" id="CURP" className='cimput' value={alumno.curp} onChange={(e) => setAlumno({
                        ...alumno, curp:
                          e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="rfc">RFC:</label>
                      <input type="text" id="RFC" className='cimput' value={alumno.rfc} onChange={(e) => setAlumno({
                        ...alumno, rfc:
                          e.target.value
                      })}
                      />
                    </div>
                  </div>
                  <div className="column">
                    <div className="form-field">
                      <label htmlFor="calle">Calle:</label>
                      <input type="text" id="Calle" className='cimput' value={alumno.calle} onChange={(e) => setAlumno({
                        ...alumno,
                        calle: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="numero">Numero:</label>
                      <input type="text" id="Numero" className='cimput' value={alumno.numero} onChange={(e) => setAlumno({
                        ...alumno,
                        numero: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="colonia">Colonia:</label>
                      <input type="text" id="Colonia" className='cimput' value={alumno.colonia} onChange={(e) => setAlumno({
                        ...alumno,
                        colonia: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cp">Código Postal:</label>
                      <input type="text" id="CP" className='cimput' value={alumno.CP} onChange={(e) => setAlumno({
                        ...alumno, CP:
                          e.target.value
                      })}
                      />

                    </div>
                    <div className="form-field">
                      <label htmlFor="municipio">Municipio:</label>
                      <input type="text" id="Municipio" className='cimput' value={alumno.municipio} onChange={(e) => setAlumno({
                        ...alumno, municipio: e.target.value
                      })}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="estado">Estado:</label>
                      <input type="text" id="estado" className='cimput' value={alumno.estado} onChange={(e) => setAlumno({
                        ...alumno,
                        estado: e.target.value
                      })}
                      />
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Edit;