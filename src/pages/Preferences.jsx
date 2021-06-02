import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/Preferences.scss';
import apiClient from '../utils/apiClient';

export default function Preferences() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('user')
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newpassword = e.target.newpassword ? e.target.newpassword.value : '';
    const newpasswordConfirmation = e.target.newpassword_confirmation
      ? e.target.newpassword_confirmation.value
      : '';

    apiClient
      .put(`users/${user.id}`, {
        name,
        email,
        password,
        newpassword,
        newpassword_confirmation: newpasswordConfirmation,
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return loading ? (
    <Loading />
  ) : (
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
        <form
          className={styles.preferences__form}
          onSubmit={(e) => {
            updateUser(e);
          }}
        >
          <label htmlFor="name" className={styles.preferences__label}>
            <span className="label">Nom</span>
            <input
              type="text"
              id="name"
              placeholder="Max Mustermann"
              name="name"
              defaultValue={user.name ?? ''}
              required
            />
          </label>
          <label htmlFor="email" className={styles.preferences__label}>
            <span className="label">Email</span>
            <input
              type="email"
              id="email"
              placeholder="exemple@mail.com"
              name="email"
              defaultValue={user.email ?? ''}
              required
            />
          </label>
          <label htmlFor="password" className={styles.preferences__label}>
            <span className="label">Mot de passe courant</span>
            <input
              type="password"
              id="password"
              placeholder="**********"
              name="password"
              required
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
              name="newpassword__confirmation"
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
