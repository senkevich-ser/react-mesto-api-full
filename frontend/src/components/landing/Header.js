import React from "react";
import logo from "../../images/logo_russia.svg";

function Header({ children }) {
  return (
    <header className="header wrapper">
      <img src={logo} alt="логотип" className="header__logo" />
      {children}
    </header>
  );
}

export default Header;
