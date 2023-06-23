import React, { useState, useEffect } from 'react';
import '../styles/masive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BsGearFill} from 'react-icons/bs';
import Navbar from '../components/navbar';
import Header from '../components/header';
import DndropImage from '../components/Dnd';
import IMG from "../images/descarga.png";
import axios from 'axios';
import { getdireccion } from '../helpers/direccion';
import archivo from '../helpers/RegistrosEjemplo.xlsx';
//${getdireccion()}

const Masive = ({page}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [cargarUsuario,setcargarUsuario] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    let respuesta;

    const [hovered, setHovered] = useState(false);
    useEffect(() =>{
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
            if(data.tipoUsuario == 'Profesor'){
                setMessage("No tiene premiso para ver esta pagina");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/home`);
                }, 3000);
            }else{
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
    },[])
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleFileUpload = () => {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const xhr = new XMLHttpRequest();
      // Request completed event handler
      xhr.addEventListener('load', () => {
        // Handle the response from the server
        //console.log(xhr.responseText);
        respuesta = xhr.responseText;
      });
  
      // Send the file to the server using an HTTP request
      xhr.open('POST', `${getdireccion()}/upload`);
      xhr.send(formData);

      
    };
  
    return (
        <>
           {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
            <Navbar page={page} type={"A"}/>
            <div className='s-body_index'>
                <div className="main-container">
                    <Header page={page} page2={page} />
                    <div className="s-content">
                        <div className='s-box-head'>
                            <div className='s-text-head'>Carga de información</div>
                        </div>
                        <div className="excel-uploader container">
                            <div className="upload-container card">
                                <div className="card-body">
                               
                                    <h5 className="card-title">Arrastra o selecciona tu archivo de Excel</h5>
                                   
                                    <DndropImage  />
                                </div>
                            </div>
                           
                        </div>
                        <div>
                          Sube tu archivo con extensión .xlsx, o puedes descargar el archivo de ejemplo <a href={archivo} download="RegistrosEjemplo.xlsx">aquí.</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Masive;