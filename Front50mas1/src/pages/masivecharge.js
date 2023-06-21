import React, { useState } from 'react';
import '../styles/masive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BsGearFill} from 'react-icons/bs';
import Navbar from '../components/navbar';
import Header from '../components/header';
import DndropImage from '../components/Dnd';
import IMG from "../images/descarga.png";
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}

const Masive = ({page}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    let respuesta;

    const [hovered, setHovered] = useState(false);

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
  
            <Navbar page={page} />
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Masive;