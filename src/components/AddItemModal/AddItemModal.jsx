import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function AddItemModal({ isOpen, handleCloseBtnClick, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };

  // Check if all fields are filled
  const isFormValid =
    name.trim() !== "" && imageUrl.trim() !== "" && weather !== "";

  return (
    <ModalWithForm
      titleText="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      handleCloseBtnClick={handleCloseBtnClick}
      onSubmit={handleSubmit}
      isButtonActive={isFormValid} // pass as prop
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="temperature"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="temperature"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            name="temperature"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
