import React from 'react';
import { useState } from 'react';
import EditProfesor from '../pages/editProfesor';

const EditProfesorContainer = (boleta) =>{
    const page = "Consultas";


    return(
        <EditProfesor page = { page } />
    )
};

export default EditProfesorContainer;