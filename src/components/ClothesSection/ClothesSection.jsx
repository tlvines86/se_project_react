import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddBtnClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__your-items">Your items</p>
        <button
          onClick={handleAddBtnClick}
          type="button"
          className="clothes-section__add-btn"
        >
          + Add New
        </button>
      </div>

      {userItems.length > 0 ? (
        <ul className="clothes-section__cards">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike || (() => {})}
            />
          ))}
        </ul>
      ) : (
        <p className="clothes-section__empty">You have no items yet.</p>
      )}
    </div>
  );
}

export default ClothesSection;
