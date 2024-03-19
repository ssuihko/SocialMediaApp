import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

function Sidebar() {
  const context = useContext(AppContext);

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">
        Home
      </Link>
      {context.loggedInUser === undefined || context.loggedInUser === null ? (
        <div></div>
      ) : (
        <Link
          to={`/profile/${context.loggedInUser.userId}`}
          className="sidebar-button"
        >
          Profile
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
