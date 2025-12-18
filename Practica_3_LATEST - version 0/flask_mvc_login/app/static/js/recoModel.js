/**
 * RecoModel
 * ------------------------------------
 * Encargado de:
 *  - Consultar la API externa.
 *  - Aplicar los filtros a los productos.
 *  - Gestionar búsquedas recientes vía localStorage.
 *
 * No toca el DOM ni genera HTML: solo lógica y datos.
 */

export default class RecoModel {

  constructor() {
    // Endpoint de la API externa (DummyJSON)
    this.API = "https://dummyjson.com/products/search?q=";

    // Clave del localStorage para búsquedas recientes
    this.KEY = "recent_searches";
  }

  /**
   * Realiza una petición AJAX a la API externa.
   * @param {string} query - término buscado por el usuario
   * @returns {Promise<Array>} lista de productos
   */
  async searchProducts(query) {
    const response = await fetch(this.API + encodeURIComponent(query));
    const data = await response.json();

    // La API devuelve { products: [...] }
    return data.products || [];
  }

  /**
   * Aplica filtros a un listado de productos ya obtenido.
   * Evita pedir más datos a la API.
   */
  filter(products, { maxPrice, category }) {
    return products.filter(p => {
      const priceOK = !maxPrice || p.price <= maxPrice;
      const categoryOK = !category || p.category === category;
      return priceOK && categoryOK;
    });
  }

  /**
   * Recupera las búsquedas recientes del usuario.
   */
  getRecent() {
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  }

  /**
   * Guarda una búsqueda y mantiene las 5 más recientes.
   */
  saveRecent(query) {
    const clean = query.trim();
    if (!clean) return;

    const list = this.getRecent();

    // Evitar duplicados y mantener orden reciente → antiguo
    const updated = [clean, ...list.filter(x => x !== clean)].slice(0, 5);

    localStorage.setItem(this.KEY, JSON.stringify(updated));
    return updated;
  }

  /**
   * Borra TODAS las búsquedas recientes
   */
  clearRecent() {
    console.log("🟨 Model: borrando recent_searches desde localStorage…");
    localStorage.removeItem(this.KEY);
  }
}
