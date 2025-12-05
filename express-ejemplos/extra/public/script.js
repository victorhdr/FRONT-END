// ----------------------------------
// GET /api/saludo
// ----------------------------------
document.getElementById("btnSaludo").addEventListener("click", async () => {
  const salida = document.getElementById("resultadoSaludo");
  salida.classList.remove("error"); // limpia errores anteriores

  const nombre = document.getElementById("nombreInput").value;

  try {
    const res = await fetch(`/api/saludo?nombre=${encodeURIComponent(nombre)}`);

    // Si el servidor devuelve error → activar estado de error
    if (!res.ok) {
      salida.classList.add("error");
    }

    const data = await res.json();
    salida.textContent = JSON.stringify(data, null, 2);

  } catch (err) {
    salida.classList.add("error");
    salida.textContent = "Error de red o conexión con el servidor.";
  }
});

// ----------------------------------
// POST /api/edad
// ----------------------------------
document.getElementById("formEdad").addEventListener("submit", async (e) => {
  e.preventDefault();

  const salida = document.getElementById("resultadoEdad");
  salida.classList.remove("error");

  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData);

  try {
    const res = await fetch("/api/edad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!res.ok) {
      salida.classList.add("error");
    }

    const data = await res.json();
    salida.textContent = JSON.stringify(data, null, 2);

  } catch (err) {
    salida.classList.add("error");
    salida.textContent = "Error de red al enviar datos.";
  }
});
