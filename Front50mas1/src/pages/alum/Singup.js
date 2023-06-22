import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/consulta.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {BsGearFill} from 'react-icons/bs';
import Alum from '../../components/navbaralum';
import Header from '../../components/header';
import IMG from "../../images/descarga.png";
import EditContainer from '../../containers/editContainer';
import Edit from '../../pages/edit';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import { getdireccion } from '../../helpers/direccion';

const Signup =({page})=> {
  const [talleres, setTalleres] = useState([]);
  const [bolid, setBoleta] = useState([]);
  const [searchText, setSearchText] = useState('');
  const page2 = "Perfil";
  const pagee = "Dashboard";
  const [cargarUsuario,setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

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
          fetchTalleres();
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
  }, []);
  const fetchTalleres = () => {
    axios.get(`${getdireccion()}/talleres`)
      .then(responset => {
        console.log(responset.data);
        setTalleres(responset.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

    const [menuVisible, setMenuVisible] = useState(false);
  
    // Función para mostrar u ocultar el menú de edit emergente
    const toggleMenu = (alumno) => {
        console.log('Elemento seleccionado:', alumno.boleta);
        setMenuVisible(!menuVisible);
        setBoleta(alumno)
        console.log(bolid);
      };

  return (
    <>
    {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
      <Alum page={page} /> 
      <div className='s-body_index'>
        <div className="main-container">
           <Header page={page} page2={page}/> 
            <div className="s-content">

                <div className='s-box-head'>
                    <div className='s-text-head'>Inscribir talles de Talleres</div>
                </div>
                {talleres.map(taller => (
                    <div className='s-box-list' key={taller.codigo_taller}>
                        <div className="s-box-element">
                            <div className='s-box-name'>
                                <div className='s-box-foto'>
                                    <img
                                        src={IMG}
                                        alt="estadistica1"
                                        className='s-img'
                                    />
                                </div>
                                <div className='s-box-nombre'>{taller.nombre}</div>
                                <div className='s-box-email'>{taller.descripcion}</div>
                            </div>
                            <div className='s-txt-fecha'>{taller.periodo}</div>
                            <Link to={`/edit/${taller.codigo_taller}`}>Editar</Link>
                        </div>
                              
                              </div>
                          ))}

            </div>
            <div className='s-float-icon shadow-box'>
                <BsGearFill /> 
            </div>
        </div>
    </div>
    </>
  );
}

export default Signup;