import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/start.module.scss';
import apiClient from '../utils/apiClient';

export default function Participate() {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const startClass = (e) => {
    e.preventDefault();
    setLoading(true);

    const roomId = e.target.roomId.value;
    console.log(roomId);

    apiClient
      .get(`rooms/connect/${roomId}`)
      .then((response) => {
        setLoading(false);
        setRedirect(true);
        sessionStorage.setItem('roomId', roomId);
        return null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  if (redirect) {
    return <Redirect to="/conference-student" />;
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.background}>
        <section className={styles.start}>
          <h2 className={styles.start__heading}>Participer à une conférence</h2>
          <form className={styles.start__form} onSubmit={(e) => startClass(e)}>
            <label htmlFor="roomId" className={styles.start__label}>
              <span className="label">Numéro de la conférence</span>
              <input
                type="text"
                id="roomId"
                name="roomId"
                min="1"
                className={styles.start__select}
                placeholder="123"
              />
            </label>
            <button type="submit" className="btn">
              Joindre
            </button>
          </form>
          <Link to="/" className="back">
            Retour
          </Link>
        </section>
      </div>
    </>
  );
}
