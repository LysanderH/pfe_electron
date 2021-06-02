import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/LessonList.scss';
import apiClient from '../utils/apiClient';

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const formatLinkArray = (rawLinks) => {
    rawLinks.pop();
    rawLinks.shift();
    setLinks(rawLinks);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('courses')
      .then((response) => {
        console.log(response);
        setLessons(response.data.courses.data);
        formatLinkArray(response.data.courses.links);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const getLessons = (e, pageNum) => {
    e.preventDefault();
    setLoading(true);
    apiClient
      .get(`courses?page=${pageNum}`)
      .then((response) => {
        setLessons(response.data.courses.data);
        formatLinkArray(response.data.courses.links);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
      });
  };

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
        <Link to="/lessons/create" className={`${styles.lesson_list__new} btn`}>
          Ajouter une nouvelle leçon
        </Link>
        <table className={styles.lesson_list__table}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons
              ? lessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <th scope="row">{lesson.title}</th>
                    <td>
                      <Link
                        to={`/lessons/${lesson.id}`}
                        className={`${styles.lesson_list__btn} btn`}
                      >
                        Voir la lesson<span className="sr-only"> Titre</span>
                      </Link>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
        {links.length > 1 ? (
          <ul className={styles.lesson_list__pagination}>
            {links.map((link) => (
              <li
                className={styles.lesson_list__pagination__item}
                key={link.id}
              >
                <button
                  type="button"
                  className={`${styles.lesson_list__pagination__link} ${
                    link.active
                      ? styles.lesson_list__pagination__link__active
                      : ''
                  }`}
                  onClick={(e) => getLessons(e, link.label)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </section>
    </>
  );
}
