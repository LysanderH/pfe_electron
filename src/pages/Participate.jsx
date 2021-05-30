import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles/pages/Start.scss';

export default function Participate() {
  return (
    <div>
      <form className={styles.start__form} onSubmit={(e) => startClass(e)}>
        <label htmlFor="roomId" className={styles.start__label}>
          Numéro de la conférence
          <input
            type="text"
            id="roomId"
            name="roomId"
            className={styles.start__select}
          />
        </label>
        <button className="btn">Commencer</button>
      </form>
      <Link to="/" className="back">
        Retour
      </Link>
    </div>
  );
}
