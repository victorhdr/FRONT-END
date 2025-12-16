// AJAX clásico: GET básico para obtener productos JSON desde Flask

function cargarProductosAjax() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/products/export", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log("Productos recibidos vía AJAX GET:", data);
            alert("Productos cargados mediante AJAX clásico. Mira la consola.");
        } else {
            console.error("Error al cargar productos:", xhr.status);
            alert("Error al hacer la petición AJAX.");
        }
    };

    xhr.onerror = function () {
        console.error("Error de red en AJAX.");
    };

    xhr.send();
}

// Necesitamos un botón que dispare esta función
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnAjaxGet");
    if (btn) {
        btn.addEventListener("click", cargarProductosAjax);
    }
});
