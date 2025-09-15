import "./ItemModal.css";
import deleteItem from "../../assets/deleteItem.png";
import { useModalClose } from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  handleCloseBtnClick,
  card,
  handleCardDelete,
}) {
  useModalClose(activeModal === "preview", handleCloseBtnClick);

  const { currentUser } = useContext(CurrentUserContext);

  const isOwn =
    card?.owner === currentUser?._id || card?.owner?._id === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseBtnClick}
          type="button"
          className="modal__close-btn"
        ></button>

        <img
          src={card?.imageUrl}
          alt={`Card showing ${card?.name || "item"}`}
          className="modal__image"
        />

        <div className="modal__footer">
          <div className="modal__caption-container">
            <h2 className="modal__caption">{card?.name || "Untitled"}</h2>
            <p className="modal__weather">Weather: {card?.weather || "N/A"}</p>
          </div>

          <img
            className={itemDeleteButtonClassName}
            src={deleteItem}
            alt="delete-btn"
            onClick={() => handleCardDelete(card._id)}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
