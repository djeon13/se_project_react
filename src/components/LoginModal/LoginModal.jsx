import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, onRegister }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  function handleRegisterClick() {
  onClose();
  onRegister();
}

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(
      {
        email: values.email,
        password: values.password,
      },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log In"
      name="login"
      buttonText="Log In"
      onSubmit={handleSubmit}
      secondaryButtonText="or Sign Up"
      onSecondaryClick={handleRegisterClick}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
