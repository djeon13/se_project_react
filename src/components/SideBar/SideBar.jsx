import "./SideBar.css";

function SideBar({ name }) {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src="https://i.pravatar.cc/40"
        alt="avatar"
      />

      <p className="sidebar__username">
        {name}
      </p>
    </div>
  );
}

export default SideBar;