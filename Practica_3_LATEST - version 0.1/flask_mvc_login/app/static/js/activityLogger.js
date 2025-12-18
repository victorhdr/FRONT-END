/**
 * activityLogger.js
 * -------------------------------------
 * Sistema de registro de actividad REAL del usuario.
 * Usa localStorage y puede combinarse con datos de ejemplo.
 */

const STORAGE_KEY = "userActivityLog";
const MAX_EVENTS = 200;

/**
 * Devuelve la actividad guardada actualmente.
 */
export function getActivityLog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Registra un evento real generado por el usuario.
 *
 * Ejemplo:
 * logActivity("search", "Buscó 'camisetas'", { query: "camisetas" });
 */
export function logActivity(type, message, data = {}) {
  const log = getActivityLog();

  const entry = {
    id: Date.now(),
    type,
    message,
    data,
    timestamp: new Date().toISOString()
  };

  // Mantener un límite para no saturar localStorage
  log.unshift(entry);
  if (log.length > MAX_EVENTS) log.pop();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

/**
 * Limpia la actividad real (solo para depuración)
 */
export function clearActivity() {
  localStorage.removeItem(STORAGE_KEY);
}
