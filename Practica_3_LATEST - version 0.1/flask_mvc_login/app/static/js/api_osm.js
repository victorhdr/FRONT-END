document.addEventListener("DOMContentLoaded", () => {

    // Centrar el mapa en España (lat, lon)
    const map = L.map('map').setView([40.4168, -3.7038], 6);

    // Cargar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Marcador en Madrid
    const marker = L.marker([40.4168, -3.7038]).addTo(map);

    // Popup
    marker.bindPopup("<b>📍 Madrid</b><br>Centro de España.").openPopup();
});
