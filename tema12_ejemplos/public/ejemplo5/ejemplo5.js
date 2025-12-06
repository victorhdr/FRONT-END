"use strict";

async function trae_resultado(numero) {
    let base = "http://localhost:3000/";
    let recurso = "api/dobla/";
    let url = base + recurso + numero;
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    return datos;
}

async function genera_serie() {
    const lista = document.getElementById("listaResultados");
    lista.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const n = Math.floor(Math.random() * 100);
        const li = document.createElement("li");
        li.textContent = `Enviando ${n}...`;
        lista.appendChild(li);
        try {
            const res = await trae_resultado(n);
            li.textContent = `Enviado ${n} → recibido ${res}`;
        } catch (err) {
            li.textContent = `Error con ${n}: ${err.message}`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnSerie").addEventListener("click", genera_serie);
});