const express = require('express');
const path = require('path');
const app = express();
const puerto = 3000;

app.use(express.json());

// Servimos los ficheros estáticos desde ./public
const dir_raiz = path.join(__dirname, 'public');
app.use(express.static(dir_raiz));

// Servicio REST: /api/dobla/:num
app.get('/api/dobla/:num', (req, res) => {
  let num = Number(req.params.num);
  if (Number.isNaN(num)) {
    // Ejemplo de código de estado diferente de 200
    res.status(400).json({ error: 'El parámetro num debe ser numérico' });
    return;
  }
  let resultado = num * 2;
  res.json(resultado);
});

app.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`);
  console.log('Pulsa Ctrl+C para detener el servidor.');
});