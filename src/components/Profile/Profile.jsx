import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemModal from "../ItemModal/ItemModal";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddBtnClick,
  onCardLike,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  if (!currentUser) {
    return <p className="profile__loading">Loading profile...</p>;
  }

  const userItems = clothingItems.filter(
    (item) =>
      item.owner === currentUser._id || item.owner?._id === currentUser._id
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleOpenProfileModal={() => setProfileModalOpen(true)} />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          handleAddBtnClick={handleAddBtnClick}
          handleCardClick={handleCardClick}
          clothingItems={userItems}
          handleCardLike={onCardLike}
          isLoggedIn={true}
        />
      </section>

      {isProfileModalOpen && (
        <ItemModal
          activeModal="editProfile"
          handleCloseBtnClick={() => setProfileModalOpen(false)}
          currentUser={currentUser}
          onUpdateUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default Profile;
