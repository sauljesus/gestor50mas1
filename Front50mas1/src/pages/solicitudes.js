import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/solicitudes.css';
import { BsGearFill } from 'react-icons/bs';
import Navbar from '../components/navbar';
import Header from '../components/header';
import IMG from "../images/descarga.png";
import Alert from 'react-bootstrap/Alert';
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}


function Solicitudes({ page }) {
  const [certificados, setCertificados] = useState([]);
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
                  window.location.replace(`/mis-grupos`);
              }, 3000);
          }else{
            fetchCertificados();
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


  let navigate = useNavigate();
  const gotoPDF = (data) => {
    navigate("/pdf", { state: {folio: data}});
  }

  

  const fetchCertificados = () => {
    axios.get(`${getdireccion()}/certificados`)
      .then(response => {
        setCertificados(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
    {showNotification && (
            <div className="notification" style={{color:"#ffffff"}}>
            {message}
            </div>
        )}
      <Navbar page={page} />
      <div className='s-body_index'>
        <div className="main-container">
          <Header page={page} page2={page} />
          <div className="s-content">
            <div className='s-box-head'>
              <div className='s-text-head'>Solicitudes de Certificados</div>
            </div>
            <div className='s-box-list'>
              {certificados.map(certificado => (
                <div className="sol-box-element" key={certificado.boleta}>
                  <div className='sol-box-name'>
                    <div className='s-box-foto'>
                      <img
                        src={IMG}
                        alt="estadistica1"
                        className='s-img'
                      />
                    </div>
                    <div className='sol-box-nombre'>{certificado.boleta}</div>
                  </div>
                  {certificado.estado === 'Generado' ? (
                    <div className='s-status-generada s-status'>{certificado.estado}</div>
                  ) : (
                    <div className='s-status-pendiente s-status'>{certificado.estado}</div>
                  )}
                  <div className='s-txt-fecha'>{certificado.nombre}</div>
                  <Alert.Link variant="primary" onClick={() => gotoPDF(certificado.folioCertificado)}>Generar</Alert.Link>

                </div>


              ))}
          </div>
        </div>
        <div className='s-float-icon shadow-box'>
          <BsGearFill />
        </div>
      </div>
    </div >
    </>
  );
}

export default Solicitudes;