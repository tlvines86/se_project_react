import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({ isOpen, onClose, onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleCloseBtnClick={onClose}
      buttonText="Log In"
      isButtonActive={isFormValid} // <-- enable/disable button
      showSubmitButton={true} // show the submit button from ModalWithForm
    >
      <label className="modal__label">Email*</label>
      <input
        className="modal__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label">Password*</label>
      <input
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <span className="modal__switch-text">
        or{" "}
        <button
          type="button"
          className="modal__switch-btn"
          onClick={switchToRegister}
        >
          Sign Up
        </button>
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
