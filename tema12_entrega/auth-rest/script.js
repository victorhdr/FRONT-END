const loginSection = document.getElementById("loginSection");
const privateSection = document.getElementById("privateSection");
const loginError = document.getElementById("loginError");
const privadoResultado = document.getElementById("privadoResultado");

const token = localStorage.getItem("token");
if (token) mostrarPrivado();

document.getElementById("btnLogin").addEventListener("click", async () => {
  loginError.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.error;
      return;
    }

    localStorage.setItem("token", data.token);
    mostrarPrivado();

  } catch {
    loginError.textContent = "Error de conexión con el servidor.";
  }
});

document.getElementById("btnPrivado").addEventListener("click", async () => {
  privadoResultado.textContent = "Cargando...";

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("/api/privado", {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();

    if (!res.ok) {
      privadoResultado.textContent = "ERROR: " + data.error;
      return;
    }

    privadoResultado.textContent = JSON.stringify(data, null, 2);

  } catch {
    privadoResultado.textContent = "Error de conexión.";
  }
});

document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("token");
  mostrarLogin();
});

function mostrarPrivado() {
  loginSection.classList.add("hidden");
  privateSection.classList.remove("hidden");
  privadoResultado.textContent = "";
}

function mostrarLogin() {
  privateSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}
