import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/ClassList.scss';

export default function ClassList() {
  return (
    <>
      <div className={styles.header}>
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
              <th scope="col">Nombre d'élèves</th>
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
