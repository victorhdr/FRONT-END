export const RegisterModel = {
  validate({ name, email, password, password2 }) {
    const errors = {};

    if (!name.trim()) errors.name = "Introduce tu nombre.";

    if (!email.trim()) errors.email = "Introduce tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Correo no válido.";
    }

    if (password.length < 6)
      errors.password = "La contraseña debe tener al menos 6 caracteres.";

    if (password !== password2)
      errors.password2 = "Las contraseñas no coinciden.";

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  saveUser({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Comprobar si el correo ya existe
    if (users.some(u => u.email === email)) {
      return { success: false, message: "Ese correo ya está registrado." };
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  }
};
