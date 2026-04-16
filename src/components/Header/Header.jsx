import React from "react";
import "./Header.css"; 
import logo from "../../assets/logo.png";

function Header({ onAddItem, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img
          src={logo}
          alt="WTWR Logo"
          className="header__logo"
        />

        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>

      
      <div className="header__right">
        <button
          className="header__add-btn"
          onClick={onAddItem}
        >
          + Add Clothes
        </button>

        <div className="header__user">
          <span className="header__username">
            John Doe
          </span>

          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="header__avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;