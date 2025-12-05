const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

app.use(express.static(path.join(__dirname, 'public')));

// Página principal con formulario de nombre
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta con parámetro de ruta
app.get('/saludo/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.send(`<h1>Hola, ${nombre}!</h1><p>Ruta generada con parámetro de ruta en Express.</p>`);
});

app.listen(PORT, () => {
  console.log(`Ejemplo 2 escuchando en http://localhost:${PORT}`);
});
