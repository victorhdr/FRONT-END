export const RegisterView = {
  getElements() {
    return {
      form: document.getElementById("registerForm"),
      name: document.getElementById("regName"),
      email: document.getElementById("regEmail"),
      password: document.getElementById("regPassword"),
      password2: document.getElementById("regPassword2"),
      message: document.getElementById("registerMessage")
    };
  },

  clear() {
    const { name, email, password, password2, message } = this.getElements();
    [name, email, password, password2].forEach(el => {
      el.classList.remove("is-invalid");
    });
    message.innerHTML = "";
  },

  showErrors(errors) {
    const els = this.getElements();
    Object.keys(errors).forEach(key => {
      els[key].classList.add("is-invalid");
      const feedback = els[key].nextElementSibling;
      if (feedback) feedback.textContent = errors[key];
    });
  },

  showSuccess(msg) {
    this.getElements().message.innerHTML =
      `<span class="text-success small">${msg}</span>`;
  },

  showError(msg) {
    this.getElements().message.innerHTML =
      `<span class="text-danger small">${msg}</span>`;
  },

  bindSubmit(handler) {
    this.getElements().form.addEventListener("submit", handler);
  }
};
