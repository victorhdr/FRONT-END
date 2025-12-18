// Generador de actividad de prueba para varios días
function generarActividadPrueba() {

  const STORAGE_KEY = "userActivityLog";
  const saved = localStorage.getItem(STORAGE_KEY);
  const log = saved ? JSON.parse(saved) : [];

  function fechaDiasAtras(dias, hora = "12:00:00") {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha.toISOString().split("T")[0] + "T" + hora + ".000Z";
  }

  const eventos = [
    {
      type: "search",
      message: "Buscó 'cuadernos'",
      data: { query: "cuadernos" },
      timestamp: fechaDiasAtras(5, "10:30:00")
    },
    {
      type: "purchase",
      message: "Compró Taza Vintage",
      data: { price: 12.90 },
      timestamp: fechaDiasAtras(4, "09:15:00")
    },
    {
      type: "favorite",
      message: "Marcó como favorito 'Mochila Urbana'",
      data: {},
      timestamp: fechaDiasAtras(3, "18:20:00")
    },
    {
      type: "add_to_cart",
      message: "Añadió Libreta Premium",
      data: { price: 4.99 },
      timestamp: fechaDiasAtras(3, "18:22:00")
    },
    {
      type: "search",
      message: "Buscó 'bolígrafos'",
      data: {},
      timestamp: fechaDiasAtras(2, "08:05:00")
    },
    {
      type: "purchase",
      message: "Compró Bolígrafo Azul",
      data: { price: 1.50 },
      timestamp: fechaDiasAtras(1, "14:45:00")
    },
    {
      type: "add_to_cart_custom",
      message: "Añadió producto personalizado (camiseta roja)",
      data: { price: 19.99 },
      timestamp: fechaDiasAtras(1, "15:00:00")
    },
    {
      type: "search",
      message: "Buscó 'regalos navidad'",
      data: {},
      timestamp: fechaDiasAtras(0, "11:30:00")
    }
  ];

  eventos.forEach(ev => {
    log.unshift({
      id: Date.now() + Math.floor(Math.random() * 10000),
      type: ev.type,
      message: ev.message,
      data: ev.data,
      timestamp: ev.timestamp
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));

  console.log("✔ Actividad de prueba generada correctamente.");
  console.log("➡ Recarga el panel para ver la gráfica actualizada.");
}

// --------------------------------------------
//  IMPORTANTE: exponer la función globalmente
// --------------------------------------------
window.generarActividadPrueba = generarActividadPrueba;
