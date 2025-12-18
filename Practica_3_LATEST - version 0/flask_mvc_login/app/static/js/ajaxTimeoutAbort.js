// AJAX clásico: petición con timeout + abort manual

let xhrAbortDemo = null;

function peticionConTimeoutAjax() {
    xhrAbortDemo = new XMLHttpRequest();

    xhrAbortDemo.open("GET", "/api/products/export", true);

    // Tiempo máximo de espera: 2 segundos
    xhrAbortDemo.timeout = 2000;

    // Cuando la petición responde correctamente
    xhrAbortDemo.onload = function () {
        if (xhrAbortDemo.status === 200) {
            alert("Respuesta recibida antes del timeout.");
            console.log("Datos recibidos:", JSON.parse(xhrAbortDemo.responseText));
        } else {
            console.error("Error en la respuesta:", xhrAbortDemo.status);
        }
    };

    // Si pasa el timeout
    xhrAbortDemo.ontimeout = function () {
        alert("⏳ La petición tardó demasiado y ha sido cancelada automáticamente (timeout).");
    };

    // Si la petición se aborta manualmente
    xhrAbortDemo.onabort = function () {
        alert("❌ La petición se canceló manualmente.");
    };

    xhrAbortDemo.onerror = function () {
        alert("Error de red.");
    };

    // Enviar petición
    xhrAbortDemo.send();
}

function cancelarAjax() {
    if (xhrAbortDemo) {
        xhrAbortDemo.abort();
    }
}

// Asignar eventos a los botones
document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("btnAjaxTimeout");
    const btn2 = document.getElementById("btnAjaxAbort");

    if (btn1) btn1.addEventListener("click", peticionConTimeoutAjax);
    if (btn2) btn2.addEventListener("click", cancelarAjax);
});
