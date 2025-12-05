// script.js para Ejemplo 3
document.addEventListener('DOMContentLoaded', () => {
  const inputA = document.getElementById('a');
  const inputB = document.getElementById('b');
  const btn = document.getElementById('btnSuma');
  const resultado = document.getElementById('resultado');

  btn.addEventListener('click', async () => {
    const a = inputA.value;
    const b = inputB.value;

    const url = `/suma?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;

    try {
      const res = await fetch(url);
      const text = await res.text();
      resultado.textContent = text;
    } catch (err) {
      console.error(err);
      resultado.textContent = 'Error realizando la petición.';
    }
  });
});
