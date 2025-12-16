import { CartModel } from "./CartModel.js";
import { CartView } from "./CartView.js";

// Importar logger de actividad REAL
import { logActivity } from "./activityLogger.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar datos del carrito (localStorage o vacío)
  CartModel.init();

  // ------------------------------------------------------------
  // FUNCIÓN NUEVA → Refrescar vista + contador navbar
  // ------------------------------------------------------------
  const refresh = () => {
    const items = CartModel.getItems();
    const summary = CartModel.getSummary();

    // Actualizar panel / sidebar del carrito (si existe en la página actual)
    CartView.render(items, summary);

    // NUEVO: actualizar contador de la navbar
    updateNavbarCount(summary.totalItems);
  };

  refresh();

  // ------------------------------------------------------------
  // FUNCIÓN NUEVA → Actualiza el contador rojo (badge) del navbar
  // ------------------------------------------------------------
  function updateNavbarCount(count) {
    const badge = document.getElementById("cart-count");
    if (!badge) return; // La página puede no tener el contador

    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }

  // ------------------------------------------------------------
  // 1) Añadir items desde botones clásicos (.btn-add-cart)
  // ------------------------------------------------------------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    const id = parseInt(btn.dataset.id, 10);
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    CartModel.addItem({ id, name, price });

    // REGISTRO DE ACTIVIDAD REAL
    logActivity("add_to_cart", `Añadió ${name}`, { id, price });

    refresh();
  });

  // ------------------------------------------------------------
  // 2) Vaciar carrito
  // ------------------------------------------------------------
  CartView.bindClearCart(() => {
    CartModel.clear();

    // REGISTRO DE ACTIVIDAD
    logActivity("clear_cart", "Vació el carrito completo");

    refresh();
  });

  // ------------------------------------------------------------
  // 3) Eliminar ítem individual
  // ------------------------------------------------------------
  CartView.bindRemoveItem((id) => {
    const item = CartModel.cart.find(i => i.id === id);

    // Registrar antes de eliminar
    if (item) {
      logActivity(
        "remove_item",
        `Eliminó ${item.name} del carrito`,
        { id: item.id, quantity: item.quantity }
      );
    }

    CartModel.removeItem(id);
    refresh();
  });

  // ============================================================
  // 4) NUEVO → ESCUCHAR EVENTO DE PRODUCTOS PERSONALIZADOS
  // ============================================================
  // El constructor de productos envía un CustomEvent("add-to-cart")
  // con un item ya formado. Solo tenemos que añadirlo al modelo.
  // Esto mantiene bajo acoplamiento entre módulos (MVP limpio).
  document.addEventListener("add-to-cart", (e) => {
    const item = e.detail; // { id, name, price }
    
    // Enviar al carrito
    CartModel.addItem(item);

    // REGISTRO DE ACTIVIDAD REAL
    logActivity(
      "add_custom_product",
      `Añadió producto personalizado: ${item.name}`,
      item
    );
    
    // Refrescar vista + navbar
    refresh();
  });

});
