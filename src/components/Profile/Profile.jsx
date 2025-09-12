import "./Profile.css";
import { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddBtnClick,
  onEditProfileClick,
  setClothingItems,
}) {
  const { currentUser, logout } = useContext(CurrentUserContext);

  const handleCardLike = (item) => {
    if (!currentUser) return;

    const isLiked = item.likes?.some((id) => id === currentUser._id);

    const updatedItems = clothingItems.map((i) => {
      if (i._id === item._id) {
        const updatedLikes = isLiked
          ? i.likes.filter((id) => id !== currentUser._id)
          : [...(i.likes || []), currentUser._id];
        return { ...i, likes: updatedLikes };
      }
      return i;
    });

    setClothingItems(updatedItems);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button className="profile__signout-btn" onClick={logout}>
          Sign out
        </button>
      </section>

      <section className="profile__user-info">
        <div className="profile__avatar-container">
          <img
            src={currentUser?.avatar || "default-avatar.png"}
            alt="User Avatar"
            className="profile__avatar"
          />
          <button className="profile__edit-btn" onClick={onEditProfileClick}>
            Edit profile
          </button>
        </div>
        <h2 className="profile__name">{currentUser?.name || "User Name"}</h2>
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          handleAddBtnClick={handleAddBtnClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
