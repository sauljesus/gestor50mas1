import React from 'react';
import UserForm from '../pages/userForm';
import { useState } from 'react';

const UserFormContainer = () =>{
    const page = "Registrar Usuarios";


    return(
        <UserForm page = { page }/>
    )
};

export default UserFormContainer;