import "./SideBar.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleOpenProfileModal }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const defaultAvatar = "https://via.placeholder.com/80?text=U";

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
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

  const handleEditProfile = () => {
    if (handleOpenProfileModal) handleOpenProfileModal();
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        {renderAvatar()}
        <button className="sidebar__edit-btn" onClick={handleEditProfile}>
          Edit
        </button>
      </div>
      <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
      <button className="sidebar__signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;
