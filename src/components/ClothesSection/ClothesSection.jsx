import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, handleAddBtnClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-sction__header">
        <p className="clothes-section__your-items">Your items</p>
        <button
          onClick={handleAddBtnClick}
          type="button"
          className="clothes-section__add-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
