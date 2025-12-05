// script.js para Ejemplo 6
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnCargar');
  const lista = document.getElementById('listaFrutas');

  btn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/frutas');
      const frutas = await res.json();

      lista.innerHTML = '';
      frutas.forEach(fruta => {
        const li = document.createElement('li');
        li.textContent = fruta.nombre;
        lista.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      lista.innerHTML = '<li>Error al cargar frutas</li>';
    }
  });
});
