import React from 'react';
import DirectorForm from '../pages/directorForm';
import { useState } from 'react';

const DirectorFormContainer = () =>{
    const page = "Ingreso Manual";


    return(
        <DirectorForm page = { page }/>
    )
};

export default DirectorFormContainer;