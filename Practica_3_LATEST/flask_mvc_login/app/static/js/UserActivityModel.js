/**
 * UserActivityModel
 * ------------------------------
 * Opción B: mezcla actividad REAL (localStorage)
 * con actividad base del JSON.
 */

import { getActivityLog } from "./activityLogger.js";

const DATA_URL = "/static/data/user_activity.json";

export default class UserActivityModel {

  constructor() {
    this.events = []; // eventos ya normalizados
  }

  /**
   * Carga actividad real + estática y normaliza campos
   */
  async loadActivity() {
    let staticEvents = [];

    // Intentar cargar JSON estático
    try {
      const resp = await fetch(DATA_URL, { headers: { "Accept": "application/json" }});
      if (resp.ok) {
        const data = await resp.json();
        staticEvents = (data.events || []).map(ev => ({
          id: ev.id,
          type: ev.type,
          label: ev.label || ev.message || "",
          // NORMALIZACIÓN: asegurar campo created_at
          created_at: ev.created_at || ev.timestamp,
          value: ev.value || null
        }));
      }
    } catch (err) {
      console.warn("user_activity.json no disponible");
    }

    // Cargar actividad real desde localStorage
    const realRaw = getActivityLog();

    const realEvents = realRaw.map(ev => ({
      id: ev.id,
      type: ev.type,
      label: ev.message,
      // NORMALIZACIÓN: asegurar created_at
      created_at: ev.timestamp || ev.created_at,
      value: ev.data?.price || ev.data?.value || null
    }));

    // Unificamos: primero actividad real, luego ejemplo
    this.events = [...realEvents, ...staticEvents];

    return this.events;
  }

  /**
   * Filtrado de eventos por fecha y tipo
   */
  getFilteredEvents(rangeDays, type) {
    const now = new Date();
    const minDate = new Date(now);
    minDate.setDate(now.getDate() - rangeDays);

    return this.events.filter(ev => {
      const date = new Date(ev.created_at || ev.timestamp);
      if (isNaN(date)) return false;

      const inRange = date >= minDate && date <= now;
      const typeMatch = (type === "all") ? true : ev.type === type;

      return inRange && typeMatch;
    });
  }

  /**
   * Resumen numérico
   */
  getSummary(events) {
    const summary = {
      totalEvents: events.length,
      purchases: 0,
      searches: 0,
      favorites: 0,
      totalAmount: 0
    };

    events.forEach(ev => {
      if (ev.type === "purchase") {
        summary.purchases++;
        summary.totalAmount += ev.value || 0;
      }
      if (ev.type === "search") summary.searches++;
      if (ev.type === "favorite") summary.favorites++;
    });

    return summary;
  }

  /**
   * Datos para gráfica
   */
  getChartData(events) {
    const byDay = new Map();

    events.forEach(ev => {
      const d = new Date(ev.created_at || ev.timestamp);
      if (isNaN(d)) return;

      const label = d.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit"
      });

      byDay.set(label, (byDay.get(label) || 0) + 1);
    });

    return {
      labels: Array.from(byDay.keys()),
      values: Array.from(byDay.values())
    };
  }
}
