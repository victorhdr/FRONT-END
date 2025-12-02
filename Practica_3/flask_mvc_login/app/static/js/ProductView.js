export const ProductView = {
  getElements() {
    return {
      container: document.getElementById("productsList"),
      filter: document.getElementById("filterPrice")
    };
  },

  render(products) {
    const { container } = this.getElements();
    if (!container) return;

    container.innerHTML = "";

    products.forEach((p) => {
      const card = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm text-center">
            <img src="${p.image_path}" class="card-img-top" alt="${p.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text mb-3">${p.price.toFixed(2)} €</p>
              <button 
                class="btn btn-primary btn-sm mt-auto btn-add-cart"
                type="button"
                data-id="${p.id}"
                data-name="${p.name}"
                data-price="${p.price}"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", card);
    });
  },

  bindFilter(handler) {
    const { filter } = this.getElements();
    if (!filter) return;
    filter.addEventListener("change", e => handler(e.target.value));
  }
};
