let player;

// Esta función la llama automáticamente la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '350',
        width: '600',
        videoId: 'M7lc1UVf-VE', // Se puede cambiar el video
        playerVars: {
            autoplay: 0,
            controls: 1
        }
    });
}

// Controles personalizados
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btnPlay").onclick = () => {
        player.playVideo();
    };

    document.getElementById("btnPause").onclick = () => {
        player.pauseVideo();
    };

    document.getElementById("btnStop").onclick = () => {
        player.stopVideo();
    };

});
