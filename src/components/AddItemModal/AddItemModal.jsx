import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddItem({
      name,
      imageUrl,
      weather,
    });

    onClose();
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
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
      required
    />
  </label>


  <label className="modal__label">
    Image URL
    <input
      className="modal__input"
      type="url"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Image URL"
      required
    />
  </label>


  <fieldset className="modal__fieldset">
    <legend className="modal__legend">
      Select weather type
    </legend>

    <label className="modal__radio-label">
      <input
        type="radio"
        value="hot"
        checked={weather === "hot"}
        onChange={(e) => setWeather(e.target.value)}
      />
      Hot
    </label>

    <label className="modal__radio-label">
      <input
        type="radio"
        value="warm"
        checked={weather === "warm"}
        onChange={(e) => setWeather(e.target.value)}
      />
      Warm
    </label>

    <label className="modal__radio-label">
      <input
        type="radio"
        value="cold"
        checked={weather === "cold"}
        onChange={(e) => setWeather(e.target.value)}
      />
      Cold
    </label>
  </fieldset>
</ModalWithForm>
  );
}

export default AddItemModal;