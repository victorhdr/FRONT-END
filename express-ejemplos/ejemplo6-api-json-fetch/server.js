const express = require('express');
const path = require('path');
const app = express();
const PORT = 3006;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API que devuelve JSON
app.get('/api/frutas', (req, res) => {
  const frutas = [
    { id: 1, nombre: 'Manzana' },
    { id: 2, nombre: 'Banana' },
    { id: 3, nombre: 'Naranja' }
  ];
  res.json(frutas);
});

app.listen(PORT, () => {
  console.log(`Ejemplo 6 escuchando en http://localhost:${PORT}`);
});
