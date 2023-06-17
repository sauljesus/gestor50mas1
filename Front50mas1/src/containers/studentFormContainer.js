import React from 'react';
import StudentForm from '../pages/studentForm';
import { useState } from 'react';

const StudentFormContainer = () =>{
    const page = "Registrar Estudiante";


    return(
        <StudentForm page = { page }/>
    )
};

export default StudentFormContainer;