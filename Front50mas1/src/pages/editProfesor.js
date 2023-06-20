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

function EditProfesor({ page }) {
    const [profe, setProfe] = useState([]);
    const { correo } = useParams();
    const [showNotification, setShowNotification] = useState(false);
    const [msgNoti, setMsgNoti] = useState("");


    useEffect(() => {
        fetchProfesor();
    }, []);

    const fetchProfesor = () => {
        axios.get(`http://localhost:5000/usuario/${correo}`)
            .then(response => {
                setProfe(response.data);
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
            const response = await axios.put('http://localhost:5000/profesoredit/' + correo, profe);

            setShowNotification(true);
            setMsgNoti("Profesor actualizado correctamente");
            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

        } catch (error) {
            if (error.response.data.msg.toString().includes("Correo ya registrado"))
                setMsgNoti("Profesor no se pudo actualizar, el correo ya se encuentra registrado");
            else
                setMsgNoti("Profesor no se pudo actualizar");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        }
    };

    return (
        <>
            {showNotification && (
                <div className="notification">
                    {msgNoti}
                </div>
            )}
            <Navbar page={page} />
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
                                <div className='p-txt-nombre'>{profe.nombre} {profe.apellidoPaterno} {profe.apellidoMaterno}</div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>Correo:</div>
                                    <div className='p-text-gray'>{profe.correo}</div>
                                </div>
                            </div>
                            <div className='p-btn-actualizar'>
                                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
                            </div>
                        </div>
                        <div className="t-info">
                            <div className='p-title-cont'>
                                <div>Información del Profesor</div>
                            </div>
                            <form >
                                <div className="form">
                                    <div className="column">
                                        <div className="form-field">
                                            <label htmlFor="nombre">Nombre:</label>
                                            <input required maxLength={30} type="text" id="name" className='cimput' value={profe.nombre} onChange={(e) => setProfe({
                                                ...profe,
                                                nombre: e.target.value
                                            })} />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                                            <input required maxLength={30} type="text" id="appat" className='cimput' value={profe.apellidoPaterno} onChange={(e) => setProfe({
                                                ...profe, apellidoPaterno: e.target.value
                                            })}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                                            <input required maxLength={30} type="text" id="apmat" className='cimput' value={profe.apellidoMaterno} onChange={(e) => setProfe({
                                                ...profe, apellidoMaterno: e.target.value
                                            })}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="correo">Correo:</label>
                                            <input required maxLength={30} type="text" id="correo" className='cimput' value={profe.correo} onChange={(e) => setProfe({
                                                ...profe, correo:
                                                    e.target.value
                                            })}
                                            />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="form-field">
                                            <label htmlFor="status">Estatus:</label>
                                            <select name="status" className='cimput' onChange={(e) => setProfe({
                                                ...profe,
                                                status: e.target.value
                                            })}>
                                                <option value="Activo" selected={profe.status === "Activo" ? true : false} >Activo</option>
                                                <option value="Inactivo" selected={profe.status === "Inactivo" ? true : false} >Inactivo</option>
                                            </select>
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="usuario">Usuario:</label>
                                            <select name="usuario" className='cimput' onChange={(e) => setProfe({
                                                ...profe,
                                                tipoUsuario: e.target.value
                                            })}>
                                                <option value="Profesor" selected={profe.tipoUsuario === "Profesor" ? true : false} >Profesor</option>
                                                <option value="Administrador" selected={profe.tipoUsuario === "Administrador" ? true : false} >Administrador</option>
                                            </select>
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

export default EditProfesor;