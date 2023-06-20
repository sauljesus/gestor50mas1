import React from 'react';
import Inscripciones from '../pages/inscripciones';
import { useState } from 'react';

const InscripcionesContainer = () =>{
    const page = "Inscripciones";


    return(
        <Inscripciones page = { page }/>
    )
};

export default InscripcionesContainer;