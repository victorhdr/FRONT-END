// app/static/js/loginController.js
import { LoginModel } from './loginModel.js';
import { LoginView } from './loginView.js';

export const LoginController = {
  init() {
    LoginView.bindSubmit(this.handleSubmit.bind(this));
    LoginView.bindTogglePassword(() => LoginView.togglePasswordVisibility());
  },

  handleSubmit(event) {
    event.preventDefault();

    LoginView.clearValidation();

    const data = LoginView.getFormData();
    const { isValid, errors } = LoginModel.validateCredentials(data);

    if (!isValid) {
      LoginView.showErrors(errors);
      return;
    }

    LoginView.showSubmitting();

    const form = document.getElementById('loginForm');
    if (form) form.submit();
  }
};
