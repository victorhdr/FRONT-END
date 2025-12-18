/**
 * ConstructorView
 * ------------------------------
 * - Encapsula todo el acceso al DOM.
 * - Renderiza la vista previa.
 * - Muestra mensajes de validación.
 * - Ofrece métodos para bindear eventos hacia el controller.
 */

export default class ConstructorView {
  constructor() {
    // ---------------------------------------------------------
    // CONTROLES DEL FORMULARIO DE CONFIGURACIÓN
    // ---------------------------------------------------------
    this.productType = document.getElementById("cfg-product-type");
    this.colorButtons = document.querySelectorAll("#cfg-color-group .color-swatch");
    this.sizeSelect = document.getElementById("cfg-size");
    this.qtyInput = document.getElementById("cfg-quantity");
    this.extraLogo = document.getElementById("extra-logo");
    this.extraEstampado = document.getElementById("extra-estampado");
    this.extraEdicion = document.getElementById("extra-edicion");

    // Caja de validación dinámica (AJAX)
    this.validationBox = document.getElementById("cfg-validation");

    // Botón para generar JSON
    this.generateJsonBtn = document.getElementById("cfg-generate-json");

    // ---------------------------------------------------------
    // NUEVO: Botón “Añadir al carrito”
    // ---------------------------------------------------------
    // Este botón permite enviar la configuración personalizada
    // al carrito mediante un evento controlado por el controller.
    this.addToCartBtn = document.getElementById("cfg-add-to-cart");

    // ---------------------------------------------------------
    // ELEMENTOS DE LA VISTA PREVIA
    // ---------------------------------------------------------
    this.previewBox = document.querySelector(".constructor-preview-box");
    this.previewTitle = document.getElementById("cfg-preview-title");
    this.previewDetails = document.getElementById("cfg-preview-details");
    this.previewPrice = document.getElementById("cfg-preview-price");

    // Salida JSON final mostrada al usuario
    this.outputJson = document.getElementById("cfg-json-output");
  }

  /**
   * Obtiene la configuración actual desde el DOM.
   * El controller usará este método para:
   * - calcular precios
   * - validar reglas
   * - generar el JSON final
   */
  getCurrentConfig() {
    const productType = this.productType.value;
    const color = this.getSelectedColor();
    const size = this.sizeSelect.value;
    const quantity = Number(this.qtyInput.value) || 1;

    const extras = [];
    if (this.extraLogo.checked) extras.push("logo");
    if (this.extraEstampado.checked) extras.push("estampado");
    if (this.extraEdicion.checked) extras.push("edicionLimitada");

    return { productType, color, size, extras, quantity };
  }

  /**
   * Devuelve el color actualmente seleccionado.
   */
  getSelectedColor() {
    const active = document.querySelector("#cfg-color-group .color-swatch.active");
    return active ? active.dataset.color : "white";
  }

  /**
   * Bindea cambios en el configurador para actualizar la vista previa.
   * Este método se ejecutará cada vez que el usuario cambie una opción.
   */
  bindOnChange(handler) {
    this.productType.addEventListener("change", handler);
    this.sizeSelect.addEventListener("change", handler);
    this.qtyInput.addEventListener("input", handler);

    [this.extraLogo, this.extraEstampado, this.extraEdicion].forEach(chk =>
      chk.addEventListener("change", handler)
    );

    // Selección de color
    this.colorButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Elimina selección previa
        this.colorButtons.forEach(b => b.classList.remove("active"));
        // Marca nuevo color
        btn.classList.add("active");
        handler();
      });
    });
  }

  /**
   * Bindea el botón de "Generar JSON".
   * Este botón genera el objeto final y lo muestra en pantalla.
   */
  bindOnGenerateJson(handler) {
    this.generateJsonBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  /**
   * NUEVO MÉTODO:
   * bindOnAddToCart()
   * ------------------------------
   * Permite que el controller reciba el evento cuando el usuario
   * pulsa "Añadir al carrito".
   * 
   * No interactúa con el carrito directamente → desacoplamiento.
   */
  bindOnAddToCart(handler) {
    if (!this.addToCartBtn) return; // Protección por si el botón no existe
    this.addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Actualiza la vista previa visual del producto configurado.
   */
  updatePreview(config, precios) {
    // Título del producto
    const tipoLabel =
      config.productType.charAt(0).toUpperCase() + config.productType.slice(1);

    this.previewTitle.textContent = `${tipoLabel} personalizada`;

    // Descripción del producto
    const extrasLabel = config.extras.length
      ? config.extras.join(", ")
      : "Sin extras";

    this.previewDetails.textContent =
      `Color ${config.color} · Talla ${config.size} · ${extrasLabel} · Cantidad ${config.quantity}`;

    // Precio total calculado
    this.previewPrice.textContent = `${precios.total.toFixed(2)} €`;

    // Cambiar color de la caja
    this.previewBox.style.background = this.mapColorToBackground(config.color);
  }

  /**
   * Mapea el color seleccionado a un fondo bonito.
   */
  mapColorToBackground(color) {
    const map = {
      white: "linear-gradient(135deg,#f8f9fa,#e9ecef)",
      black: "linear-gradient(135deg,#343a40,#000000)",
      red: "linear-gradient(135deg,#ff6b6b,#c92a2a)",
      blue: "linear-gradient(135deg,#4dabf7,#1864ab)",
      green: "linear-gradient(135deg,#51cf66,#2b8a3e)"
    };
    return map[color] || map.white;
  }

  /**
   * Muestra los mensajes de validación AJAX.
   */
  showValidation({ valido, mensajes }) {
    if (!mensajes.length && valido) {
      this.validationBox.classList.add("d-none");
      this.validationBox.textContent = "";
      return;
    }

    this.validationBox.classList.remove("d-none");
    this.validationBox.classList.remove("alert-danger", "alert-success");
    this.validationBox.classList.add(valido ? "alert-success" : "alert-danger");

    this.validationBox.innerHTML = mensajes
      .map(m => `<div>${m}</div>`)
      .join("");
  }

  /**
   * Muestra el JSON final generado por el usuario.
   */
  showJson(config, precios) {
    const payload = {
      ...config,
      pricing: precios
    };

    this.outputJson.textContent = JSON.stringify(payload, null, 2);
  }
}
