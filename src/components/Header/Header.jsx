import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onAddItem, onRegister, onLogin, location, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
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

{isLoggedIn ? (
  <>
    <button
      className="header__add-btn"
      onClick={onAddItem}
    >
      + Add Clothes
    </button>

    <Link to="/profile" className="header__user">
      <span className="header__username">
        {currentUser.name}
      </span>

      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      ) : (
        <div className="header__avatar-placeholder">
          {currentUser.name?.[0]?.toUpperCase()}
        </div>
      )}
    </Link>
  </>
) : (
  <>
    <button
      className="header__auth-btn"
      onClick={onRegister}
    >
      Sign Up
    </button>

    <button
      className="header__auth-btn"
      onClick={onLogin}
    >
      Log In
    </button>
  </>
)}
      </div>
    </header>
  );
}

export default Header;
