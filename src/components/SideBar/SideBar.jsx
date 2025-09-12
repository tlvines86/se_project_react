import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || defaultAvatar}
          alt={
            currentUser?.name
              ? `${currentUser.name}'s avatar`
              : "Default user avatar"
          }
        />
        <button className="sidebar__edit-btn">Edit</button>
      </div>

      <p className="sidebar__username">{currentUser?.name || "User Name"}</p>

      <button className="sidebar__signout-btn">Sign Out</button>
    </div>
  );
}

export default SideBar;
