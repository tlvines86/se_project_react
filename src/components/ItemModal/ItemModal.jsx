import "./ItemModal.css";
import { useState } from "react";

function ItemModal({
  activeModal,
  handleCloseBtnClick,
  currentUser,
  onUpdateUser,
}) {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    apiUpdateUserProfile({ name, avatar })
      .then((updatedUser) => {
        onUpdateUser(updatedUser);
        handleCloseBtnClick();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={`modal ${activeModal === "editProfile" ? "modal_open" : ""}`}
    >
      <button className="modal__close" onClick={handleCloseBtnClick}>
        ×
      </button>
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ItemModal;
