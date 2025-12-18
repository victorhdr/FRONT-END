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
  // 👉 Productos NORMALES (catálogo)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    // ⛔ Protección: evitar botones sin dataset válido
    if (!btn.dataset.id || !btn.dataset.name || !btn.dataset.price) return;

    const id = parseInt(btn.dataset.id, 10);
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    // Enviar al carrito
    CartModel.addItem({ id, name, price });

    // REGISTRO DE ACTIVIDAD REAL
    logActivity(
      "add_to_cart",
      `Añadió ${name}`,
      { id, price }
    );

    // Refrescar vista + navbar
    refresh();

    // Confirmación visual (mismo flujo que personalizados)
    document.dispatchEvent(
      new CustomEvent("cart-updated", {
        detail: { id, name, price }
      })
    );
  });

  // ------------------------------------------------------------
  // 2) Añadir PRODUCTOS PERSONALIZADOS (desde el constructor)
  // ------------------------------------------------------------
  document.addEventListener("add-to-cart", (e) => {
    const item = e.detail; // { id, name, price, quantity, detailsText }

    // ⛔ Protección mínima
    if (!item || !item.name || !item.price) return;

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

    // --------------------------------------------------
    // ✅ CONFIRMACIÓN REAL: el carrito se ha actualizado
    // --------------------------------------------------
    document.dispatchEvent(
      new CustomEvent("cart-updated", { detail: item })
    );
  });

  // ------------------------------------------------------------
  // 3) Vaciar carrito
  // ------------------------------------------------------------
  CartView.bindClearCart(() => {
    CartModel.clear();

    // REGISTRO DE ACTIVIDAD
    logActivity("clear_cart", "Vació el carrito completo");

    refresh();
  });

  // ------------------------------------------------------------
  // 4) Eliminar ítem individual
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

    // 🔹 NUEVO: notificación visual de eliminación
    document.dispatchEvent(
      new CustomEvent("cart-removed")
    );

  });

  // ============================================================
  // 5) MOSTRAR AVISO VISUAL SOLO TRAS CONFIRMACIÓN REAL
  // ============================================================
  // El toast escucha el evento "cart-updated", que solo se emite
  // cuando el carrito se ha actualizado correctamente.
  // Esto evita falsos positivos en la interfaz.
  //
  // ============================================================
  // 🛎️ TOAST VERDE — Producto añadido
  // ============================================================
  document.addEventListener("cart-updated", () => {
    const toastEl = document.getElementById("cartToast");
    if (!toastEl || !window.bootstrap) return;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  });

  // ============================================================
  // 🛎️ TOAST ROJO — Producto eliminado
  // ============================================================
  document.addEventListener("cart-removed", () => {
    const toastEl = document.getElementById("cartRemoveToast");
    if (!toastEl || !window.bootstrap) return;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  });

});
