const express = require('express');
const edit = express();

edit.use(express.json());

// Ruta para actualizar un alumno
edit.put('/api/alumnos/:id', (req, res) => {
  const { id } = req.params;
  const alumnoData = req.body;

  // Lógica para actualizar el registro en la base de datos (ejemplo con MariaDB)
  // ...

  // Enviar respuesta
  res.json({ message: 'Registro actualizado exitosamente' });
});


module.exports = edit;