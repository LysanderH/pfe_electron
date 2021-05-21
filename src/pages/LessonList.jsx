import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/LessonList.scss';

export default function LessonList() {
  // useEffect(() => {
  //   apiClient
  //     .get('courses')
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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
      <section className={styles.lesson_list}>
        <h2 className={styles.lesson_list__heading}>Liste des lessons</h2>
        <Link
          href="/lesson/create"
          className={`${styles.lesson_list__new} btn`}
        >
          Ajouter une nouvelle leçon
        </Link>
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
                <Link href="/" className={`${styles.lesson_list__btn} btn`}>
                  Voir la lesson<span className="sr-only"> Titre</span>
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Eynatten 2</th>
              <td>15h00 21/01/2021</td>
              <td>Mat avec roi et dame</td>
              <td>
                <Link href="/" className={`${styles.lesson_list__btn} btn`}>
                  Voir la lesson<span className="sr-only"> Titre</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
