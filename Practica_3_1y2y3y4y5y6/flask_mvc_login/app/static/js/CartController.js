import { CartModel } from "./CartModel.js";
import { CartView } from "./CartView.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar modelo
  CartModel.init();

  // Render inicial
  const refresh = () => {
    const items = CartModel.getItems();
    const summary = CartModel.getSummary();
    CartView.render(items, summary);
  };

  refresh();

  // Añadir al carrito (delegación global sobre los botones .btn-add-cart)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    const id = parseInt(btn.dataset.id, 10);
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    CartModel.addItem({ id, name, price });
    refresh();
  });

  // Vaciar carrito
  CartView.bindClearCart(() => {
    CartModel.clear();
    refresh();
  });

  // Eliminar un ítem
  CartView.bindRemoveItem((id) => {
    CartModel.removeItem(id);
    refresh();
  });
});
