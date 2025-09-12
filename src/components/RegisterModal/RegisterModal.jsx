import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({ isOpen, onClose, onRegister, switchToLogin }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  const isFormValid =
    name.trim() !== "" &&
    avatar.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleCloseBtnClick={onClose}
      buttonText="Sign Up"
      isButtonActive={isFormValid}
      showSubmitButton={true}
    >
      <label className="modal__label" htmlFor="register-email">
        Email*
      </label>
      <input
        id="register-email"
        className="modal__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="register-password">
        Password*
      </label>
      <input
        id="register-password"
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="register-name">
        Name*
      </label>
      <input
        id="register-name"
        className="modal__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL*
      </label>
      <input
        id="register-avatar"
        className="modal__input"
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />

      <span className="modal__switch-text">
        or{" "}
        <button
          type="button"
          className="modal__switch-btn"
          onClick={switchToLogin}
        >
          Log In
        </button>
      </span>
    </ModalWithForm>
  );
}

export default RegisterModal;
