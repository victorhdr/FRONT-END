// Gestiona el estado del carrito y su persistencia en localStorage
const STORAGE_KEY = "cartItems";

export const CartModel = {
  cart: [],

  init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.cart = saved ? JSON.parse(saved) : [];
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
  },

  getItems() {
    return this.cart;
  },

  addItem({ id, name, price }) {
    const existing = this.cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id,
        name,
        price,
        quantity: 1
      });
    }
    this.save();
  },

  removeItem(id) {
    this.cart = this.cart.filter(item => item.id !== id);
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
