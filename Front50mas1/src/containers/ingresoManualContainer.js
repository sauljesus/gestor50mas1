import React from 'react';
import { useState } from 'react';
import IngresoManual from '../pages/ingresoManual';

const IngresoManualContainer = () =>{
    const page = "Ingreso Manual";

    return(
        <IngresoManual page = { page }/>
    )
};

export default IngresoManualContainer;