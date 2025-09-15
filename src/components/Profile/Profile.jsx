import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddBtnClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <p className="profile__loading">Loading profile...</p>;
  }

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
