// script.js para Ejemplo 2
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('nombre');
  const btn = document.getElementById('btnIr');

  btn.addEventListener('click', () => {
    const valor = input.value.trim() || 'Anonimo';
    // Redirigimos a la ruta /saludo/:nombre
    window.location.href = `/saludo/${encodeURIComponent(valor)}`;
  });
});
