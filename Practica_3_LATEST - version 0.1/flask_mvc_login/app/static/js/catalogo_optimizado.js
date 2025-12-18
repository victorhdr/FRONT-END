// ----------------------------------------------
// Ejercicio 8.8 — Debounce + Infinite Scroll + Caché
// ----------------------------------------------

let paginaActual = 1;
let totalPaginas = Infinity;
let cargando = false;
let cacheProductos = []; // caché en memoria

const contenedor = document.getElementById("catalogoOptimizado");
const buscador = document.getElementById("buscador");
const indicadorCarga = document.getElementById("cargando");


// ===============================
// 1) Función Debounce
// ===============================
function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}


// ===============================
// 2) Obtener productos de API (paginado)
// ===============================
async function cargarPagina(page) {
    if (cargando || page > totalPaginas) return;

    cargando = true;
    indicadorCarga.classList.remove("d-none");

    const r = await fetch(`/api/products/page/${page}`);
    const data = await r.json();

    paginaActual = data.page;
    totalPaginas = data.total_pages;

    // Añadir productos al caché
    cacheProductos = [...cacheProductos, ...data.products];

    // Renderizar esta página
    renderProductos(data.products);

    cargando = false;
    indicadorCarga.classList.add("d-none");
}


// ===============================
// 3) Render general (usando caché si hay búsqueda)
// ===============================
function renderProductos(lista) {
    lista.forEach(prod => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-3";

        col.innerHTML = `
            <div class="card shadow-sm p-3 h-100">
                <h5>${prod.name}</h5>
                <p>${prod.price} €</p>
            </div>
        `;

        contenedor.appendChild(col);
    });
}


// ===============================
// 4) Infinite Scroll
// ===============================
window.addEventListener("scroll", () => {
    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight - 100;

    if (scrollPos >= bottom) {
        cargarPagina(paginaActual + 1);
    }
});


// ===============================
// 5) Búsqueda con debounce
// ===============================
const filtrar = debounce(() => {
    const texto = buscador.value.toLowerCase();

    contenedor.innerHTML = "";

    const filtrados = cacheProductos.filter(p =>
        p.name.toLowerCase().includes(texto)
    );

    renderProductos(filtrados);
}, 300);

buscador.addEventListener("input", filtrar);


// ===============================
// 6) Carga inicial
// ===============================
cargarPagina(1);
