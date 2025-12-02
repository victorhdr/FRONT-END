export const CartView = {
  getElements() {
    return {
      list: document.getElementById("cartItems"),
      totalItems: document.getElementById("cartTotalItems"),
      totalPrice: document.getElementById("cartTotalPrice"),
      clearBtn: document.getElementById("btnClearCart"),
      emptyMessage: document.getElementById("cartEmptyMessage")
    };
  },

  render(cartItems, summary) {
    const { list, totalItems, totalPrice, emptyMessage } = this.getElements();
    if (!list) return;

    list.innerHTML = "";

    if (cartItems.length === 0) {
      if (emptyMessage) emptyMessage.style.display = "block";
    } else {
      if (emptyMessage) emptyMessage.style.display = "none";

      cartItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <div class="me-2">
            <div><strong>${item.name}</strong></div>
            <div class="text-muted small">${item.quantity} x ${item.price.toFixed(2)} €</div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold">${(item.price * item.quantity).toFixed(2)} €</span>
            <button 
              class="btn btn-outline-danger btn-sm btn-remove-item"
              type="button"
              data-id="${item.id}"
              aria-label="Eliminar ${item.name} del carrito"
            >
              ✕
            </button>
          </div>
        `;
        list.appendChild(li);
      });
    }

    if (totalItems) totalItems.textContent = summary.totalItems;
    if (totalPrice) totalPrice.textContent = `${summary.totalPrice.toFixed(2)} €`;
  },

  bindClearCart(handler) {
    const { clearBtn } = this.getElements();
    if (!clearBtn) return;
    clearBtn.addEventListener("click", handler);
  },

  bindRemoveItem(handler) {
    const { list } = this.getElements();
    if (!list) return;

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-remove-item");
      if (!btn) return;
      const id = parseInt(btn.dataset.id, 10);
      handler(id);
    });
  }
};
