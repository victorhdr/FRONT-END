const express = require("express");
const app = express();
const PORT = 3007;

// -----------------------------
// Middleware global de logging
// -----------------------------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware para leer body de POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static("public"));

// -----------------------------
// API GET que devuelve JSON
// -----------------------------
app.get("/api/saludo", (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({
      error: "Debes enviar el parámetro 'nombre'"
    });
  }

  res.json({
    mensaje: `Hola ${nombre}, bienvenido a la API unificada 👋`,
    longitud: nombre.length
  });
});

// -----------------------------
// API POST que procesa formulario
// -----------------------------
app.post("/api/edad", (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    return res.status(400).json({
      error: "Faltan datos: nombre y edad son obligatorios"
    });
  }

  if (isNaN(edad)) {
    return res.status(400).json({
      error: "La edad debe ser un número válido"
    });
  }

  const mayor = edad >= 18;

  res.json({
    nombre,
    edad,
    mensaje: mayor
      ? "Eres mayor de edad. Puedes continuar."
      : "Eres menor de edad. Acceso limitado."
  });
});

// -----------------------------
app.listen(PORT, () =>
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
);
