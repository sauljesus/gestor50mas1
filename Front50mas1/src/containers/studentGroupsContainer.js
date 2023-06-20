import React from 'react';
import StudentGroups from '../pages/alum/misGrupos';
import { useState } from 'react';

const StudentGroupsContainer = () =>{
    const page = "Mis Grupos";


    return(
        <StudentGroups page = { page }/>
    )
};

export default StudentGroupsContainer;