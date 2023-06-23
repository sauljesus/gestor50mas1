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

function EditTaller({ page }) {
    const [talleres, setTalleres] = useState([]);
    const { taller } = useParams();
    const [showNotification, setShowNotification] = useState(false);
    const [msgNoti, setMsgNoti] = useState("");


    useEffect(() => {
        fetchTaller();
    }, []);

    const fetchTaller = () => {
        axios.get(`${getdireccion()}/taller/${taller}`)
            .then(response => {
                setTalleres(response.data);
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
            const response = await axios.put(`${getdireccion()}/talleredit/${talleres.codigo_taller}`, talleres);

            setShowNotification(true);
            setMsgNoti("Taller actualizado correctamente");
            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

        } catch (error) {
            if (error.response.data.msg.toString().includes("Correo no registrado"))
                setMsgNoti("Taller no se pudo actualizar, correo ingresado no registrado");
            else
                setMsgNoti("Taller no se pudo actualizar");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    return (
        <>
            {showNotification && (
                <div className="notification">
                    {msgNoti}
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
                                <div className='p-txt-nombre'>{talleres.nombre}</div>
                                <div className='p-text-user'>
                                    <div className='p-text-dark'>Código</div>
                                    <div className='p-text-gray'>{talleres.codigo_taller}</div>
                                </div>
                            </div>
                            <div className='p-btn-actualizar'>
                                <div className='p-btn' onClick={handleSubmit}>Actualizar</div>
                            </div>
                        </div>
                        <div className="t-info">
                            <div className='t-title-cont'>
                                <div>Información del taller</div>
                            </div>

                            <form >
                                <div className="t-form">
                                    <div className="form-field">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input maxlength="50" required type="text" id="name" className='t-cimput' value={talleres.nombre} onChange={(e) => setTalleres({
                                            ...talleres,
                                            nombre: e.target.value
                                        })} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="correo">Encargado(correo):</label>
                                        <input maxlength="30" required type="text" id="correo" className='t-cimput' value={talleres.correo} onChange={(e) => setTalleres({
                                            ...talleres,
                                            correo: e.target.value
                                        })} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="periodo">Periodo:</label>
                                        <input maxlength="20" required type="text" id="periodo" className='t-cimput' value={talleres.periodo} onChange={(e) => setTalleres({
                                            ...talleres,
                                            periodo: e.target.value
                                        })} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="descripcion">Descripción:</label>
                                        <input maxlength="200" type="text" id="descripcion" className='t-cimput' value={talleres.descripcion} onChange={(e) => setTalleres({
                                            ...talleres,
                                            descripcion: e.target.value
                                        })} />
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

export default EditTaller;