/**
 * RecoController
 * ------------------------------------
 * El "cerebro" del módulo.
 * Conecta:
 *  - Vista → usuario
 *  - Modelo → datos/API
 *  - Renderizado → UI
 */

import RecoModel from "./recoModel.js";
import RecoView from "./recoView.js";

// Logger de actividad (ya usado en el panel)
import { logActivity } from "./activityLogger.js";

export default class RecoController {

  constructor() {
    this.model = new RecoModel();
    this.view = new RecoView();

    // Última lista consultada (se filtra sin hacer más peticiones)
    this.lastResults = [];

    // Enlace de eventos de la vista hacia el controlador
    this.view.bindSearch(query => this.handleSearch(query));
    this.view.bindFilters(() => this.applyFilters());
    this.view.bindRecent(query => this.handleSearch(query));

    // Botón para borrar búsquedas recientes
    this.view.bindClearSearches(() => {
      console.log("🟪 Controller: borrando búsquedas recientes");

      // Registro de actividad REAL
      logActivity(
        "search",
        "Eliminó el historial de búsquedas recientes",
        { action: "clear_recent_searches" }
      );

      this.model.clearRecent();   // borrar localStorage
      this.view.renderRecent([]); // repintar lista vacía
      this.view.clearResults();   // limpiar resultados visibles
    });

    // Pintar búsquedas recientes al cargar la página
    this.view.renderRecent(this.model.getRecent());
  }

  /**
   * Lógica principal de búsqueda.
   * Consulta la API externa una sola vez.
   */
  async handleSearch(query) {

    const clean = query.trim();

    // No permitir búsquedas vacías
    if (!clean) {
      this.view.showMessage("Por favor, introduce un término de búsqueda.");
      return;
    }

    // Registro de búsqueda REAL
    logActivity(
      "search",
      `Buscó productos relacionados con "${clean}"`,
      { query: clean }
    );

    // 1. Obtener productos desde la API externa (AJAX)
    const products = await this.model.searchProducts(clean);
    this.lastResults = products;

    // 2. Guardar búsqueda reciente y actualizar chips
    const recent = this.model.saveRecent(clean);
    this.view.renderRecent(recent);

    // 3. Aplicar filtros y pintar resultados
    this.applyFilters();
  }

  /**
   * Filtra los resultados ya existentes sin más peticiones.
   */
  applyFilters() {
    const filters = {
      maxPrice: this.view.maxPrice.value ? Number(this.view.maxPrice.value) : null,
      category: this.view.category.value
    };

    const filtered = this.model.filter(this.lastResults, filters);
    this.view.renderResults(filtered);
  }
}

// Instanciación automática al cargar
new RecoController();
