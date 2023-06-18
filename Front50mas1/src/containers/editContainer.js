import React from 'react';
import Edit from '../pages/edit';
import { useState } from 'react';

const EditContainer = (boleta) =>{
    const page2 = "Perfil";
    const page = "Dashboard";


    return(
        <Edit page = { page } page2 = { page2 } />
    )
};

export default EditContainer;