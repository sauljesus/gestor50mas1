import React from 'react';
import MisGrupos from '../pages/misGrupos';
import { useState } from 'react';

const MisGruposContainer = (boleta) =>{
    const page2 = "Mis grupos";
    const page = "Grupos";


    return(
        <MisGrupos page = { page } page2 = { page2 } boleta = { boleta } />
    )
};

export default MisGruposContainer;