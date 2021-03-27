import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import sideImg from '../../assets/img/login.jpg';
import styles from '../styles/pages/Login.scss';
import Menu from './Menu';

export default function Login(props) {
  const [passwordShown, setPasswordShown] = useState(false);

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    return props.history.push('/register');
  };

  return (
    <section className={styles.login}>
      <h2 aria-level="2">Se connecter</h2>
      <Menu />
      <form
        action="/"
        method="get"
        onSubmit={(e) => {
          submitLogin(e);
        }}
        className={styles.login__form}
      >
        <label htmlFor="email" className="label">
          <span>Email</span>
          <input type="email" id="email" placeholder="exemple@mail.com" />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            type={passwordShown ? 'text' : 'password'}
            id="password"
            placeholder="Mot de passe"
          />
          <button type="button" onClick={showPassword}>
            Afficher le mot de passe
          </button>
        </label>
        <button type="submit" className="btn btn--submit">
          Se connecter
        </button>
      </form>
      <nav className={styles.login__nav}>
        <h3 className="sr-only">Navigation de connexion</h3>
        <Link to="/register">Je n’ai pas de compte</Link>
        <Link to="/reset-password">J’ai ouvlié mon mot de passe</Link>
      </nav>
      <figure className={styles.login__figure}>
        <img src={sideImg} alt="" className={styles.login__img} />
      </figure>
    </section>
  );
}
