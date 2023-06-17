import React from 'react';
import CourseForm from '../pages/courseForm';
import { useState } from 'react';

const CourseFormContainer = () =>{
    const page = "Nuevo Curso";


    return(
        <CourseForm page = { page }/>
    )
};

export default CourseFormContainer;