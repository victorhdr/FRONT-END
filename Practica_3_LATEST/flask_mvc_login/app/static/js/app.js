// app/static/js/app.js
import { LoginController } from './loginController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar año dinámico del footer (común a toda la app)
  const year = new Date().getFullYear();
  const y1 = document.getElementById('year');
  const y2 = document.getElementById('year2');
  if (y1) y1.textContent = year;
  if (y2) y2.textContent = year;

  // Inicializar el controlador de login solo si estamos en la página de login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    LoginController.init();
  }
});
