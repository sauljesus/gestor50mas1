import React, { useState, useEffect } from 'react';
import '../../styles/forms.css';
import Alum from '../../components/navbaralum';
import Table from 'react-bootstrap/Table';
import Header from '../../components/headeralum';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { getdireccion } from '../../helpers/direccion';
import CloseButton from 'react-bootstrap/CloseButton';


const StudentGroups = ({ page, page2 }) => {
  const correo = "";
  let boleta = "";
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [datataller, setDatataller] = useState([]);
  const [grades, setCalificaciones] = useState([]);
  const [cargarUsuario, setcargarUsuario] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function cargarUsuario() {
      console.log("token " + localStorage.getItem('jwt'));
      if (!(localStorage.getItem('jwt'))) {
        setcargarUsuario(false);
        setMessage("Por favor inicia sesión");
        setShowNotification(true);
        setTimeout(() => {
          window.location.replace(`/`);
        }, 3000);
        return;
      }
      try {
        const { data } = await axios.get(`${getdireccion()}/checkJwt`, { headers: { 'Authorization': localStorage.getItem('jwt') } });
        //console.log(data);
        boleta = data.boleta;
        console.log(boleta);
        fetchData();
        // Asociar();
      } catch (err) {
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
  const fetchData = () => {
    axios.get(`${getdireccion()}/talleresAlumno/talleresInscrito/${boleta}`)

      .then(response => {
        setCalificaciones(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // axios.get(`${getdireccion()}/talleres`)
    // .then(response => {
    //     setDatataller(response.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });

  };

  const Asociar = () => {
    const calificaciones = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < datataller.length; j++) {
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
          if (newdata.estado == "Aprobada" || newdata.estado == "Reprobada") {
            calificaciones.push(newdata);
          }
        }
      }
    }
    console.log(calificaciones)
    setCalificaciones(calificaciones);
  }

  const gotoGroup = (codigo_taller, taller) => {
    navigate("http://localhos:5000/grupo", { state: { taller: codigo_taller, nombre_taller: taller } });
  }


  const generarCadenaAlfanumerica = (longitud) => {
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cadena = '';

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
      cadena += caracteresPermitidos.charAt(indiceAleatorio);
    }

    return cadena;
  }

  const generarCadenaCompuesta = ({ bolet, codigo_taller }) => {
    const añoActual = new Date().getFullYear();
    const codigoAleatorio = generarCadenaAlfanumerica(5);
    const folioCertificado = añoActual + codigoAleatorio;
    const update = {
      folioCertificado: folioCertificado,
      boleta: bolet,
      codigo_taller: codigo_taller,
    };
    console.log(update);
    axios.post(`${getdireccion()}/requestc/` + folioCertificado)
      .then(response => {
        setDatataller(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.put(`${getdireccion()}/setcertificado`, update)
      .then(response => {
        setDatataller(response.data);
        setMessage("Constancia solicitada, puedes recogerla en la institución");
        setShowNotification(true);
      })
      .catch(error => {
        console.error(error);


      });
  }


  return (
    <>
      {showNotification && (
        <div className="notification" style={{ color: "#ffffff" }}>
          <CloseButton variant="white" className='button-alert' onClick={() => setShowNotification(false)} />
          {message}
        </div>
      )}
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
                    <td>{calificacion.nombre}</td>
                    <td>{calificacion.periodo}</td>
                    <td>{calificacion.calificacion}</td>
                    <td>{calificacion.estado}</td>
                    {calificacion.estado == "Aprobada" ? (
                      <td><Alert.Link variant="primary" onClick={() => { generarCadenaCompuesta({ bolet: calificacion.boleta, codigo_taller: calificacion.codigo_taller }) }}>Solicitar Constancia</Alert.Link></td>

                    ) : (
                      <td><Alert.Link variant="primary"></Alert.Link></td>
                    )}
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