import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  handleCloseBtnClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={handleCloseBtnClick}
          type="button"
          className="modal__close-btn"
        />
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
