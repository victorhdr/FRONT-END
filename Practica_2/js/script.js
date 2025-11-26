// script.js - COMPORTAMIENTO: mostrar/ocultar contraseña, validaciones y manejo simple de usuarios en localStorage

document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic year in footers
  const year = new Date().getFullYear();
  const y1 = document.getElementById('year');
  const y2 = document.getElementById('year2');
  if (y1) y1.textContent = year;
  if (y2) y2.textContent = year;

  // Password toggle buttons (login & register)
  setupPwdToggle('togglePwdLogin', 'loginPassword');
  setupPwdToggle('togglePwdRegister', 'registerPassword');

  // Forms
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Basic keyboard accessibility: focus main on load
  const main = document.getElementById('main');
  if (main) main.focus();
});

/* ---------------------------
   Helpers
   --------------------------- */
function setupPwdToggle(buttonId, inputId) {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    // Update aria label
    btn.setAttribute('aria-label', type === 'text' ? 'Ocultar contraseña' : 'Mostrar contraseña');
    // small visual feedback - change text (you can swap icon instead)
    btn.textContent = type === 'text' ? '🙈' : '👁️';
  });

  // Allow Enter to toggle when focused
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
}

/* ---------------------------
   Registro (simulado con localStorage)
   --------------------------- */
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('registerEmail');
  const pwd = document.getElementById('registerPassword');
  const confirm = document.getElementById('confirmPassword');
  const msgBox = document.getElementById('registerMessage');
  clearAriaInvalid([name, email, pwd, confirm]);

  let valid = true;

  if (!name.value || name.value.trim().length < 2) {
    setInvalid(name, 'Introduce tu nombre.');
    valid = false;
  }

  if (!validateEmail(email.value)) {
    setInvalid(email, 'Introduce un correo válido.');
    valid = false;
  }

  if (!pwd.value || pwd.value.length < 8) {
    setInvalid(pwd, 'La contraseña debe tener al menos 8 caracteres.');
    valid = false;
  }

  if (pwd.value !== confirm.value) {
    setInvalid(confirm, 'Las contraseñas no coinciden.');
    valid = false;
  }

  if (!valid) {
    msgBox.innerHTML = '<span class="text-danger small">Corrige los errores indicados.</span>';
    return;
  }

  // Check if email already registered (localStorage)
  const users = getUsers();
  const exists = users.find(u => u.email.toLowerCase() === email.value.toLowerCase());

  if (exists) {
    // Accessible feedback
    setInvalid(email, 'Correo ya registrado anteriormente.');
    const feedback = document.getElementById('emailFeedback');
    if (feedback) feedback.textContent = 'Correo ya registrado anteriormente.';
    msgBox.innerHTML = '<span class="text-danger small">El correo ya está registrado. Inicia sesión o usa otro correo.</span>';
    return;
  }

  // Save user (NOTA: para práctica, guardamos solo email y nombre; en producción NUNCA guardar contraseñas en claro)
  users.push({
    name: name.value.trim(),
    email: email.value.trim(),
    password: pwd.value // En entorno real: hashear y guardar en servidor
  });
  localStorage.setItem('mitienda_users', JSON.stringify(users));

  // Success
  msgBox.innerHTML = '<span class="text-success small">Cuenta creada correctamente. Redirigiendo al login...</span>';
  // Clear fields
  event.target.reset();

  // Redirect to login after small delay (user-perceptible)
  setTimeout(() => window.location.href = 'index.html', 1200);
}

/* ---------------------------
   Login (simulado)
   --------------------------- */
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail');
  const pwd = document.getElementById('loginPassword');
  const msgBox = document.getElementById('loginMessage');
  clearAriaInvalid([email, pwd]);

  let valid = true;
  if (!validateEmail(email.value)) {
    setInvalid(email, 'Introduce un correo válido.');
    valid = false;
  }
  if (!pwd.value) {
    setInvalid(pwd, 'La contraseña es obligatoria.');
    valid = false;
  }
  if (!valid) {
    msgBox.innerHTML = '<span class="text-danger small">Corrige los errores.</span>';
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.value.toLowerCase());

  if (!user) {
    setInvalid(email, 'Correo no registrado.');
    msgBox.innerHTML = '<span class="text-danger small">Correo no registrado. Regístrate primero.</span>';
    return;
  }

  if (user.password !== pwd.value) {
    setInvalid(pwd, 'Contraseña incorrecta.');
    msgBox.innerHTML = '<span class="text-danger small">Contraseña incorrecta.</span>';
    return;
  }

  // Login success (simulación)
  msgBox.innerHTML = `<span class="text-success small">¡Bienvenido, ${escapeHtml(user.name)}! Has iniciado sesión correctamente.</span>`;
  // Simula persistencia de sesión
  sessionStorage.setItem('mitienda_session', JSON.stringify({ email: user.email, name: user.name }));
  // Redirige a "home" (aquí queda en mismo sitio)
  setTimeout(() => {
    msgBox.innerHTML += ' <span class="small">Redirigiendo...</span>';
    // En práctica podría redirigir a index.html o dashboard
  }, 800);
}

/* ---------------------------
   Utilities
   --------------------------- */
function validateEmail(email) {
  if (!email) return false;
  // Simple regex para validar
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function getUsers() {
  try {
    const raw = localStorage.getItem('mitienda_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setInvalid(element, message) {
  if (!element) return;
  element.classList.add('is-invalid');
  element.setAttribute('aria-invalid', 'true');
  if (message) {
    const feedback = element.parentElement ? element.parentElement.querySelector('.invalid-feedback') : null;
    if (feedback) feedback.textContent = message;
  }
  // focus first invalid
  element.focus();
}

function clearAriaInvalid(elements) {
  elements.forEach(el => {
    if (!el) return;
    el.classList.remove('is-invalid');
    el.removeAttribute('aria-invalid');
  });
}

// small escaping
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
