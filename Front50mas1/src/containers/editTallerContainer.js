import React from 'react';
import EditTaller from '../pages/editTaller';
import { useState } from 'react';

const EditTallerContainer = (boleta) =>{
    const page = "Consultas";


    return(
        <EditTaller page = { page } />
    )
};

export default EditTallerContainer;