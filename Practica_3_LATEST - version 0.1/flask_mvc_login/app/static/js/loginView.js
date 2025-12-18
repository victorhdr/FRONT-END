// app/static/js/loginView.js
export const LoginView = {
  getElements() {
    return {
      form: document.getElementById('loginForm'),
      email: document.getElementById('loginEmail'),
      password: document.getElementById('loginPassword'),
      togglePwdBtn: document.getElementById('togglePwdLogin'),
      messageBox: document.getElementById('loginMessage')
    };
  },

  getFormData() {
    const { email, password } = this.getElements();
    return {
      email: email ? email.value : '',
      password: password ? password.value : ''
    };
  },

  clearValidation() {
    const { email, password, messageBox } = this.getElements();
    [email, password].forEach(el => {
      if (!el) return;
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
    });
    if (messageBox) {
      messageBox.innerHTML = '';
    }
  },

  showErrors(errors) {
    const { email, password, messageBox } = this.getElements();

    if (errors.email && email) {
      email.classList.add('is-invalid');
      email.setAttribute('aria-invalid', 'true');
      const feedback = email.closest('.form__group')?.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = errors.email;
    }

    if (errors.password && password) {
      password.classList.add('is-invalid');
      password.setAttribute('aria-invalid', 'true');
      const feedback = password.closest('.form__group')?.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = errors.password;
    }
  },

  showSubmitting() {
    const { messageBox } = this.getElements();
    if (messageBox) {
      messageBox.innerHTML = '<span class="text-muted small">Enviando datos...</span>';
    }
  },

  bindSubmit(handler) {
    const { form } = this.getElements();
    if (!form) return;
    form.addEventListener('submit', (event) => {
      handler(event);
    });
  },

  bindTogglePassword(handler) {
    const { togglePwdBtn } = this.getElements();
    if (!togglePwdBtn) return;

    togglePwdBtn.addEventListener('click', () => handler());

    togglePwdBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  },

  togglePasswordVisibility() {
    const { password, togglePwdBtn } = this.getElements();
    if (!password || !togglePwdBtn) return;

    const currentType = password.getAttribute('type');
    const newType = currentType === 'password' ? 'text' : 'password';
    password.setAttribute('type', newType);
    togglePwdBtn.textContent = newType === 'text' ? '🙈' : '👁️';
  }
};
