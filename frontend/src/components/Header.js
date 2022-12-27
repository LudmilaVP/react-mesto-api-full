import logo from "../images/header__logo.svg";
import React from 'react';
import { Link, Route } from 'react-router-dom';

function Header({ loggedIn, userEmail, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип сайта Mesto" className="header__logo" />
      {!loggedIn ? (
        <nav>
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__button" to="/sign-in">
              Войти
            </Link>
          </Route>
        </nav>
      ) : (
        <div className="header__menu">
          <p className="header__email">{userEmail}</p>
          <button onClick={onLogout} className="header__button" type="button">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;