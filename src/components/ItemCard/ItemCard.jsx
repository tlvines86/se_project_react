import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  const handleCardClick = () => {
    if (onCardClick) onCardClick(item);
  };

  const handleLike = () => {
    if (!currentUser) return;
    if (onCardLike) onCardLike(item);
  };

  const likeButtonClass = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button className={likeButtonClass} onClick={handleLike}>
          ❤️ {item.likes ? item.likes.length : 0}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
