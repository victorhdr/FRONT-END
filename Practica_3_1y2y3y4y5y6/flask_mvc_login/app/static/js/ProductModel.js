export const ProductModel = {
  products: [],

  set(products) {
    this.products = products;
  },

  filterBy(priceRange) {
    if (priceRange === "all") return this.products;

    return this.products.filter(p => {
      if (priceRange === "low") return p.price < 20;
      if (priceRange === "mid") return p.price >= 20 && p.price <= 50;
      if (priceRange === "high") return p.price > 50;
    });
  }
};
