import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav>
      <h2 className="sro">Navigation principale</h2>
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Accueil
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="login/">
            Login
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/lesson-list">
            Liste des lessons
          </Link>
        </li>
      </ul>
    </nav>
  );
}
