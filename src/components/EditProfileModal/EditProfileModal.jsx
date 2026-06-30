import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    avatar: "",
  });

 useEffect(() => {
  if (!isOpen) return;

  setValues({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });
}, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(
      {
        name: values.name,
        avatar: values.avatar,
      },
      resetForm,
    );
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      onSubmit={handleSubmit}
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
