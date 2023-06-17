import React from 'react';
import Grupo from '../pages/grupo';
import { useState } from 'react';

const GrupoContainer = () =>{
    const page = "Mis grupos";


    return(
        <Grupo page = { page } />
    )
};

export default GrupoContainer;