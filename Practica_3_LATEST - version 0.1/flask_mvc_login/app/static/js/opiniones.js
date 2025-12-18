// ----------------------------------------------
// Ejercicio 8.7 — Seguridad: CORS + CSRF + XSS
// ----------------------------------------------

const btn = document.getElementById("btnEnviarOpinion");
const input = document.getElementById("opinionInput");
const lista = document.getElementById("listaOpiniones");

// Token CSRF simulado (para demostrar el envío correcto)
const CSRF_TOKEN = "TOKEN_SEGURO_DEMO";

btn.addEventListener("click", async () => {
    const texto = input.value.trim();

    if (!texto) {
        alert("La opinión no puede estar vacía.");
        return;
    }

    try {
        const r = await fetch("/api/opinion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": CSRF_TOKEN, // ← Cabecera personalizada
                "Accept": "application/json"
            },
            body: JSON.stringify({ texto })
        });

        const data = await r.json();

        if (!r.ok) {
            alert("Error: " + (data.error || "Error desconocido"));
            return;
        }

        // XSS seguro → JAMÁS usar innerHTML
        const div = document.createElement("div");
        div.className = "alert alert-secondary p-2";
        div.textContent = data.texto;  // ← evita XSS real

        lista.appendChild(div);
        input.value = "";

    } catch (err) {
        console.error(err);
        alert("Error enviando opinión.");
    }
});
