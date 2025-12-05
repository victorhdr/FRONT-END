import { RegisterModel } from "./registerModel.js";
import { RegisterView } from "./registerView.js";

document.addEventListener("DOMContentLoaded", () => {
  const view = RegisterView;

  view.bindSubmit((event) => {
    event.preventDefault();
    view.clear();

    const { name, email, password, password2 } = view.getElements();

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      password2: password2.value
    };

    const { isValid, errors } = RegisterModel.validate(data);

    if (!isValid) {
      view.showErrors(errors);
      return;
    }

    const result = RegisterModel.saveUser(data);

    if (!result.success) {
      view.showError(result.message);
      return;
    }

    view.showSuccess("Usuario creado correctamente. Redirigiendo...");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1500);
  });
});
