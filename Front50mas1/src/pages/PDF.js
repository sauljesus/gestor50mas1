import React, { useState, useEffect } from 'react';
import '../styles/solicitudes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocuPDF from './docuPDF';
import { PDFViewer } from '@react-pdf/renderer';
import axios from 'axios';
import { QRCodeCanvas } from "qrcode.react";
import {useLocation} from 'react-router-dom';

const PDF = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
        
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:5000/certificado/${location.state.folio}`)
          .then(response => {
            console.log(response.data[0]);
            setData(response.data[0]);
          })
          .catch(error => {
            console.error(error);
          });
      };

    return (

        <div className='fullscreen of-y-hidden'>
            <div className='qr'>
                <QRCodeCanvas
                    id="qrCode"
                    value={"http:localhost:3000/verifica/" + location.state.folio}
                    size={300}
                    fgColor='#4b0683'
                    level={"H"}
                />
            </div>
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <DocuPDF data={data} folio={location.state.folio}/>
                {/* <DocuPDF n={nombre}></DocuPDF> */}
            </PDFViewer>
        </div>
    );
};


export default PDF;