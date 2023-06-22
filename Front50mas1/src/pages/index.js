import React, { useState,useEffect } from 'react';
import Axios  from 'axios';
import '../styles/Index.css';
import { Fade } from "react-awesome-reveal";
import IMG from "../images/50+1logo.png";
import Imgg from "../images/Consulta.png";
import Imgc from "../images/Constancia.png";
import Imga from "../images/Actualizacion.png";
import { useNavigate } from 'react-router-dom';
import ParticlesComponent from '../components/Particles';
import { getdireccion } from '../helpers/direccion';



const Index = ({scrollDown}) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [alumno,setAlumno] = useState(null);
    const [cargarUsuario,setcargarUsuario] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{ 
        async function cargarUsuario(){
            console.log("token "+ localStorage.getItem('jwt'));
            if(!(localStorage.getItem('jwt'))){
                setcargarUsuario(false);
                return;
            }
            try {
                const  {data}  = await Axios.get(`${getdireccion()}/checkJwt`,{headers:{'Authorization':localStorage.getItem('jwt')}});
                console.log(data);
                setMessage("login existente redirigiendo");
                setShowNotification(true);
                setTimeout(() => {
                    window.location.replace(`/alum/home`);
                  }, 3000);
            }catch(err){
                console.log(err);

            }
        }
        cargarUsuario();
    },[])

    const selUsuario= async (e) =>{
        e.preventDefault();
        const alumno = {"correo":`${e.target.elements.txtEmail.value}`,"password":`${e.target.elements.txtPass.value}`};  
        console.log(alumno.correo); 
        Axios.post(`${getdireccion()}/loginAlumno`,alumno).then((res)=>{
            const ms = "Login Exitoso";
            setMessage(ms);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
              }, 5000);
             console.log(res.data.info);
             console.log(res.data.jwt); 
             localStorage.setItem('jwt',res.data.jwt)
             //console.log(res.data.info);
             //console.log(res.data.jwt);
            window.location.replace(`/alum/home`);
        }).catch((err)=>{
            setMessage(err.response.data.msg);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
              }, 5000);
            window.location.replace(`/`);
        })
    }




  
    return (
        <div>
            {showNotification && (
                <div className="notification" style={{color:"#ffffff"}}>
                {message}
                </div>
            )}
        <div className='gridtop'>
            <div className='topgrid1'>
                <h1 className='titulo'>50 + 1</h1>
                <h2 className='descripcion'>Colectiva Nacional de #mujeres que nos une #AgendaDeGénero para alcanzar #IgualdadSustantiva respetando los #DDHH y #ConstruyendoSororidad.</h2>
            </div>
            <div className='topgrid2'>
                <Fade bottom>
                    <span className="scroll-btn">
                        <a onClick={scrollDown}>
                            <span className="mouse">
                                <span></span>
                            </span>
                        </a>
                    </span>
                </Fade>
            </div>
        </div>

        <div className='parbotgrid'>
            <div className='botgrid2'>
                <div className='log-loginfoi'>
                    <div className='log-header'>
                        <img className='log-imacosi' src={IMG} alt="logo fundacion 50 + 1" />
                    </div>
                    <form className='log-cont-form-regi' onSubmit={selUsuario}  >
                        <h1 className='log-semititui'>Email</h1>
                        <input className='log-input' type="text" name="txtEmail" placeholder="correo" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                        <h1 className='log-semititui'>Contraseña</h1>
                        <input className='log-input' type="password" name="txtPass" placeholder="Contraseña"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
                        <button className='log-boton-formi'>Iniciar sesion</button>
                        {/* <p>No tienes cuenta <a href="/newAlumno">Registrate aquí</a></p> */}
                    </form>
                </div>
            </div>
            <div className='info-cont'>
                <div className='imgcard0'>
                    <img className='log-imacos-i' src={Imgg} alt="logo fundacion 50 + 1" />
                    <h2 className='descripcionb'>Una vez que hayas iniciado sesión en nuestra plataforma, podrás acceder fácilmente a tus cursos inscritos y consultar tus calificaciones. </h2>
                </div>

                <div className='imgcard1'>
                    <h2 className='descripcionb'>Obtén información detallada sobre tu progreso académico.</h2>
                    <img className='log-imacos-i' src={Imgc} alt="logo fundacion 50 + 1" />
                </div>

                <div className='imgcard2'>
                    <img className='log-imacos-i' src={Imga} alt="logo fundacion 50 + 1" />
                    <h2 className='descripcionb'> Realiza un seguimiento de tus logros en cada curso.</h2>
                </div>
            </div>
        </div>


        <div className='particlesindex'><ParticlesComponent /></div>


    </div>
    );
  };
  
  export default Index;
