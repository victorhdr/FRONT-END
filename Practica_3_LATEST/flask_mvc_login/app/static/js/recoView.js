/**
 * RecoView
 * ------------------------------------
 * Encargado de:
 *  - Referenciar elementos del DOM.
 *  - Renderizar resultados.
 *  - Asignar eventos sin lógica (esa va al controller).
 *
 * No contiene lógica de negocio ni peticiones AJAX.
 */

export default class RecoView {
  
  constructor() {
    // Inputs + botones + zonas dinámicas
    this.input = document.getElementById("reco-input");
    this.btn = document.getElementById("reco-btn");
    this.maxPrice = document.getElementById("reco-max-price");
    this.category = document.getElementById("reco-category");
    this.recent = document.getElementById("reco-recent-list");
    this.results = document.getElementById("reco-results");

    /**
     * Botón para borrar búsquedas recientes.
     * Solo se referencia aquí.
     * La lógica se asigna vía bindClearSearches(), que el controller llama.
     */
    this.clearBtn = document.getElementById("reco-clear-searches");
  }

  /* ==========================================================
     ✔ NUEVO: mostrar un mensaje de aviso al usuario
     ========================================================== */
  showMessage(msg) {
    alert(msg);
  }

  /* ==========================================================
     ✔ NUEVO: limpiar resultados tras borrar búsquedas recientes
     ========================================================== */
  clearResults() {
    this.results.innerHTML = "";
  }

  /**
   * Eventos del buscador principal.
   * El controller recibe el término de búsqueda.
   */
  bindSearch(handler) {
    // Click en el botón
    this.btn.addEventListener("click", () => handler(this.input.value));

    // Enter en el campo de texto
    this.input.addEventListener("keydown", e => {
      if (e.key === "Enter") handler(this.input.value);
    });
  }

  /**
   * Eventos de filtros de precio y categoría.
   * Cada cambio vuelve a filtrar los resultados ya cargados.
   */
  bindFilters(handler) {
    this.maxPrice.addEventListener("input", handler);
    this.category.addEventListener("change", handler);
  }

  /**
   * Detecta clics en chips de búsquedas recientes.
   * No ejecuta búsqueda, solo informa al controller.
   */
  bindRecent(handler) {
    this.recent.addEventListener("click", e => {
      if (e.target.dataset.item) {
        this.input.value = e.target.dataset.item; // Se rellena el input
        handler(e.target.dataset.item);           // Se notifica al controller
      }
    });
  }

  /**
   * BIND OFICIAL:
   * Asocia un evento al botón "Eliminar búsquedas recientes".
   * Este método es llamado por el controller.
   */
  bindClearSearches(handler) {
    console.log("🟦 bindClearSearches(): inicializado");

    if (!this.clearBtn) {
      console.warn("❌ Botón reco-clear-searches NO encontrado");
      return;
    }

    // Evento real del botón
    this.clearBtn.addEventListener("click", () => {
      console.log("🟥 Clic en botón → borrar búsquedas recientes");
      handler(); // → Controller decide qué borrar y cómo repintar
    });
  }

  /**
   * Renderiza la lista de búsquedas recientes como chips.
   * Solo DOM, sin lógica.
   */
  renderRecent(list) {
    if (!list.length) {
      this.recent.innerHTML = "<small class='text-muted'>Aún no hay búsquedas recientes.</small>";
      return;
    }

    // Chips clicables
    this.recent.innerHTML =
      list.map(i => `<span class="reco-chip" data-item="${i}">${i}</span>`).join("");
  }

  /**
   * Renderiza los resultados de la API externa.
   * Solo presentación.
   */
  renderResults(products) {
    if (!products.length) {
      this.results.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    this.results.innerHTML = products
      .map(
        p => `
        <div class="reco-card">
          <img src="${p.thumbnail}" alt="${p.title}">
          <h4>${p.title}</h4>
          <p class="price">${p.price} €</p>
          <small>${p.category}</small>
        </div>
      `
      )
      .join("");
  }
}
