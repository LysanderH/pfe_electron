import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sideImg from '../../assets/img/login.jpg';
import styles from '../styles/pages/Login.scss';
import Menu from './Menu';

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    // TODO check email and set error

    const password = e.target.password.value;
    // TODO check password and set error

    axios.get('http://api.localhost/sanctum/csrf-cookie').then((response) => {
      axios
          .post('http://api.localhost/api/auth/login', {
            email,
            password,
          })
          .then((user) => {
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
            });
        }).catch((error) => {
          console.log(error);
        });
    };

  return (
    <section className={styles.login}>
      <h2 aria-level="2" className={styles.login__heading}>
        Se connecter
      </h2>
      <Menu />
      <form
        action="/"
        method="get"
        onSubmit={(e) => {
          submitLogin(e);
        }}
        className={styles.login__form}
      >
        <label htmlFor="email" className={styles.login__label}>
          <span>Email</span>
          <input
            type="email"
            id="email"
            placeholder="exemple@mail.com"
            name="email"
            />
        </label>
        <label htmlFor="password" className={styles.login__label}>
          <span>Password</span>
          <div className={styles.login__password_wrapper}>
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Mot de passe"
            />
            <button type="button" onClick={showPassword}>
              <span className="sr-only">Afficher le mot de passe</span>
            </button>
          </div>
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
