"use strict";

async function trae_resultado(numero) {
    let base = "http://localhost:3000/";
    let recurso = "api/dobla/";
    let url = base + recurso + numero;
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

async function manej_boton01() {
    let numero = Math.floor(Math.random() * 100);
    const span01 = document.getElementById("span01");
    const span02 = document.getElementById("span02");

    span01.textContent = numero;
    span02.textContent = "Llamando al servidor...";

    try {
        span02.textContent = await trae_resultado(numero);
    } catch (err) {
        span02.textContent = "Error: " + err.message;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const boton01 = document.getElementById("boton01");
    boton01.addEventListener("click", manej_boton01);
});