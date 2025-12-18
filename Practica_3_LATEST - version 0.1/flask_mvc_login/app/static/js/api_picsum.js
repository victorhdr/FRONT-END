//---------------------------------------------
// API Picsum - Cargar foto aleatoria
//---------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnFoto");
    const result = document.getElementById("fotoResult");

    btn.addEventListener("click", () => {

        // Mensaje de espera
        result.innerHTML = "<p class='text-muted'>Cargando foto...</p>";

        /*
          API Lorem Picsum
          - https://picsum.photos/800/500 → genera una foto aleatoria
          - ?random=[timestamp] evita que el navegador use caché
        */
        const imageUrl = `https://picsum.photos/800/500?random=${Date.now()}`;

        const img = new Image();
        img.id = "fotoRandom";
        img.src = imageUrl;

        // Cuando carga correctamente → mostramos la foto
        img.onload = () => {
            result.innerHTML = `
                <img id="fotoRandom" src="${img.src}" alt="Foto aleatoria de Picsum">
                <p class="mt-3 small text-muted">Imagen generada por la API Lorem Picsum</p>
            `;
        };

        // Si hay cualquier error → mostramos mensaje
        img.onerror = () => {
            result.innerHTML = `
                <p class="text-danger">
                    ❌ Error al cargar la imagen desde Picsum.
                </p>
            `;
        };

    });

});
