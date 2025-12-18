/**
 * UserActivityView
 * ------------------------------
 * - Encapsula acceso al DOM para el panel de usuario.
 * - Renderiza:
 *    · tarjetas de resumen
 *    · gráfica de barras
 *    · lista de actividad reciente
 * - Bindea los filtros (rango y tipo) hacia el controller.
 */

export default class UserActivityView {

  constructor() {
    // Filtros
    this.rangeSelect = document.getElementById("ua-range");
    this.typeSelect = document.getElementById("ua-type");

    // Resumen
    this.summaryContainer = document.getElementById("ua-summary-cards");

    // Gráfica
    this.chartContainer = document.getElementById("ua-chart");
    this.chartLabel = document.getElementById("ua-chart-label");
    this.chartEmpty = document.getElementById("ua-chart-empty");

    // Actividad reciente
    this.activityList = document.getElementById("ua-activity-list");
    this.loadingBox = document.getElementById("ua-loading");
    this.emptyBox = document.getElementById("ua-empty");
  }

  /**
   * Devuelve el estado actual de filtros desde el DOM.
   */
  getFilters() {
    const rangeDays = parseInt(this.rangeSelect.value, 10);
    const type = this.typeSelect.value;
    return { rangeDays, type };
  }

  /**
   * Bindea cambios en los filtros al controller.
   */
  bindOnFiltersChange(handler) {
    this.rangeSelect.addEventListener("change", handler);
    this.typeSelect.addEventListener("change", handler);
  }

  /**
   * Muestra estado "cargando" en la lista de actividad.
   */
  showLoading() {
    if (this.loadingBox) this.loadingBox.classList.remove("d-none");
  }

  hideLoading() {
    if (this.loadingBox) this.loadingBox.classList.add("d-none");
  }

  /**
   * Renderiza tarjetas de resumen a partir del objeto summary.
   */
  renderSummary(summary) {
    if (!this.summaryContainer) return;

    this.summaryContainer.innerHTML = `
      <div class="col-6 col-md-3">
        <div class="card border-0 bg-light h-100">
          <div class="card-body py-3">
            <p class="small text-muted mb-1">Eventos</p>
            <p class="h5 mb-0">${summary.totalEvents}</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="card border-0 bg-light h-100">
          <div class="card-body py-3">
            <p class="small text-muted mb-1">Compras</p>
            <p class="h5 mb-0">${summary.purchases}</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="card border-0 bg-light h-100">
          <div class="card-body py-3">
            <p class="small text-muted mb-1">Búsquedas</p>
            <p class="h5 mb-0">${summary.searches}</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <div class="card border-0 bg-light h-100">
          <div class="card-body py-3">
            <p class="small text-muted mb-1">Favoritos</p>
            <p class="h5 mb-0">${summary.favorites}</p>
            <p class="small text-muted mb-0">Total compras: ${summary.totalAmount.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza la gráfica de barras en función de labels y values.
   */
  renderChart(chartData, typeLabel) {
    if (!this.chartContainer) return;

    const { labels, values } = chartData;

    // Si no hay valores: mostrar mensaje
    if (!values.length) {
      this.chartContainer.innerHTML = "";
      this.chartEmpty.classList.remove("d-none");
      this.chartLabel.textContent = "Sin datos";
      return;
    }

    this.chartEmpty.classList.add("d-none");
    this.chartContainer.innerHTML = "";

    const max = Math.max(...values);

    labels.forEach((label, index) => {
      const value = values[index];
      const heightPercent = max > 0 ? (value / max) * 100 : 0;

      const bar = document.createElement("div");
      bar.className = "ua-chart-bar";

      bar.innerHTML = `
        <div 
          class="ua-chart-bar-inner"
          style="--final-height:${heightPercent}%;" 
          data-tooltip="${value} eventos"
        ></div>

        <div class="ua-chart-bar-value">${value}</div>
        <div class="ua-chart-bar-label">${label}</div>
      `;

      this.chartContainer.appendChild(bar);
    });

    this.chartLabel.textContent = `Eventos por día (${typeLabel})`;
  }

  /**
   * Renderiza la lista de actividad reciente.
   */
  renderActivityList(events) {
    if (!this.activityList) return;

    this.activityList.innerHTML = "";

    if (!events.length) {
      this.emptyBox.classList.remove("d-none");
      return;
    }

    this.emptyBox.classList.add("d-none");

    // Ordenar por fecha descendente (más recientes primero)
    const sorted = [...events].sort((a, b) => (
      new Date(b.created_at) - new Date(a.created_at)
    ));

    sorted.forEach(ev => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex flex-column ua-activity-item";

      const date = new Date(ev.created_at);
      const dateStr = date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });

      const typeLabel = this.mapTypeToLabel(ev.type);

      li.innerHTML = `
        <div class="d-flex justify-content-between">
          <span><strong>${typeLabel}</strong></span>
          <span class="text-muted small">${dateStr}</span>
        </div>
        <div class="small mt-1">${ev.label}</div>
        ${ev.value ? `<div class="small text-muted">Importe: ${ev.value.toFixed(2)} €</div>` : ""}
      `;

      this.activityList.appendChild(li);
    });
  }

  mapTypeToLabel(type) {
    const map = {
      purchase: "Compra",
      search: "Búsqueda",
      favorite: "Favorito"
    };
    return map[type] || "Actividad";
  }
}
