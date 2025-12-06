"use strict";

async function dobla_con_estado(valor) {
    let base = "http://localhost:3000/";
    let recurso = "api/dobla/";
    let url = base + recurso + valor;

    let respuesta = await fetch(url);

    if (respuesta.status === 200) {
        let datos = await respuesta.json();
        return datos;
    } else {
        return "Error " + respuesta.status;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const inputNum = document.getElementById("inputNum");
    const btn = document.getElementById("btnEstado");
    const out = document.getElementById("out4");

    btn.addEventListener("click", async () => {
        out.textContent = "Llamando al servidor...";
        const valor = inputNum.value.trim();
        try {
            const res = await dobla_con_estado(valor);
            out.textContent = "Respuesta del servidor: " + res;
        } catch (err) {
            out.textContent = "Error en la petición: " + err.message;
        }
    });
});