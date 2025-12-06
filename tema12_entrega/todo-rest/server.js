const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

// SERVIR ARCHIVOS ESTÁTICOS (soluciona el error)
app.use(express.static(__dirname));

// almacenamiento en memoria
let tareas = [];

// GET — listar tareas
app.get("/api/tareas", (req, res) => {
  res.json(tareas);
});

// POST — crear tarea
app.post("/api/tareas", (req, res) => {
  const { texto } = req.body;
  if (!texto || texto.trim() === "") {
    return res.status(400).json({ error: "El texto es obligatorio" });
  }

  const nueva = { id: Date.now(), texto };
  tareas.push(nueva);

  res.json(nueva);
});

// DELETE — borrar tarea
app.delete("/api/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter((t) => t.id !== id);
  res.json({ ok: true });
});

app.listen(PORT, () =>
  console.log(`API funcionando en http://localhost:${PORT}`)
);
