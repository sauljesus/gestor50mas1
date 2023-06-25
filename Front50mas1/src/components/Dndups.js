import React, { useState } from 'react';
import EG from "../images/Excelgray.png";
import EV from "../images/Excelverde.png";
import '../styles/masive.css';
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';
import { getdireccion } from '../helpers/direccion';
import { saveAs } from 'file-saver';

const DndropImageSingup = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState([]);
  const [resp, setRespuesta] = useState([]);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      setMessage({ message: "Archivo selecionado: " + e.target.files[0].name });
      setShowNotification(true);
    }
    else{
      setMessage({ message: "No se selecciono ningun archivo"});
      setShowNotification(true);
    }
  };


  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    if(!selectedFile){
      setMessage({ message: "No se selecciono ningun archivo" });
      setShowNotification(true);
    }else{
      setMessage({ message: "Subiendo información..." });
      setShowNotification(true); 
      console.log(`${getdireccion()}/msincripciones`);
      axios.post(`${getdireccion()}/msincripciones`, formData)
        .then(response => {
          setRespuesta(response)
          if(response.data.message == "Carga de Excel completada exitosamente"){ 
            setMessage(response.data); 
        }else{
          const textContent = JSON.stringify(response.data.message);
          const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
          saveAs(blob, 'Logs Inscripciones.txt');
          setMessage({ message: "Revise el archivo de Logs" });
        }
          setShowNotification(true);
          // Ocultar la notificación después de 5 segundos
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
        })
        .catch(error => {
          console.error(error);
        });
    }
   
  };

  const Evsource = { EV }

  const inputClassName = isHovered ? 'custom-file-input input[type="file"]' : 'custom-file-input input[type="file"]';
  const imageSource = isHovered ? EV : EG;

  return (
    <>
      {showNotification && (
        <div className="notification">
          <CloseButton variant="white" className='button-alert' onClick={() => setShowNotification(false)} />
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

export default DndropImageSingup;