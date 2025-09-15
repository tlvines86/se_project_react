import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (currentUser && isOpen) {
      resetForm(
        {
          name: currentUser.name || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Edit profile"
      isOpen={isOpen}
      handleCloseBtnClick={onClose}
      onSubmit={handleSubmit}
      submitText="Save changes"
      isButtonActive={isValid}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
