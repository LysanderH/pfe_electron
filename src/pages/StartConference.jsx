import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles/pages/Start.scss';

export default function StartConference() {
  const [redirect, setRedirect] = useState(false);
  const startClass = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/conference" />;
  }

  return (
    <>
      <div className={styles.background}>
        <section className={styles.start}>
          <h2 className={styles.start__heading}>Commencer une conférence</h2>
          <form className={styles.start__form} onSubmit={(e) => startClass(e)}>
            <label htmlFor="class" className={styles.start__label}>
              <select id="class" className={styles.start__select}>
                <option key="1">Eynatten 1</option>
              </select>
            </label>
            <label htmlFor="cours" className={styles.start__label}>
              <select id="cours" className={styles.start__select}>
                <option key="1">Cours 22/03</option>
              </select>
            </label>
            <button className="btn">Commencer</button>
          </form>
          <Link to="/" className="back">
            Retour
          </Link>
        </section>
      </div>
    </>
  );
}
