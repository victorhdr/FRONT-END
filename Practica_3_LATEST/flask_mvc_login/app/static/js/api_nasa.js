document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnLoadNasa");
    const result = document.getElementById("nasaResult");

    btn.addEventListener("click", async () => {

        result.innerHTML = "<p class='text-muted'>Cargando información...</p>";

        try {
            const res = await fetch(
                "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
            );

            const data = await res.json();

            result.innerHTML = `
                <h3>${data.title}</h3>
                <p class="small text-muted">${data.date}</p>

                ${
                  data.media_type === "image"
                    ? `<img id="nasaImage" src="${data.url}" alt="NASA APOD">`
                    : `<iframe width="560" height="315" src="${data.url}" frameborder="0" allowfullscreen></iframe>`
                }

                <p class="mt-3">${data.explanation}</p>
            `;
        } catch (error) {
            result.innerHTML = "<p class='text-danger'>Error al cargar la imagen.</p>";
            console.error(error);
        }
    });
});
