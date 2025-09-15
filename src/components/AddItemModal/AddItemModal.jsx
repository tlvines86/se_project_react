import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ isOpen, handleCloseBtnClick, onAddItemModalSubmit }) {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      submitText="Add Garment"
      isOpen={isOpen}
      handleCloseBtnClick={handleCloseBtnClick}
      onSubmit={handleSubmit}
      isButtonActive={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ""}
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl || ""}
        />
      </label>

      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((temp) => (
          <label key={temp} className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="temperature"
              value={temp}
              checked={values.temperature === temp}
              onChange={handleChange}
              className="modal__radio-input"
              required
            />
            {temp.charAt(0).toUpperCase() + temp.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
