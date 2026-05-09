import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({ onAddItem, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button className="header__add-btn" onClick={onAddItem}>
          + Add Clothes
        </button>

        <Link to="/profile" className="header__user">
          <span className="header__username">John Doe</span>

          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            className="header__avatar"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
