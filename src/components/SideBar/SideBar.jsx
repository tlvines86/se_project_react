import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || "default-avatar.png"}
        alt={currentUser?.name || "User Avatar"}
      />
      <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
    </div>
  );
}

export default SideBar;
