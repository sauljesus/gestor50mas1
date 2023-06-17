import React from 'react';
import Consultas from '../pages/consulta';
import { useState } from 'react';

const ConsultasContainer = () =>{
    const page = "Consultas";


    return(
        <Consultas page = { page }/>
    )
};

export default ConsultasContainer;