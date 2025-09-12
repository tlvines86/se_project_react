import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddBtnClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          handleAddBtnClick={handleAddBtnClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
