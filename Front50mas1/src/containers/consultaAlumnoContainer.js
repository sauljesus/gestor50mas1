import React from 'react';
import ConsultaAlumno from '../pages/consultaAlumno';
import { useState } from 'react';

const ConsultaAlumnoContainer = () =>{
    const page = "Consultas";


    return(
        <ConsultaAlumno page = { page }/>
    )
};

export default ConsultaAlumnoContainer;