import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import IndexContainer from '../containers/indexContainer';
import HomeContainer from '../containers/homeContainer';
import ProfileContainer from '../containers/profileContainer';
import EditContainer from '../containers/editContainer';
import EditTallerContainer from '../containers/editTallerContainer';
import EditProfesorContainer from '../containers/editProfesorContainer';
import SolicitudesContainer from '../containers/solicitudesContainer';
import StatisticsContainer from '../containers/statisticsContainer';
import LoginContainer from '../containers/loginContainer';
import ConsultasContainer from '../containers/consultasContainer'
import MasiveContainer from '../containers/masivecharge';
import IngresoManualContainer from '../containers/ingresoManualContainer';
import MisGruposContainer from '../containers/misGruposContainer';
import GrupoContainer from '../containers/grupoContainer';
import PDFContainer from '../containers/PDFContainer';
import VerificaContainer from '../containers/verificaContainer';
import StudentFormContainer from '../containers/studentFormContainer';
import UserFormContainer from '../containers/UserFormContainer';
import InscripcionesContainer from '../containers/inscripcionesContainer';
import CourseFormContainer from '../containers/courseFormContainer';
import ConsultaTallerContainer from '../containers/consultaTallerContainer';
import ConsultaProfesorContainer from '../containers/consultaProfesorContainer';
import ConsultaAlumnoContainer from '../containers/consultaAlumnoContainer';
import DirectorFormContainer from '../containers/DirectorFormContainer';
//alumnos
import StatisticsContaineralum from '../containers/statisticsContaineralum';
import SingupContaineralum from '../containers/singupContaineralum';
import StudentGroupsContainer from '../containers/studentGroupsContainer';



function App() {
  return (
    <Router>
         <Routes>
          <Route exact path="/" element={<IndexContainer />}/>
          <Route exact path="/home" element={<HomeContainer />}/>
          <Route exact path="/profile" element={<ProfileContainer />}/>
          <Route exact path="/edit/:boleta" element={<EditContainer />}/>
          <Route exact path="/edit-taller/:taller" element={<EditTallerContainer />}/>
          <Route exact path="/edit-profesor/:correo" element={<EditProfesorContainer />}/>
          <Route exact path="/consultas" element={<ConsultasContainer />}/>
          <Route exact path="/consulta-alumno" element={<ConsultaAlumnoContainer />}/>
          <Route exact path="/consulta-taller" element={<ConsultaTallerContainer />}/>
          <Route exact path="/consulta-profesor" element={<ConsultaProfesorContainer />}/>
          <Route exact path="/solicitudes" element={<SolicitudesContainer />}/>
          <Route exact path="/estadisticas" element={<StatisticsContainer />}/>
          <Route exact path="/masivecharge" element={<MasiveContainer />}/>
          <Route exact path="/login" element={<LoginContainer />}/>
          <Route exact path="/pdf" element={<PDFContainer />}/>
          {/* <Route exact path="/ingreso" element={<IngresoManualContainer />}/> */}
          <Route exact path="/mis-grupos" element={<MisGruposContainer />}/>
          <Route exact path="/grupo" element={<GrupoContainer />}/>
          <Route exact path="/verifica/:folio" element={<VerificaContainer />}/>
          <Route exact path="/newAlumno" element={<StudentFormContainer />}/>
          <Route exact path="/newProfesor" element={<UserFormContainer />}/>
          <Route exact path="/newDirector" element={<DirectorFormContainer />}/>
          <Route exact path="/newTaller" element={<CourseFormContainer />}/>
          <Route exact path="/inscripciones" element={<InscripcionesContainer />}/>
          {/* alumnos */}
          <Route exact path="/alum/home" element={<StatisticsContaineralum />}/>
          <Route exact path="/alum/inscribir" element={<SingupContaineralum />}/>
          <Route exact path="/alum/mis-grupos" element={<StudentGroupsContainer/>}/>
          <Route path='*' element={<><h3>404 Page not found</h3></>}/>
        </Routes>
      </Router>
  );
}

export default App;
