import Logo from "../../../img/group-chat_1910943.png";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} alt="Logo" className="header-icon" />
        <span className="header-text">MindMingle</span>
      </div>
    </header>
  );
}

export default Header;
