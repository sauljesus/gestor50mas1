import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Svg } from "@react-pdf/renderer";
import LOGO from "../images/50+1logo.png";
import { getdireccion } from '../helpers/direccion';
//${getdireccion()}

const DocuPDF = ({data, folio}) => {
    let canvas = document.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    
    const styles = StyleSheet.create({
        page: {
            padding: '20px',
        },
        container: {
            width: '100%',
            height: '100%',
            padding: '10px',
            border: '5px solid #4b0683'
        },
        titleContainer: {
            flexGrow: 1,
            flexDirection: 'row',
            margin: '10px 0 0 0'
        },
        title: {
            margin: 20,
            width: '70%',
            fontSize: 45,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#a781d6',
            textTransform: 'uppercase',
        },
        fillLOGO: {
            width: '25%',
            height: '100px',
            backgroundColor: '',
            paddingLeft: '30px'
        },
        logo: {
            width: '100px',
            height: '100px',

        },
        body: {
            width: '100%',
            height: '100%',
        },
        row1: {
            marginTop: '40px'
        },
        text: {
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '0 20px 0 20px'

        },
        text1: {
            width: '100%',
            justifyContent: 'center',
            textAlign: 'justify',
            padding: '0 20px 0 20px'

        },
        row2: {
            marginTop: '40px'
        },
        text2: {
            width: '100%',
            fontSize: '30',
            // fontWeight: 'bold',
            textDecoration: 'underline',
            textAlign: 'center',
            justifyContent: 'center',
        },
        text3: {
            fontSize: '20',
            fontWeight: 'bold',
            color: '#4b0683',
            textTransform: 'uppercase',
        },
        text4: {
            fontSize: '20',
            fontWeight: 'bold',
        },
        row3: {
            width: '100%',
            height: '40%',
            padding: '10px',
            flexGrow: 1,
            flexDirection: 'row',
        },
        row4: {
            width: '100%',
            height: '8%',
        },
        firma: {
            width: '70%',
            display: 'flex',
            fontSize: '12px',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        qr: {
            width: '30%',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        qrImg:{
            width: '120px',
            height: '120px',
        },
        textR1: {
            width: '60%',
            textAlign: 'center',
            padding: '0 20px 0 20px',
            borderTop: '1px solid #000',
        },
        textR2: {
            jwidth: '60%',
            textAlign: 'center',
            padding: '0 20px 0 20px',
            marginBottom: '10px'
        },
        text5: {
            fontSize: '10',
            textAlign: 'right',
            paddingRight: '50px'
        },
    });

    return (
        <Document title={`Constancia `+folio}>
            <Page
                size="A4"
                orientation="landscape"
                style={styles.page}
            >
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <View style={styles.fillLOGO}>
                            <Image
                                style={styles.logo}
                                src={LOGO}
                            />
                        </View>
                        <Text style={styles.title}>
                            Colectiva 50 + 1 
                        </Text>
                        <View style={styles.fillLOGO}></View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.row1}>
                            <Text style={styles.text}>
                                Se otorga la presente constancia a:
                            </Text>
                        </View>
                        <View style={styles.row2}>
                            <Text style={styles.text2}>
                                {data.apellidoPaterno} {data.apellidoMaterno} {data.nombre}
                            </Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.text1}>
                                Por haber concluido satisfactoriamente el curso de <Text style={styles.text3}>{data.taller}</Text>, cumpliendo satisfactoriamente con la asistencia al curso y las actividades asignadas. El presente curso se llevó acabo en el periodo <Text style={styles.text4}>{data.periodo}</Text> obteniendo una calificación de <Text style={styles.text4}>{data.calificacion}</Text>.
                            </Text>
                        </View>
                        <View style={styles.row3}>
                            <View style={styles.firma}>
                                <Text style={styles.textR1}>
                                    M. en C. Juan Perez
                                </Text>
                                <Text style={styles.textR2}>
                                    Director de la colectiva 50 + 1
                                </Text>
                            </View>
                            <View style={styles.qr}>
                                <Image src={image}></Image>
                            </View>
                        </View>
                        <View style={styles.row4}>
                            <Text style={styles.text5}>
                                NOTA: ESTE DOCUMENTO CARECE DE VALIDEZ SIN QR, FIRMA NI SELLO OFICIAL
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default DocuPDF;