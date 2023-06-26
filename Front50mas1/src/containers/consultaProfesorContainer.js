import React from 'react';
import ConsultaProfesor from '../pages/consultaProfesor';
import { useState } from 'react';

const ConsultaProfesorContainer = () =>{
    const page = "Consultas";


    return(
        <ConsultaProfesor page = { page }/>
    )
};

export default ConsultaProfesorContainer;