const jose = require('jose');

const generarJWTAlumno = async(nombre = '',apellidoPaterno='',correo='') =>{
    const jwtConstructor = new jose.SignJWT({ nombre, apellidoPaterno, correo });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({alg:"HS256",typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    return jwt;
} 
const generarJWTUsuario = async(nombre = '',apellidoPaterno='',correo='') =>{
    const jwtConstructor = new jose.SignJWT({ nombre, apellidoPaterno , correo });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({alg:"HS256",typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    return jwt;
} 

module.exports = {
    generarJWTAlumno,
    generarJWTUsuario
}