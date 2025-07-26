import "./SideBar.css";
import "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default Sidebar;
