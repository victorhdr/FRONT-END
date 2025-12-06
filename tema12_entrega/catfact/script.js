document.getElementById("btn").addEventListener("click", async () => {
  const salida = document.getElementById("resultado");
  salida.textContent = "Cargando...";
  salida.classList.remove("error");

  try {
    const res = await fetch("https://catfact.ninja/fact");

    if (!res.ok) {
      salida.classList.add("error");
      salida.textContent = "Error al obtener el dato.";
      return;
    }

    const data = await res.json();
    salida.textContent = `Dato curioso:\n${data.fact}`;
  } catch (e) {
    salida.classList.add("error");
    salida.textContent = "Error de conexión con la API.";
  }
});
