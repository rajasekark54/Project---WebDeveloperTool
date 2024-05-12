import React from "react";

import logo from "../../images/i2i.png";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="Ideas2IT" />
      </nav>
    </header>
  );
};

export default Header;
