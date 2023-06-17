import React, { useState } from 'react';
import EG from "../images/Excelgray.png";
import EV from "../images/Excelverde.png";
import '../styles/masive.css';
import axios from 'axios';

const DndropImage = () => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState([]);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

      
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };


      const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        axios.post('http://localhost:5000/upload', formData)
          .then(response => {
          // console.log(response.data);
            setMessage(response.data);
            setShowNotification(true);
          // Ocultar la notificación después de 3 segundos
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    const Evsource = {EV}
  
    const inputClassName = isHovered ? 'custom-file-input input[type="file"]' : 'custom-file-input input[type="file"]';
    const imageSource = isHovered ? EV : EG;
  
    return (
      <>
             {showNotification && (
            <div className="notification">
            {message.message}
            </div>
          )}
      <div className="custom-file-input" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
         <input
                type="file"
                onChange={handleFileChange}
                className={inputClassName}
                placeholder="Arrastra tu Archivo de Excel o haz click sobre el icono para seleccionarlo" 
        />
        <img src={imageSource} className="eimage" alt="eimage" />
         
      </div>

      <button onClick={handleUpload} className="upload-button btn btn-primary">
            Subir información
          </button>
      </>
    );
  };

export default DndropImage;