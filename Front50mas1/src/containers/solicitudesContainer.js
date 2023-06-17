import React from 'react';
import Solicitudes from '../pages/solicitudes';
import { useState } from 'react';

const SolicitudesContainer = () =>{
    const page = "Solicitudes";


    return(
        <Solicitudes page = { page }/>
    )
};

export default SolicitudesContainer;