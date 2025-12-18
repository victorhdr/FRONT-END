// Gestiona el estado del carrito y su persistencia en localStorage
const STORAGE_KEY = "cartItems";

export const CartModel = {
  cart: [],

  init() {
    const saved = localStorage.getItem(STORAGE_KEY);

    // 🔹 NUEVO: normalizar IDs a string al cargar del storage
    this.cart = saved
      ? JSON.parse(saved).map(item => ({ ...item, id: String(item.id) }))
      : [];
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
  },

  getItems() {
    return this.cart;
  },

  addItem({ id, name, price, quantity, details, detailsText }) {
    // 🔹 NUEVO: asegurar ID como string
    const normalizedId = String(id);

    const existing = this.cart.find(item => item.id === normalizedId);

    // Si no llega quantity (botones clásicos), se asume 1
    const q = Number(quantity) > 0 ? Number(quantity) : 1;

    if (existing) {
      existing.quantity += q; // ✅ suma la cantidad recibida
    } else {
      this.cart.push({
        id: normalizedId, // 🔹 NUEVO: guardar ID normalizado
        name,
        price,
        quantity: q,

        // opcional: conservar detalles si vienen (no rompe nada si no se usan)
        details,
        detailsText
      });
    }

    this.save();
  },

  removeItem(id) {
    // 🔹 NUEVO: normalizar ID recibido
    const normalizedId = String(id);

    this.cart = this.cart.filter(item => item.id !== normalizedId);
    this.save();
  },

  clear() {
    this.cart = [];
    this.save();
  },

  getSummary() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }
};
