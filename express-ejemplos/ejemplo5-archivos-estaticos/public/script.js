// script.js para Ejemplo 5
document.addEventListener('DOMContentLoaded', () => {
  const p = document.getElementById('parrafo');
  const btn = document.getElementById('btnCambiar');

  btn.addEventListener('click', () => {
    p.textContent = '¡El texto ha cambiado gracias a JavaScript!';
  });
});
