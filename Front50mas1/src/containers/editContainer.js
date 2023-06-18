import React from 'react';
import Edit from '../pages/edit';
import { useState } from 'react';

const EditContainer = (boleta) =>{
    const page = "Consultas";


    return(
        <Edit page = { page } />
    )
};

export default EditContainer;