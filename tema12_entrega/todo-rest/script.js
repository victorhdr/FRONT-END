const lista = document.getElementById("lista");
const input = document.getElementById("tareaInput");
const btn = document.getElementById("btnAñadir");

const cargarTareas = async () => {
  const res = await fetch("/api/tareas");
  const datos = await res.json();
  pintar(datos);
};

const pintar = (tareas) => {
  lista.innerHTML = "";
  tareas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.texto;

    const borrar = document.createElement("span");
    borrar.textContent = "❌";
    borrar.className = "delete";
    borrar.onclick = () => eliminar(t.id);

    li.appendChild(borrar);
    lista.appendChild(li);
  });
};

btn.addEventListener("click", async () => {
  const texto = input.value;
  if (!texto.trim()) return;

  await fetch("/api/tareas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });

  input.value = "";
  cargarTareas();
});

const eliminar = async (id) => {
  await fetch(`/api/tareas/${id}`, { method: "DELETE" });
  cargarTareas();
};

cargarTareas();
