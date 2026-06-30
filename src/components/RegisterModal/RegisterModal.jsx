import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onLogin }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  function handleLoginClick() {
  onClose();
  onLogin();
}

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(
      {
        name: values.name,
        avatar: values.avatar,
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
        title="Sign Up"
        name="register"
        buttonText="Sign Up"
        onSubmit={handleSubmit}
        secondaryButtonText="or Log In"
        onSecondaryClick={handleLoginClick}
        >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </label>

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

export default RegisterModal;
