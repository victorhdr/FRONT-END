/**
 * ConstructorModel
 * ------------------------------
 * - Calcula precios en función de la configuración.
 * - Valida combinaciones mediante una "API" JSON (AJAX).
 * - Devuelve un objeto de configuración listo para serializar.
 */

export default class ConstructorModel {
  constructor() {
    // Precios base por tipo de producto
    this.basePrices = {
      camiseta: 15,
      taza: 8,
      mochila: 25
    };

    // Coste extra por talla (solo ejemplo)
    this.sizePrices = {
      S: 0,
      M: 1,
      L: 2,
      XL: 3
    };

    // Extra por cada accesorio
    this.extraPrices = {
      logo: 3,
      estampado: 5,
      edicionLimitada: 7
    };

    // Endpoint local de reglas (JSON) → simula API
    this.rulesUrl = "/static/data/config_rules.json";
  }

  /**
   * Calcula el precio total estimado.
   */
  calcularPrecio(config) {
    const { productType, size, extras, quantity } = config;

    const base = this.basePrices[productType] ?? 0;

    const sizeExtra = this.sizePrices[size] ?? 0;

    const extrasTotal = extras.reduce((acc, extraKey) => {
      return acc + (this.extraPrices[extraKey] ?? 0);
    }, 0);

    const unitPrice = base + sizeExtra + extrasTotal;
    const total = unitPrice * quantity;

    return {
      unitPrice,
      total
    };
  }

  /**
   * Crea un objeto de configuración listo para serializar a JSON.
   */
  crearConfiguracion({ productType, color, size, extras, quantity }) {
    return {
      productType,
      color,
      size,
      extras,
      quantity,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Valida la configuración contra reglas definidas en un JSON local.
   * Usa fetch (AJAX) + JSON → ajustado a la práctica.
   */
  async validarConfiguracion(config) {
    const response = await fetch(this.rulesUrl);
    const reglas = await response.json();

    const mensajes = [];
    let valido = true;

    // Regla 1: cantidad máxima
    if (config.quantity > reglas.maxQuantity) {
      valido = false;
      mensajes.push(
        `La cantidad máxima permitida es ${reglas.maxQuantity}.`
      );
    }

    // Regla 2: combinaciones no permitidas
    for (const regla of reglas.disallowedCombos) {
      const coincideTipo =
        !regla.productType || regla.productType === config.productType;
      const coincideColor =
        !regla.color || regla.color === config.color;
      const coincideSize =
        !regla.size || regla.size === config.size;

      if (coincideTipo && coincideColor && coincideSize) {
        valido = false;
        mensajes.push(
          "La combinación seleccionada no está disponible actualmente."
        );
        break;
      }
    }

    return { valido, mensajes };
  }
}
