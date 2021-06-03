import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import sideImg from '../../assets/img/login.jpg';
import styles from '../styles/pages/login.module.scss';
import apiClient from '../utils/apiClient';
import Loading from '../components/Loading';

export default function ForgotPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  /**
   * Check if email is correctly formatted
   *
   * @param {string} email
   * @returns boolean
   */
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitLogin = (e) => {
    e.preventDefault();

    setLoadingStatus(true);

    const email = e.target.email.value;

    if (!validateEmail(email)) {
      console.log(email);
      setLoadingStatus(false);
      return setError(
        'Veuillez mettre une adresse email au format example@mail.com'
      );
    }

    apiClient
      .post('forgot-password', {
        email,
      })
      .then((response) => {
        setRedirect(true);
        setLoadingStatus(false);
        return null;
      })
      .catch(() => {
        setLoadingStatus(false);
        setError('Les identifiants que vous avez fourni ne sont pas correct');
      });

    return null;
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return loadingStatus ? (
    <Loading />
  ) : (
    <section className={styles.login}>
      <h2 aria-level="2" className={styles.login__heading}>
        Se connecter
      </h2>
      <div className={styles.header}>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <Link to="/register" className={`${styles.header__btn} btn`}>
          Créer un compte
        </Link>
      </div>
      <form
        action="/"
        method="get"
        onSubmit={(e) => {
          submitLogin(e);
        }}
        className={styles.login__form}
      >
        {error ? (
          <p className={styles.login__error}>
            Veuillez insérer une adresse mail valable exemple@mail.com
          </p>
        ) : null}
        <p>Vous recevrez un email pour enregistrer un nouveau mot de passe</p>
        <label htmlFor="email" className={styles.login__label}>
          <span className="label">Email</span>
          <input
            type="email"
            id="email"
            placeholder="exemple@mail.com"
            name="email"
          />
        </label>
        <button
          type="submit"
          className="btn btn--submit"
          disabled={loadingStatus}
        >
          Soumettre
        </button>
      </form>
      <nav className={styles.login__nav}>
        <h3 className="sr-only">Navigation de connexion</h3>
        <Link to="/register" className={styles.login__item}>
          Je n’ai pas de compte
        </Link>
      </nav>
      <figure className={styles.login__figure}>
        <img src={sideImg} alt="" className={styles.login__img} />
      </figure>
    </section>
  );
}
