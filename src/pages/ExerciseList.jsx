import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/ExercisesList.scss';
import apiClient from '../utils/apiClient';

export default function ExerciseList() {
  const [PageIndex, setPageIndex] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [links, setLinks] = useState([]);
  const [tactics, setTactics] = useState([]);

  useEffect(() => {
    apiClient
      .get('exercises')
      .then((response) => {
        console.log(response);
        setExercises(response.data.exercises.data);
        setLinks(response.data.exercises.links);
        setTactics(response.data.tactics);
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getExercisesByTactics = (e) => {
    e.preventDefault();
    apiClient
      .get(`exercises?tactic=${e.target.value}`)
      .then((response) => {
        console.log(response);
        setExercises(response.data.exercises.data);
        setLinks(response.data.exercises.links);
        return null;
      })
      .catch((error) => {
        console.log(error);
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
      <section className={styles.exercises_list}>
        <h2 className={styles.exercises_list__heading}>
          Liste de vos exercices
        </h2>
        <Link
          to="/exercises/create"
          className={`${styles.exercises_list__new} btn`}
        >
          Créer un exercice
        </Link>
        <label htmlFor="choice" className={styles.exercises_list__label}>
          <select
            id="choice"
            className={styles.exercises_list__select}
            onChange={(e) => getExercisesByTactics(e)}
          >
            {tactics.map((tactic) => (
              <option key={tactic.id}>{tactic.name}</option>
            ))}
          </select>
        </label>
        <ul className={styles.exercises_list__list}>
          {exercises ? (
            exercises.map((exercise) => (
              <li className={styles.exercises_list__item} key={exercise.id}>
                <Link
                  to={`exercises/show/${exercise.id}`}
                  className={styles.exercises_list__link}
                >
                  <img
                    src="http://api.localhost/storage/img/exemple.png"
                    alt="Positions des pièces"
                    className={styles.exercises_list__img}
                  />
                  <p className={styles.exercises_list__title}>Gain de pièce</p>
                  <span className={styles.exercises_list__tag}>
                    La fourchette
                  </span>
                  <div className={styles.exercises_list__color} />
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.exercises_list__item}>
              Il n’y a pas encore d’exercices
            </li>
          )}
        </ul>
        {links.count > 3 ? (
          <ul className={styles.exercises_list__pagination}>
            {links.map((link, index) => (
              <li
                className={styles.exercises_list__previous}
                key={link.toString()}
              >
                <Link to={link.url}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to={`exercises/${PageIndex + 1}`}>Prochain</Link>
            </li>
          </ul>
        ) : (
          ''
        )}
      </section>
    </>
  );
}
