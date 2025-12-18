/**
 * ConstructorController
 * ------------------------------
 * - Conecta la vista y el modelo.
 * - Gestiona la lógica de actualización en tiempo real.
 * - Lanza peticiones AJAX para validar la configuración.
 * 
 * NOTA IMPORTANTE:
 * Este controller se amplía para:
 *   ✔ Guardar la configuración final en localStorage
 *   ✔ Permitir enviar el producto personalizado al carrito real
 * 
 * Estas funciones NO son obligatorias en la práctica, pero muestran
 * una comprensión completa del patrón MVP y de la comunicación entre
 * módulos mediante eventos personalizados.
 */

import ConstructorModel from "./constructorModel.js";
import ConstructorView from "./constructorView.js";

class ConstructorController {
  constructor() {
    this.model = new ConstructorModel();
    this.view = new ConstructorView();

    // ------------------------------------------------------------------
    // BINDEO DE EVENTOS DESDE LA VISTA
    // ------------------------------------------------------------------
    this.view.bindOnChange(() => this.handleChange());
    this.view.bindOnGenerateJson(() => this.handleGenerateJson());

    // 🔹 Nuevo: botón para añadir al carrito
    this.view.bindOnAddToCart(() => this.handleAddToCart());

    // Estado inicial: se actualiza la vista previa al cargar
    this.handleChange();
  }

  /**
   * handleChange()
   * ------------------------------------------------------------
   * Se ejecuta cada vez que el usuario modifica:
   *  - tipo de producto
   *  - color
   *  - talla
   *  - extras
   *  - cantidad
   * 
   * Funciones:
   *  1) Recuperar configuración actual
   *  2) Calcular precios mediante el modelo
   *  3) Actualizar la vista previa
   *  4) Validar la configuración mediante AJAX
   */
  async handleChange() {
    const config = this.view.getCurrentConfig();

    // Calcular precios
    const precios = this.model.calcularPrecio(config);

    // Actualizar vista previa
    this.view.updatePreview(config, precios);

    // Validar configuración vía AJAX
    try {
      const resultado = await this.model.validarConfiguracion(config);
      const mensajes = [...resultado.mensajes];

      if (resultado.valido) {
        mensajes.push("Configuración válida.");
      }

      this.view.showValidation({
        valido: resultado.valido,
        mensajes
      });

    } catch (err) {
      console.error("Error al validar configuración:", err);

      this.view.showValidation({
        valido: false,
        mensajes: ["No se pudo validar la configuración en este momento."]
      });
    }
  }

  /**
   * handleGenerateJson()
   * ------------------------------------------------------------
   * - Genera el JSON final del producto personalizado.
   * - Lo muestra en pantalla.
   * - Guarda el resultado en localStorage para persistencia.
   */
  handleGenerateJson() {
    const config = this.view.getCurrentConfig();
    const precios = this.model.calcularPrecio(config);

    // JSON final generado por el usuario
    const payload = {
      ...config,
      pricing: precios,
      createdAt: new Date().toISOString() // Marca de tiempo
    };

    // Mostrar JSON en la vista
    this.view.showJson(config, precios);

    // ----------------------------------------------------------
    // ✔ GUARDADO EN LOCALSTORAGE
    // ----------------------------------------------------------
    try {
      localStorage.setItem("productoPersonalizado", JSON.stringify(payload));
      console.log("Producto personalizado guardado en localStorage:", payload);
    } catch (error) {
      console.error("Error al guardar el producto personalizado:", error);
    }

    // (Opcional) Podría enviarse al servidor, guardarse como preset, etc.
  }

  /**
   * handleAddToCart()
   * ------------------------------------------------------------
   * - Recupera el producto almacenado en localStorage.
   * - Crea un objeto compatible con el carrito real.
   * - Envía estos datos mediante un CustomEvent → el CartController
   *   podrá añadirlo sin acoplamiento.
   */
  handleAddToCart() {
    // Obtener SIEMPRE la configuración actual del formulario
    const producto = this.view.getCurrentConfig();

    // Recalcular precios para esta configuración concreta
    const precios = this.model.calcularPrecio(producto);

    if (!producto) {
      alert("Primero genera la configuración (JSON).");
      return;
    }

    // ------------------------------------------------------------
    // 🔹 NUEVO: crear un texto legible con los detalles de la personalización
    // Este texto se usará directamente en el mini-carrito y en el carrito
    // sin que el carrito tenga que interpretar la estructura interna
    // ------------------------------------------------------------
    const extrasText = producto.extras.length
      ? producto.extras.join(", ")
      : "Sin extras";

    const detailsText =
      `Color ${producto.color} · Talla ${producto.size} · ${extrasText}`;

    // ------------------------------------------------------------
    // 🔹 NUEVO: crear un ID estable según la configuración
    // Misma configuración → mismo ID → se suma cantidad en el carrito
    // ------------------------------------------------------------
    const configKey = JSON.stringify({
      productType: producto.productType,
      color: producto.color,
      size: producto.size,
      extras: producto.extras
    });

    // Construcción del item compatible con el carrito
    const cartItem = {
      id: configKey,   // 🔧 CAMBIO: antes Date.now(), ahora ID estable
      name: `Personalizado (${producto.productType})`,

      // 🔧 CAMBIO: usar el precio calculado, no producto.pricing
      price: precios.unitPrice,

      quantity: producto.quantity || 1,    // 🔧 cantidad real del configurador

      // Detalles estructurados (opcional, para futuras ampliaciones)
      details: {
        productType: producto.productType,
        color: producto.color,
        size: producto.size,
        extras: producto.extras
      },

      // 🔹 NUEVO: texto listo para mostrar en el carrito
      detailsText
    };

    // ------------------------------------------------------------
    // ENVÍO DEL PRODUCTO AL CARRITO MEDIANTE EVENTO PERSONALIZADO
    // ------------------------------------------------------------
    // Este patrón permite que el carrito funcione sin estar 
    // acoplado al constructor → arquitectura limpia.
    document.dispatchEvent(
      new CustomEvent("add-to-cart", { detail: cartItem })
    );

    // (Aviso visual gestionado por el carrito, no aquí)
  }
}

// Instanciación automática
new ConstructorController();
