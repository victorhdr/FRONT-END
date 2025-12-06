"use strict";

async function trae_resultado(numero) {
    // Mismo esquema que en el tema:
    // base = "http://localhost:3000/"
    // recurso = "api/dobla/"
    let base = "http://localhost:3000/";
    let recurso = "api/dobla/";
    let url = base + recurso + numero;

    // Ejemplo de uso de async/await con fetch(url)
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnFetch");
    const out = document.getElementById("out1");

    btn.addEventListener("click", async () => {
        out.textContent = "Llamando al servidor...";
        try {
            const resultado = await trae_resultado(10);
            out.textContent = "El servidor ha devuelto: " + resultado;
        } catch (err) {
            out.textContent = "Error en la petición: " + err.message;
        }
    });
});