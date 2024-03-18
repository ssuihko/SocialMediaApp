import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">
        Home
      </Link>
      <Link to="/profile" className="sidebar-button">
        Profile
      </Link>
    </div>
  );
}

export default Sidebar;
