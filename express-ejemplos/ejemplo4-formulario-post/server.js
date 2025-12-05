const express = require('express');
const path = require('path');
const app = express();
const PORT = 3004;

// Middleware para leer datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/procesar', (req, res) => {
  const nombre = req.body.nombre || 'Sin nombre';
  res.send(`<h1>Formulario recibido</h1><p>Hola, ${nombre}. Gracias por enviar el formulario.</p>`);
});

app.listen(PORT, () => {
  console.log(`Ejemplo 4 escuchando en http://localhost:${PORT}`);
});
