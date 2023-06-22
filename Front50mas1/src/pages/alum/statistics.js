import React from 'react';
import '../../styles/statistics.css';
import Alum from '../../components/navbaralum';
import Header from '../../components/headeralum';
import Bars from '../../components/BarChart';
import LinesChart from '../../components/LineChart';
import Pies from '../../components/PiesChart';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { getdireccion } from '../../helpers/direccion';


const Statisticsalum = ({ page}) => {


  //WINDOW----------------------------------------------------------
  const [user, setUser] = useState();
  const [nombre, setNombre] = useState();
  const [apellidoPaterno, setApellidop] = useState();
  const [correo, setCorreo] = useState();
  const [token, setToken] = useState();
  const [promedioa, setPromedio] = useState();
  const location = useLocation();
  const { boleta } = useParams();
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cargarUsuario,setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const { state } = location;
  const boletatest = "2023060033";


    useEffect(() => {
        async function cargarUsuario(){
            console.log("token "+ localStorage.getItem('jwt'));
            if(!(localStorage.getItem('jwt'))){
                setcargarUsuario(false);
                setMessage("Por favor inicia sesión");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/`);
                  }, 3000);
                return;
            }
            try {
                const  {data}  = await axios.get(`${getdireccion()}/checkJwt`,{headers:{'Authorization':localStorage.getItem('jwt')}});
                console.log(data);
                fetchData();
            }catch(err){
                setMessage("Por favor inicia sesión");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/`);
                  }, 3000);
                console.log(err);

            }
        }
        cargarUsuario();

    },[]);
    


    const [calificaciones, setCalificaciones] = useState([]);
    var opcioneEstadisticaCalificaciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Total de calificaciones",
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Calificación",
                }
            }
        },

    };
    var dataEstadisticaCalificaciones = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
            {
                label: 'Total de calificaciones',
                data: calificaciones,
                backgroundColor: 'rgb(75, 6, 131, 0.6)'
            }
        ]
    };

    const [nivelAcademico, setNivelAcademico] = useState([]);
    const [tnivelAcademico, setTNivelAcademico] = useState([]);
    var opcionesNivel = {
        responsive: true,
        maintainAspectRatio: false,
    };
    var dataNivel = {
        labels: nivelAcademico,
        datasets: [
            {
                label: 'Total de estudiantes',
                data: tnivelAcademico,
                backgroundColor: [
                    'rgba(75,6,131, 0.5)',
                    'rgba(164,81,232, 0.5)',
                    'rgba(130,11,227, 0.5)',
                    'rgba(70,35,99,39, 0.5)',
                    'rgba(101,9,176, 0.5)',
                ],
                borderColor: [
                    'rgba(75,6,131, 1)',
                    'rgba(164,81,232, 1)',
                    'rgba(130,11,227, 1)',
                    'rgba(70,35,99,39, 1)',
                    'rgba(101,9,176, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const [talleres, setTalleres] = useState([]);
    const [ttalleres, setTTalleres] = useState([]);
    var opcionesTaller = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {

            },
            x: {
            }
        },

    };
    var dataTaller = {
        labels: talleres,
        datasets: [
            {
                label: 'Alumnos inscritos',
                data: ttalleres,
                backgroundColor: ['rgba(75,6,131, 0.5)',
                    'rgba(164,81,232, 0.5)',
                    'rgba(130,11,227, 0.5)',
                    'rgba(70,35,99,39, 0.5)',
                    'rgba(101,9,176, 0.5)',
                ],
            }
        ]
    };

    const [rangos, setRangos] = useState([]);
    const [trangos, setTRangos] = useState([]);
    var dataEdad = {
        labels: rangos,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: "Alumnos",
                data: trangos,
                fill: false,
                borderColor: 'rgba(167,129,214)',
                pointRadius: 5,
                pointBorderColor: 'rgba(75,6,131, 0.5)',
                pointBackgroundColor: 'rgba(75,6,131, 1)',
            },
        ],
    };
    var opcionesEdad = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0
                
            },
            x: {
                ticks: { color: 'rgba(75,6,131)' }
            }
        }
    };
    const fetchData = () => {

        axios.get(`http://localhost:5000/estadistica6/`+boletatest)
            .then(response => {
                let data = response.data;
                let cantPromedio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < data.length; i++) {
                    cantPromedio[data[i].calificacion] = data[i].total;
                }
                setCalificaciones(cantPromedio);
            })
            .catch(error => {
                console.error(error);
            }
            );

            axios.get(`http://localhost:5000/estadistica7/`+boletatest)
            .then(response => {
                let data = response.data;
                let promediod =data[0].promedio_calificaciones;
                let numeroFormateado = parseFloat(promediod).toString()
                setPromedio(numeroFormateado);

            })
            .catch(error => {
                console.error(error);
            }
            );
        axios.get(`http://localhost:5000/estadistica2`)
            .then(response => {
                let data = response.data;
                let nivel = [];
                let total = [];
                for (var i = 0; i < data.length; i++) {
                    nivel.push(data[i].nivelAcademico);
                    total.push(data[i].total);
                }
                setNivelAcademico(nivel);
                setTNivelAcademico(total);
            })
            .catch(error => {
                console.error(error);
            }
            );
        axios.get(`http://localhost:5000/estadistica3`)
            .then(response => {
                let data = response.data;
                let taller = [];
                let total = [];
                for (var i = 0; i < data.length; i++) {
                    taller.push(data[i].nombre);
                    total.push(data[i].total);
                }
                setTalleres(taller);
                setTTalleres(total);
            })
            .catch(error => {
                console.error(error);
            }
            );
        axios.get(`http://localhost:5000/estadistica4`)
            .then(response => {
                let data = Object.entries(response.data[0]);
                let rangos = [];
                let total = [];
                for (var i = 0; i < data.length; i++) {
                    rangos.push(data[i][0]);
                    total.push(data[i][1]);
                }
                setRangos(rangos);
                setTRangos(total);
            })
            .catch(error => {
                console.error(error);
            }
            );


    }
    

    return (
        <>
        {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
            <Alum page={page} datos={datos}/>
            <div className='body_index'>
                <div className="main-container">
                    <Header page={page} page2={page} />
                    <div className="content">
                        <div className="sta-boxes">
                            
                            <div className='sta-box-t7 box box-m1 shadow-box'>
                            <div className='sta-title-t7'><p>Tu promedio actual es de <br></br><h1>{promedioa}</h1></p></div>
                            </div>

                            <div className='sta-box-t1 box box-m2 shadow-box'>
                            <div className='sta-title-t1'>{nombre} Estas son tus calificiones</div>
                                <div className='sta-cont-img-t1'>
                                    <Bars midata={dataEstadisticaCalificaciones} misoptions={opcioneEstadisticaCalificaciones} className="max-box" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Statisticsalum;