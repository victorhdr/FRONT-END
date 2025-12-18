// ---------------------------------------
// Ejercicio 8.5 — fetch avanzado + botón toggle (VERSIÓN FINAL)
// ---------------------------------------

const catalogoFetchContainer = document.getElementById("zonaFetch");
const toggleBtn = document.getElementById("btnToggleCatalogo");

// Crear tarjeta de producto
function crearTarjetaProducto(p) {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    const div = document.createElement("div");
    div.className = "card shadow-sm p-3 h-100";
    div.style.cursor = "pointer";

    div.innerHTML = `
        <h5 class="mb-2">${p.name}</h5>
        <p class="mb-1">💰 ${p.price} €</p>
        <small class="text-muted">ID: ${p.id}</small>
    `;

    div.addEventListener("click", () => cargarDetalleProducto(p.id));
    col.appendChild(div);
    return col;
}

// Obtener detalle del producto
async function cargarDetalleProducto(id) {
    try {
        const r = await fetch(`/api/products/${id}`);
        if (!r.ok) throw new Error("Error HTTP " + r.status);

        const detalle = await r.json();
        alert(`Producto: ${detalle.name}\nPrecio: ${detalle.price}€`);
    } catch (err) {
        console.error(err);
        alert("Error cargando detalle del producto.");
    }
}

// Recargar catálogo con fetch
async function recargarCatalogoFetch() {
    try {
        const r = await fetch("/api/products/export");
        if (!r.ok) throw new Error("Error HTTP " + r.status);

        const data = await r.json();
        const productos = data.products;

        // Limpiar contenedor
        catalogoFetchContainer.innerHTML = "";

        // Renderizar tarjetas
        productos.forEach(p => {
            const card = crearTarjetaProducto(p);
            catalogoFetchContainer.appendChild(card);
        });

        // Asegurar que el catálogo SIEMPRE se muestre tras recargar
        catalogoFetchContainer.style.display = "flex";

        // Mostrar botón toggle si estaba oculto
        toggleBtn.classList.remove("d-none");

        // Actualizar texto del botón
        toggleBtn.textContent = "Ocultar catálogo";

    } catch (err) {
        console.error(err);
        alert("Error obteniendo productos con fetch.");
    }
}

// Mostrar / ocultar catálogo
toggleBtn.addEventListener("click", () => {
    if (catalogoFetchContainer.style.display === "none") {
        catalogoFetchContainer.style.display = "flex";
        toggleBtn.textContent = "Ocultar catálogo";
    } else {
        catalogoFetchContainer.style.display = "none";
        toggleBtn.textContent = "Mostrar catálogo";
    }
});

// Activar evento del botón fetch
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnFetchCatalogo");
    if (btn) btn.addEventListener("click", recargarCatalogoFetch);
});
