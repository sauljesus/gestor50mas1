import React from 'react';
import TeacherForm from '../pages/teacherForm';
import { useState } from 'react';

const TeacherFormContainer = () =>{
    const page = "Registrar Profesor";


    return(
        <TeacherForm page = { page }/>
    )
};

export default TeacherFormContainer;