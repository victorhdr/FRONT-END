// AJAX clásico: POST enviando JSON al servidor Flask

function enviarJsonAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/echo", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Datos que enviaremos al servidor
    const payload = {
        mensaje: "Hola servidor desde AJAX clásico",
        timestamp: new Date().toISOString()
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            console.log("Respuesta del servidor (POST):", respuesta);
            alert("JSON enviado correctamente. Mira la consola.");
        } else {
            console.error("Error en la petición POST:", xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Error de red en la petición POST.");
    };

    xhr.send(JSON.stringify(payload));
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnAjaxPost");
    if (btn) {
        btn.addEventListener("click", enviarJsonAjax);
    }
});
