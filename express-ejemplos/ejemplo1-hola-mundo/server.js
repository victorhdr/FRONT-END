const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware para servir archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: devuelve index.html automáticamente desde public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ejemplo 1 escuchando en http://localhost:${PORT}`);
});
