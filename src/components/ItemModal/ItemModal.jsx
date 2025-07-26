import "./ItemModal.css";
import deleteItem from "../../assets/deleteItem.png";

function ItemModal({
  activeModal,
  handleCloseBtnClick,
  card,
  handleCardDelete,
}) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseBtnClick}
          type="button"
          className="modal__close-btn"
        ></button>
        <img
          src={card.imageUrl}
          alt={`Card showing ${card?.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__caption-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <img
            className="modal__delete-btn"
            src={deleteItem}
            alt="delete-btn"
            onClick={() => {
              handleCardDelete(card._id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
