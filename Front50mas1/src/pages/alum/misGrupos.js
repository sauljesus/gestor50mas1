import React, { useState, useEffect } from 'react';
import '../../styles/forms.css';
import Alum from '../../components/navbaralum';
import Table from 'react-bootstrap/Table';
import Header from '../../components/headeralum';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


const StudentGroups = ({ page, page2 }) => {
    const correo = "Profesor.test@gmail.com";
    const boleta = "2023060033";
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [datataller, setDatataller] = useState([]);
    const [grades, setCalificaciones] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        Asociar();
    }, []);
    const fetchData = () => {
        axios.get(`http://localhost:5000/studentcert/${boleta}`)
        
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });

            axios.get(`http://localhost:5000/talleres`)
            .then(response => {
                setDatataller(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            
    };

    const Asociar = () => {
        const calificaciones = [];
        for (let i = 0; i < data.length; i++){
            for (let j = 0; j < datataller.length; j++){
            if (data[i].codigo_taller === datataller[j].codigo_taller) {
                const newdata = {
                    boleta: data[i].boleta,
                    codigo_taller: data[i].codigo_taller,
                    calificacion: data[i].calificacion,
                    estado: data[i].estado,
                    folioCertificado: null,
                    taller: datataller[j].nombre,
                    periodo: datataller[j].periodo,
                  };
                  if(newdata.estado=="Aprobada" || newdata.estado=="Reprobada" ){
                    calificaciones.push(newdata);
                  }
              }
            }
        }
        console.log(calificaciones)
        setCalificaciones(calificaciones);
      }
    
    const gotoGroup = (codigo_taller, taller) => {
      navigate("/grupo", { state: {taller: codigo_taller, nombre_taller: taller}});
    }


    const generarCadenaAlfanumerica = (longitud)  => {
        const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cadena = '';
      
        for (let i = 0; i < longitud; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
          cadena += caracteresPermitidos.charAt(indiceAleatorio);
        }
      
        return cadena;
      }
      
      const generarCadenaCompuesta = (boleta, codigo_taller) =>  {
        const añoActual = new Date().getFullYear();
        const codigoAleatorio = generarCadenaAlfanumerica(5);
        const folioCertificado = añoActual+codigoAleatorio;
        const update = {
            folioCertificado: folioCertificado,
            boleta: boleta,
            codigo_taller: codigo_taller,
          };

        axios.post(`http://localhost:5000/requestc/`+folioCertificado)
        .then(response => {
            setDatataller(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        axios.put(`http://localhost:5000/setcertificado`,update)
        .then(response => {
            setDatataller(response.data);
        })
        .catch(error => {
            console.error(error);
            
        });
      }
   

    return (
        <>
            <Alum page={page} page2={page2} />
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
                                    <th>Calificacion</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map(calificacion => (
                                    <tr key={calificacion.codigo_taller}>
                                        <td>{calificacion.codigo_taller}</td>
                                        <td>{calificacion.taller}</td>
                                        <td>{calificacion.periodo}</td>
                                        <td>{calificacion.calificacion}</td>
                                        <td>{calificacion.estado}</td>
                                        <td><Alert.Link variant="primary" onClick={() => {generarCadenaCompuesta(calificacion.boleta, calificacion.codigo_taller)}}>Solicitar Constancia</Alert.Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentGroups;