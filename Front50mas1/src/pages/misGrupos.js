import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import Navbar from '../components/navbar';
import Table from 'react-bootstrap/Table';
import Header from '../components/header';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}
// profesor 


const MisGrupos = ({ page, page2 }) => {
    let correo = "";
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [cargarUsuario,setcargarUsuario] = useState(true);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        async function cargarUsuario(){
            console.log("token "+ localStorage.getItem('jwt'));
            if(!(localStorage.getItem('jwt'))){
                setcargarUsuario(false);
                setMessage("Por favor inicia sesión");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/login`);
                  }, 3000);
                return;
            }
            try {
                const  {data}  = await axios.get(`${getdireccion()}/checkJwtUser`,{headers:{'Authorization':localStorage.getItem('jwt')}});
                if(data.tipoUsuario == 'Administrador'){
                    setMessage("No tiene premiso para ver esta pagina");
                    setShowNotification(true);
                    setTimeout(() => {
                        window.location.replace(`/estadisticas`);
                    }, 3000);
                }else{
                    correo = data.correo;
                    console.log(correo);
                    fetchData();
                    return;
                }
            }catch(err){
                setMessage("Por favor inicia sesión");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/login`);
                  }, 3000);
                console.log(err);
            }
        }
        cargarUsuario();
    }, []);

    const fetchData = () => {
        axios.get(`${getdireccion()}/misTalleres/${correo}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    
    const gotoGroup = (codigo_taller, taller) => {
      navigate("/grupo", { state: {taller: codigo_taller, nombre_taller: taller}});
    }

    return (
        <>
        {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
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
                                    <th>Profesor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(taller => (
                                    <tr key={taller.codigo_taller}>
                                        <td>{taller.codigo_taller}</td>
                                        <td>{taller.taller}</td>
                                        <td>{taller.periodo}</td>
                                        <td>{taller.apellidoPaterno} {taller.apellidoMaterno} {taller.nombre}</td>
                                        <td><Alert.Link variant="primary" onClick={() => {gotoGroup(taller.codigo_taller, taller.taller)}}>Ver</Alert.Link></td>
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

export default MisGrupos;