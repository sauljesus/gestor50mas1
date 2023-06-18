import React from 'react';
import Statistics from '../pages/statistics';
import { useState } from 'react';

const StatisticsContainer = () =>{
    const page = "Estadisticas";


    return(
        <Statistics page = { page }/>
    )
};

export default StatisticsContainer;