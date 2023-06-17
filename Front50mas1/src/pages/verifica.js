import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/verifica.css';
import { useParams } from 'react-router-dom';
import IMG from "../images/50+1logo.png";

function Verifica() {
    const [data, setData] = useState([]);
    const { folio } = useParams();


    useEffect(() => {
        fetchAlumnos();
    }, []);

    const fetchAlumnos = () => {
        axios.get(`http://localhost:5000/certificado/${folio}`)
            .then(response => {
                setData(response.data[0]);
            })
            .catch(error => {
                console.error(error);
            });
        console.log(folio);
    };


    return (
        <>
            <div className='v-container'>
                <div className='v-info'>
                    <div className='v-header'>
                        <div className='v-text-header'>Verificación de Constancias</div>
                        <div className='v-logo'>
                            <img className="imagen-perfil"
                                src={IMG}
                                alt=""
                            ></img>
                        </div>
                    </div>
                    <div className='v-data'>
                        <div className='v-row'>
                            <h1 className='v-folio'>Folio {folio}</h1>
                        </div>
                        <div className='v-row'>
                            <h1 className='v-text-b'>NOMBRE: </h1>
                            <h1 className='v-text'>{data.apellidoPaterno} {data.apellidoMaterno} {data.nombre}</h1>
                        </div>
                        <div className='v-row'>
                            <h1 className='v-text-b'>ACTIVIDAD: </h1>
                            <h1 className='v-text'>{data.taller}</h1>
                        </div>
                        <div className='v-column'>
                            <div className='v-row'>
                                <h1 className='v-text-b'>CALIFICACIÓN: </h1>
                                <h1 className='v-text'>{data.calificacion} </h1>
                            </div>
                            <div className='v-row'>
                                <h1 className='v-text-b'>PERIODO: </h1>
                                <h1 className='v-text'>{data.periodo} </h1>
                            </div>
                        </div>
                        <div className='v-row'>
                            <h1 className='v-descrip'>Esta página tiene como único fin el verificar la información contenida en los certificados expedidos por la colectiva 50 + 1</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Verifica;