import "./ModalWithForm.css";
import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);
}

function ModalWithForm({
  children,
  title,
  isOpen,
  onSubmit,
  handleCloseBtnClick,
  showSubmitButton = true,
  submitText = "Submit",
  isButtonActive = false,
}) {
  useModalClose(isOpen, handleCloseBtnClick);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-btn"
          onClick={handleCloseBtnClick}
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {showSubmitButton && (
            <button
              type="submit"
              className={`modal__submit-btn ${
                isButtonActive ? "modal__submit-btn--active" : ""
              }`}
              disabled={!isButtonActive}
            >
              {submitText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
export { useModalClose };
