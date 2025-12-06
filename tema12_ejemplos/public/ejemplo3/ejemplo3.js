"use strict";

async function dobla_en_servidor(numero) {
    let base = "http://localhost:3000/";
    let recurso = "api/dobla/";
    let url = base + recurso + numero;
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

// Esta función async llama a otra función async usando await
async function calcula_y_muestra() {
    const out = document.getElementById("out3");
    out.textContent = "Calculando una cadena de operaciones...";

    const origen = 7;
    const doble = await dobla_en_servidor(origen);
    const doble_del_doble = await dobla_en_servidor(doble);

    out.textContent = `Origen: ${origen} → doble: ${doble} → doble del doble: ${doble_del_doble}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnCadena").addEventListener("click", calcula_y_muestra);
});