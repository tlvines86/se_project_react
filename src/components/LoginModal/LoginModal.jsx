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
    >
      <label className="modal__label" htmlFor="login-email">
        Email*
      </label>
      <input
        id="login-email"
        className="modal__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="login-password">
        Password*
      </label>
      <input
        id="login-password"
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="modal__footer">
        <button
          type="submit"
          className={`modal__submit-btn ${
            isFormValid ? "modal__submit-btn--active" : ""
          }`}
          disabled={!isFormValid}
        >
          Log In
        </button>
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
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
