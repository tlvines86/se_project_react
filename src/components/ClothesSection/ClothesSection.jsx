import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddBtnClick,
  handleCardLike,
  isLoggedIn,
}) {
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

      {clothingItems.length > 0 ? (
        <ul className="clothes-section__cards">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike || (() => {})}
              isLoggedIn={isLoggedIn}
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
