const express = require('express');
const cors = require('cors');
const MasiveRoute = require('../routes/ExcelRoute');
const AlumnRoute = require('../routes/alumnoRoute');
const UserRoute = require('../routes/usuariosRoute');
const CertRoute = require('../routes/CertificadoRoute');
const TallerRoute = require('../routes/TalleresRoute');
const EstadisticasRoute = require('../routes/estadisticasRoute'); //
const AuthRoute = require('../routes/AuthRoute');
const TalleresAlumnoRoute = require('../routes/TalleresAlumnoRoute');
const http  = require('http');
const db = require('../config/Database');
class Server {
    constructor(){
        this.app =express();
        this.port=process.env.PORT || 5000;
        //this.app.set('port',process.env.PORT || 5000);
        this.conectarDB();
        //middlewares
        this.middlewares();
        //rutas 
        this.routes();
    }
    // conexion a bd
    async conectarDB() {
        //await db();  
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

    middlewares(){
        this.app.use(cors({
            credentials: true,
            origin: 'http://ttrcincuentamasuno.eastus.cloudapp.azure.com:3000'
        }));
        this.app.use( express.json() );
    }
    routes(){
        this.app.use(AlumnRoute);
        this.app.use(UserRoute);
        this.app.use(AuthRoute);
        this.app.use(MasiveRoute);
        this.app.use(CertRoute);
        this.app.use(TallerRoute);
        this.app.use(EstadisticasRoute);
        this.app.use(TalleresAlumnoRoute);
    }
    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en el puerto', this.port);
          }) 
    }
}
module.exports = Server;