import React from 'react';
import Home from '../pages/home';
import { useState } from 'react';

const HomeContainer = () =>{
    const page = "Dashboard";


    return(
        <Home page = { page }/>
    )
};

export default HomeContainer;