import { ProductModel } from "./ProductModel.js";
import { ProductView } from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  const productsData = window.productsData; // viene desde Flask
  ProductModel.set(productsData);
  ProductView.render(ProductModel.products);

  ProductView.bindFilter((range) => {
    const filtered = ProductModel.filterBy(range);
    ProductView.render(filtered);
  });
});
