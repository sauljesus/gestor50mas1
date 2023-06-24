import React from 'react';
import TallerForm from '../pages/tallerForm';
import { useState } from 'react';

const CourseFormContainer = () =>{
    const page = "Ingreso Manual";


    return(
        <TallerForm page = { page }/>
    )
};

export default CourseFormContainer;