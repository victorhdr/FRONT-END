/**
 * UserActivityController
 * ------------------------------
 * - Orquesta el flujo MVP para el panel de usuario.
 * - Carga datos (Model) → Renderiza (View) → Reacciona a filtros (Controller).
 */

import UserActivityModel from "./UserActivityModel.js";
import UserActivityView from "./UserActivityView.js";

class UserActivityController {

  constructor() {
    this.model = new UserActivityModel();
    this.view = new UserActivityView();

    // Bind de eventos de filtros
    this.view.bindOnFiltersChange(() => this.handleFiltersChange());

    // ----------------------------------------------------
    // 🧪 DEBUG MODE → activar botón para generar actividad
    // ----------------------------------------------------
    if (window.DEBUG_MODE === true) {
      const dbgBox = document.getElementById("debug-tools");
      if (dbgBox) dbgBox.classList.remove("d-none");

      const btnTest = document.getElementById("btn-generate-test-activity");
      if (btnTest) {
        btnTest.addEventListener("click", () => {
          if (window.generarActividadPrueba) {
            window.generarActividadPrueba();
            alert("Actividad generada ✔ Recarga el panel para ver la gráfica actualizada.");
          } else {
            alert("⚠ No se encontró la función generarActividadPrueba().");
          }
        });
      }
    }
  }

  /**
   * Inicializa el panel:
   * - Muestra "cargando"
   * - Carga actividad vía AJAX
   * - Renderiza resumen, gráfica y lista
   */
  async init() {
    try {
      this.view.showLoading();
      await this.model.loadActivity();
      this.view.hideLoading();

      this.refreshUI();

    } catch (error) {
      console.error("Error al cargar actividad:", error);
      this.view.hideLoading();
    }
  }

  handleFiltersChange() {
    this.refreshUI();
  }

  refreshUI() {
    const { rangeDays, type } = this.view.getFilters();

    const events = this.model.getFilteredEvents(rangeDays, type);

    const summary = this.model.getSummary(events);
    this.view.renderSummary(summary);

    const chartData = this.model.getChartData(events);
    const typeLabel = this.getTypeLabel(type);
    this.view.renderChart(chartData, typeLabel);

    this.view.renderActivityList(events);
  }

  getTypeLabel(type) {
    switch (type) {
      case "purchase": return "compras";
      case "search": return "búsquedas";
      case "favorite": return "favoritos";
      default: return "todos los eventos";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const controller = new UserActivityController();
  controller.init();
});
