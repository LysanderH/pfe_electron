import React from 'react';
import styles from '../styles/pages/LessonList.scss';

export default function LessonList() {
  return (
    <>
      <div className={styles.header}>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <a href="/disconnect" className={`${styles.header__btn} btn`}>
          Se déconnecter
        </a>
      </div>
      <section className={styles.lesson_list}>
        <h2 className={styles.lesson_list__heading}>Liste des lessons</h2>
        <a href="/lesson/create" className={`${styles.lesson_list__new} btn`}>
          Ajouter une nouvelle leçon
        </a>
        <table className={styles.lesson_list__table}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Date</th>
              <th scope="col">Thème</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Eynatten</th>
              <td>10h00 21/01/2021</td>
              <td>Mat avec roi et dame</td>
              <td>
                <a href="/" className={`${styles.lesson_list__btn} btn`}>
                  Voir la lesson<span className="sr-only"> Titre</span>
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Eynatten 2</th>
              <td>15h00 21/01/2021</td>
              <td>Mat avec roi et dame</td>
              <td>
                <a href="/" className={`${styles.lesson_list__btn} btn`}>
                  Voir la lesson<span className="sr-only"> Titre</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
