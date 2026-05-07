import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function handleSubmit(e) {
  e.preventDefault();

  onAddItem(
    {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    },
    resetForm 
  );
}

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      name="add-item"
      buttonText="Add garment"
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
        Image URL
        <input
  className="modal__input"
  type="url"
  name="imageUrl"
  value={values.imageUrl}
  onChange={handleChange}
  placeholder="Image URL"
  required
/>
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">
  Select weather type:
</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;