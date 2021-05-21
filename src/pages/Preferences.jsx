import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/Preferences.scss';
import apiClient from '../utils/apiClient';

export default function Preferences() {
  const [user, setUser] = useState({});
  useEffect(() => {
    apiClient
      .get('user')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <svg
            height="384pt"
            viewBox="0 -53 384 384"
            width="384pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          </svg>
        </Link>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <Link to="/logout" className={`${styles.header__btn} btn`}>
          Se déconnecter
        </Link>
      </div>
      <section className={styles.preferences}>
        <form className={styles.preferences__form}>
          <label htmlFor="name" className={styles.preferences__label}>
            <span className="label">Nom</span>
            <input
              type="text"
              id="name"
              placeholder="Max Mustermann"
              name="name"
            />
          </label>
          <label htmlFor="email" className={styles.preferences__label}>
            <span className="label">Email</span>
            <input
              type="email"
              id="email"
              placeholder="exemple@mail.com"
              name="email"
            />
          </label>
          <label htmlFor="password" className={styles.preferences__label}>
            <span className="label">Ancien mot de passe</span>
            <input
              type="password"
              id="password"
              placeholder="**********"
              name="password"
            />
          </label>
          <label htmlFor="newpassword" className={styles.preferences__label}>
            <span className="label">Nouveau mot de passe</span>
            <input
              type="password"
              id="newpassword"
              placeholder="***********"
              name="newpassword"
            />
          </label>
          <label htmlFor="confirm" className={styles.preferences__label}>
            <span className="label">confirmer le mot de passe</span>
            <input
              type="password"
              id="confirm"
              placeholder="**********"
              name="confirm"
            />
          </label>
          <button type="submit" className="btn">
            Enregistrer
          </button>
        </form>
      </section>
    </>
  );
}
