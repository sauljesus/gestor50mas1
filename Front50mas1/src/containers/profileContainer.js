import React from 'react';
import Profile from '../pages/profile';
import { useState } from 'react';

const ProfileContainer = () =>{
    const page2 = "Perfil";
    const page = "Dashboard";


    return(
        <Profile page = { page } page2 = { page2 } />
    )
};

export default ProfileContainer;