/* products.js
   Práctica 2: dinamismo con JavaScript y el DOM.
   - Usa let/const
   - Arrays/objetos
   - createElement, append
   - addEventListener (click, change)
   - event.target, classList.toggle()
*/

// Datos iniciales: array de objetos (ejemplo)
const products = [
  { id: cryptoRandomId(), name: "Auriculares Bluetooth", price: 29.99, category: "electronica", img: "img/headphones.jpg", desc: "Auriculares cómodos y con buena batería." },
  { id: cryptoRandomId(), name: "Camiseta logo", price: 14.5, category: "ropa", img: "img/tshirt.jpg", desc: "Camiseta de algodón con el logo del proyecto." },
  { id: cryptoRandomId(), name: "Café molido", price: 6.2, category: "alimentacion", img: "img/coffee.jpg", desc: "Café arábica, 250g." }
];

// Utilidad: genera un id simple (no determinista en todos los navegadores, pero sirve aquí)
function cryptoRandomId() {
  // retorna una cadena corta; usa crypto si está disponible
  if (window.crypto && crypto.getRandomValues) {
    return 'p-' + crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  }
  return 'p-' + Math.floor(Math.random() * Date.now()).toString(36);
}

/* -------------------------
   SELECTORES DEL DOM
   ------------------------- */
const form = document.getElementById('add-product-form');
const listEl = document.getElementById('products-list');
const template = document.getElementById('product-template');
const filterSelect = document.getElementById('filter-category');
const summaryEl = document.getElementById('summary');

/* -------------------------
   FUNCIONES (buena práctica)
   ------------------------- */

// Añadir un producto al array y devolver el nuevo objeto
const addProduct = (name, price, category) => {
  const prod = {
    id: cryptoRandomId(),
    name: String(name).trim(),
    price: Number(price),
    category,
    desc: "Descripción generada automáticamente.",
    img: "" // imagen vacía por defecto
  };
  products.push(prod);
  return prod;
};

// Elimina producto por id — retorna true si se eliminó
const removeProductById = (id) => {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
};

// Obtener productos filtrados por categoría
const getFilteredProducts = (category = "all") => {
  if (category === "all") return products.slice(); // copia
  return products.filter(p => p.category === category);
};

// Suma total de precios
const totalPrice = (list) => {
  // suma digit-by-digit no necesaria aquí; usar reduce con Number seguro
  return list.reduce((acc, p) => acc + Number(p.price || 0), 0);
};

/* -------------------------
   RENDER: crea elementos DOM con createElement y append
   ------------------------- */

const renderProducts = (category = "all") => {
  // Limpia la lista
  listEl.innerHTML = "";

  const toRender = getFilteredProducts(category);

  // Evidencia 1: createElement + append + modificar textContent/atributos
  toRender.forEach(product => {
    const tpl = template.content.cloneNode(true);
    const li = tpl.querySelector('li.product');

    li.setAttribute('data-id', product.id);

    // Nombre, precio, categoría
    const nameEl = li.querySelector('.product-name');
    const priceEl = li.querySelector('.product-price');
    const catEl = li.querySelector('.product-category');

    nameEl.textContent = product.name; // modificar textContent
    priceEl.textContent = `${product.price.toFixed(2)} €`;
    catEl.textContent = `(${product.category})`;

    // Detalles
    const descEl = li.querySelector('.product-desc');
    descEl.textContent = product.desc;

    // Imagen (modifica atributo src/alt)
    const imgEl = li.querySelector('.product-image');
    if (product.img) {
      imgEl.src = product.img;         // cambiar atributo src
      imgEl.alt = product.name;       // cambiar atributo alt
      imgEl.hidden = false;
    } else {
      imgEl.hidden = true;
    }

    // Añadir el nodo al DOM
    listEl.appendChild(li);
  });

  // Actualizar sumario
  summaryEl.textContent = `${toRender.length} producto(s) — Total precio: ${totalPrice(toRender).toFixed(2)} €`;
};

/* -------------------------
   EVENTOS: addEventListener, event delegation, click/change
   ------------------------- */

// Submit del formulario (evento 'submit' y uso de event.target)
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = document.getElementById('p-name').value;
  const price = document.getElementById('p-price').value;
  const category = document.getElementById('p-category').value;

  // Validaciones básicas
  if (!name.trim() || Number(price) <= 0) {
    alert('Por favor, introduce un nombre y un precio válido.');
    return;
  }

  // Añadir producto (función con retorno)
  const newProd = addProduct(name, Number(price), category);

  // Evidencia: creación dinámica ya gestionada en renderProducts
  renderProducts(filterSelect.value);

  // Limpiar formulario usando event.target
  (ev.target).reset();

  // Poner foco en el nombre
  document.getElementById('p-name').focus();

  // Mensaje breve en consola (buena práctica para debug)
  console.log('Producto añadido:', newProd);
});

// Filter change (evento 'change')
filterSelect.addEventListener('change', (ev) => {
  const category = ev.target.value;
  renderProducts(category);
});

// Delegación de eventos en la lista (evidencia de uso de event.target)
listEl.addEventListener('click', (ev) => {
  const target = ev.target;

  // Si clic en Eliminar
  if (target.classList.contains('btn-delete')) {
    // buscamos el li padre
    const li = target.closest('li.product');
    const id = li && li.dataset.id;
    if (!id) return;
    const confirmed = confirm('¿Eliminar este producto?');
    if (!confirmed) return;
    const removed = removeProductById(id);
    if (removed) {
      // eliminar nodo del DOM (evidencia de eliminar elemento)
      li.remove();
      // actualizar sumario
      renderProducts(filterSelect.value);
    }
    return;
  }

  // Si clic en Toggle details
  if (target.classList.contains('btn-toggle-details')) {
    const li = target.closest('li.product');
    if (!li) return;
    const details = li.querySelector('.product-details');
    // Uso de classList.toggle para mostrar/ocultar
    details.classList.toggle('hidden');
    return;
  }

  // Si clic en el nombre (ejemplo extra: editar inline)
  if (target.classList.contains('product-name')) {
    const li = target.closest('li.product');
    const id = li && li.dataset.id;
    if (!id) return;
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    const nuevoNombre = prompt('Editar nombre del producto:', prod.name);
    if (nuevoNombre && nuevoNombre.trim()) {
      prod.name = nuevoNombre.trim();
      // actualizar solo ese texto en DOM (evidencia textContent)
      target.textContent = prod.name;
      summaryEl.textContent = `${getFilteredProducts(filterSelect.value).length} producto(s) — Total precio: ${totalPrice(getFilteredProducts(filterSelect.value)).toFixed(2)} €`;
    }
  }
});

/* -------------------------
   INIT: render inicial
   ------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Render inicial
  renderProducts();

  // Ejemplo de uso de event.target en change (otro control posible)
  // (ya hemos usado filterSelect arriba)
});
