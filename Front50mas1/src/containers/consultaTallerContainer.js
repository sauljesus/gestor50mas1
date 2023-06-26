import React from 'react';
import ConsultaTaller from '../pages/consultaTaller';
import { useState } from 'react';

const ConsultaTallerContainer = () =>{
    const page = "Consultas";


    return(
        <ConsultaTaller page = { page }/>
    )
};

export default ConsultaTallerContainer;