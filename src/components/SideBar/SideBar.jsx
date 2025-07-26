import "./SideBar.css";
import profileAvatar from "../../assets/profile-avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={profileAvatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
