const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta que suma a y b de la query: /suma?a=1&b=2
app.get('/suma', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send('Por favor, envía parámetros numéricos "a" y "b" en la query.');
  }

  const resultado = a + b;
  res.send(`La suma de ${a} + ${b} es ${resultado}.`);
});

app.listen(PORT, () => {
  console.log(`Ejemplo 3 escuchando en http://localhost:${PORT}`);
});
