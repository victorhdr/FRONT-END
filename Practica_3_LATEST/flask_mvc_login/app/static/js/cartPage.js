import { CartModel } from "./CartModel.js";

/**
 * cartPage.js
 * -------------------------------------------------------------
 * Controlador específico para la página /carrito.
 * 
 * Esta página NO usa CartView porque aquí necesitamos una tabla
 * con botones (+ / − / eliminar). Este script:
 * 
 *   ✔ Renderiza la tabla del carrito manualmente
 *   ✔ Permite incrementar cantidad
 *   ✔ Permite disminuir cantidad
 *   ✔ Permite eliminar un producto
 *   ✔ Permite vaciar el carrito
 *   ✔ Actualiza el total de artículos y el total en €
 * 
 * Mantiene sincronización con localStorage mediante CartModel.
 */

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------------
  // Captura de elementos del DOM
  // -------------------------------------------------------------
  const tbody = document.getElementById("cart-table-body");
  const totalItemsEl = document.getElementById("carrito-total-items");
  const totalPriceEl = document.getElementById("carrito-total-price");
  const clearBtn = document.getElementById("carrito-clear");

  // -------------------------------------------------------------
  // Render principal de la tabla del carrito
  // -------------------------------------------------------------
  const render = () => {
    CartModel.init(); // recarga desde localStorage
    const items = CartModel.getItems();
    const summary = CartModel.getSummary();

    // Limpiar tabla antes de volver a pintarla
    tbody.innerHTML = "";

    // -----------------------------------------------------------
    // Crear filas dinámicamente para cada producto del carrito
    // -----------------------------------------------------------
    items.forEach(item => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>

        <td class="text-center">
          <!-- Botón para disminuir cantidad -->
          <button class="btn btn-sm btn-outline-secondary btn-dec" data-id="${item.id}">−</button>

          <!-- Cantidad actual -->
          <span class="mx-2">${item.quantity}</span>

          <!-- Botón para aumentar cantidad -->
          <button class="btn btn-sm btn-outline-secondary btn-inc" data-id="${item.id}">+</button>
        </td>

        <!-- Precio total del producto (unidad × cantidad) -->
        <td class="text-end fw-bold">${(item.price * item.quantity).toFixed(2)} €</td>

        <td class="text-end">
          <!-- Botón para eliminar completamente el producto -->
          <button class="btn btn-sm btn-danger btn-remove" data-id="${item.id}">✕</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // -----------------------------------------------------------
    // Actualizar resumen del carrito
    // -----------------------------------------------------------
    totalItemsEl.textContent = summary.totalItems;
    totalPriceEl.textContent = summary.totalPrice.toFixed(2) + " €";
  };

  // Render inicial al cargar la página
  render();

  // -------------------------------------------------------------
  // Delegación de eventos para la tabla
  // (incrementar, disminuir, eliminar)
  // -------------------------------------------------------------
  tbody.addEventListener("click", (e) => {

    // -------------------------
    // Caso 1: Incrementar cantidad
    // -------------------------
    const inc = e.target.closest(".btn-inc");
    if (inc) {
      const id = parseInt(inc.dataset.id);

      // addItem aumenta quantity si el ID ya existe
      CartModel.addItem({ id });
      render();
      return;
    }

    // -------------------------
    // Caso 2: Disminuir cantidad
    // -------------------------
    const dec = e.target.closest(".btn-dec");
    if (dec) {
      const id = parseInt(dec.dataset.id);
      const item = CartModel.cart.find(i => i.id === id);

      if (item.quantity > 1) {
        item.quantity--;       // reducir normalmente
      } else {
        CartModel.removeItem(id); // si llega a 1 → lo eliminamos
      }

      CartModel.save(); // guardar cambios en localStorage
      render();
      return;
    }

    // -------------------------
    // Caso 3: Eliminar producto
    // -------------------------
    const remove = e.target.closest(".btn-remove");
    if (remove) {
      const id = parseInt(remove.dataset.id);
      CartModel.removeItem(id);
      render();
      return;
    }
  });

  // -------------------------------------------------------------
  // Botón: vaciar carrito completo
  // -------------------------------------------------------------
  clearBtn.addEventListener("click", () => {
    CartModel.clear();
    render();
  });

});
