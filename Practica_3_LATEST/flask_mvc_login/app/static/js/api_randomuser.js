//----------------------------------------------------------
// API RandomUser - Generar usuario aleatorio 
//----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnRandomUser");
    const result = document.getElementById("userResult");

    btn.addEventListener("click", async () => {

        result.innerHTML = "<p class='text-muted'>Generando usuario...</p>";

        try {
            // Llamada API
            const response = await fetch("https://randomuser.me/api/");
            const data = await response.json();
            const user = data.results[0];

            // Tarjeta centrada con foto arriba
            result.innerHTML = `
                <div id="userCard" class="card p-4 shadow-sm text-center" style="max-width: 400px; margin: 0 auto;">
                  
                  <!-- Imagen centrada -->
                  <img id="userImg" 
                       src="${user.picture.large}" 
                       alt="Foto del usuario"
                       style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; box-shadow: 0 3px 8px rgba(0,0,0,0.2);" />

                  <!-- Nombre -->
                  <h4 class="mt-2">${user.name.first} ${user.name.last}</h4>

                  <!-- Datos del usuario -->
                  <p class="mb-1"><strong>📧 Email:</strong> ${user.email}</p>
                  <p class="mb-1"><strong>🌍 País:</strong> ${user.location.country}</p>
                  <p class="mb-1"><strong>🎂 Edad:</strong> ${user.dob.age} años</p>
                  <p class="mb-1"><strong>📱 Teléfono:</strong> ${user.phone}</p>

                </div>
            `;
        } 
        catch (error) {
            console.error(error);
            result.innerHTML = `
                <p class="text-danger">❌ Error al generar el usuario.</p>
            `;
        }

    });

});
