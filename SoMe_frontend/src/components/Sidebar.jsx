import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import homeIcon from "../../../img/home_263115.png";
import UserIcon from "../../../img/user_3917688.png";

function Sidebar() {
  const context = useContext(AppContext);

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-button">
        <img src={homeIcon} alt="Home" className="home-icon" />{" "}
        <span className="button-text">Home</span>
      </Link>
      {context.loggedInUser === undefined || context.loggedInUser === null ? (
        <div></div>
      ) : (
        <Link
          to={`/profile/${context.loggedInUser.userId}`}
          className="sidebar-button"
        >
          <img src={UserIcon} alt="User" className="user-icon" />{" "}
          <span className="button-text">Profile</span>
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
