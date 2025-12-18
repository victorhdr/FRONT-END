import { getActivityLog } from "./activityLogger.js";

export default class ActivityModel {

  /**
   * Obtiene actividad REAL + actividad de ejemplo.
   * El JSON es solo para garantizar contenido mínimo.
   */
  async loadActivity() {
    let sample = [];

    try {
      const res = await fetch("/static/data/user_activity.json");
      if (res.ok) sample = await res.json();
    } catch {
      console.warn("No se pudo cargar user_activity.json (modo sin ejemplo)");
    }

    const real = getActivityLog();

    return [...real, ...sample];
  }
}
