import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/ClassList.scss';

export default function ClassList() {
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
      <section className={styles.classes_list}>
        <h2 className={styles.classes_list__heading}>Liste de vos classes</h2>
        <Link
          to="/classes/create"
          className={`${styles.classes_list__new} btn`}
        >
          Créer une nouvelle classe
        </Link>
        <table className={styles.classes_list__table}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Nombre d’élèves</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Eynatten 1</th>
              <td>5</td>
              <td>
                <a href="/" className={`${styles.classes_list__btn} btn`}>
                  Voir la classe<span className="sr-only"> Titre</span>
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Eynatten 2</th>
              <td>2</td>
              <td>
                <Link to="/" className={`${styles.classes_list__btn} btn`}>
                  Voir la classe<span className="sr-only"> Titre</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
