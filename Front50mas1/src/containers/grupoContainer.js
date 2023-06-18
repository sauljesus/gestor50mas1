import React from 'react';
import Grupo from '../pages/grupo';
import { useState } from 'react';

const GrupoContainer = () =>{
    const page2 = "Mis grupos";
    const page = "Grupo";


    return(
        <Grupo page = { page } page2 = { page2 } />
    )
};

export default GrupoContainer;