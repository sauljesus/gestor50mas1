import React from 'react';
import Statisticsalum from '../pages/alum/statistics';
import { useState } from 'react';

const StatisticsContainer = () =>{
    const page = "Estadisticas";


    return(
        <Statisticsalum page = { page }/>
    )
};

export default StatisticsContainer;