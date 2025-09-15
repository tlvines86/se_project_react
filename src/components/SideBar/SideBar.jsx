import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);

  const defaultAvatar = "https://via.placeholder.com/80?text=U";

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={`${currentUser.name || "User"}'s avatar`}
        />
      );
    }
    if (currentUser?.name) {
      return (
        <div className="sidebar__avatar-placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    return (
      <img
        className="sidebar__avatar"
        src={defaultAvatar}
        alt="Default avatar"
      />
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        {renderAvatar()}
        <button className="sidebar__edit-btn">Edit</button>
      </div>

      <p className="sidebar__username">{currentUser?.name || "User Name"}</p>

      <button className="sidebar__signout-btn">Sign Out</button>
    </div>
  );
}

export default SideBar;
