// app/static/js/loginModel.js
export const LoginModel = {
  validateCredentials({ email, password }) {
    const errors = {};

    if (!email || !email.trim()) {
      errors.email = 'Introduce tu correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Introduce un correo válido.';
    }

    if (!password || !password.trim()) {
      errors.password = 'Introduce tu contraseña.';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};
