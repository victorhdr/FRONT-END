const express = require("express");
const app = express();
const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// Usuario simulado
const USER = {
  email: "victor@example.com",
  password: "1234",
  token: "token_victor_123"
};

// LOGIN (POST)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son obligatorios" });
  }

  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  res.json({
    token: USER.token,
    usuario: "Víctor"
  });
});

// ZONA PRIVADA (GET)
app.get("/api/privado", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta token" });
  }

  const token = auth.split(" ")[1];

  if (token !== USER.token) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }

  res.json({
    mensaje: "Acceso concedido a datos privados",
    secreto: "Los gatos no maúllan entre ellos, solo a humanos 😺"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Auth funcionando en http://localhost:${PORT}`);
});
