import axios from 'axios';
import Chessboard from 'chessboardjsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/exercisesList.module.scss';
import apiClient from '../utils/apiClient';

export default function ExerciseList() {
  const [PageIndex, setPageIndex] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [links, setLinks] = useState([]);
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const formatLinkArray = (rawLinks) => {
    rawLinks.pop();
    rawLinks.shift();
    setLinks(rawLinks);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('exercises')
      .then((response) => {
        setExercises(response.data.exercises.data);
        formatLinkArray(response.data.exercises.links);
        setTactics(response.data.tactics);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const getExercisesByTactics = (e) => {
    setLoading(true);
    e.preventDefault();
    setSelectedValue(e.target.value);
    if (e.target.value !== 'default') {
      apiClient
        .get(`exercises?tactic=${e.target.value}`)
        .then((response) => {
          setExercises(response.data.exercises.data);
          formatLinkArray(response.data.exercises.links);
          setLoading(false);
          return null;
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      apiClient
        .get('exercises')
        .then((response) => {
          setExercises(response.data.exercises.data);
          formatLinkArray(response.data.exercises.links);
          setTactics(response.data.tactics);
          setLoading(false);
          return null;
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const getExercises = (e, pageNum) => {
    e.preventDefault();
    setLoading(true);
    apiClient
      .get(`exercises?page=${pageNum}`)
      .then((response) => {
        setExercises(response.data.exercises.data);
        formatLinkArray(response.data.exercises.links);
        setTactics(response.data.tactics);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
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
          <svg
            height="512pt"
            viewBox="0 0 512 512"
            width="512pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m320.820312 371.792969h39.980469v79.957031c0 33.066406-26.902343 59.964844-59.96875 59.964844h-240.867187c-33.0625 0-59.964844-26.898438-59.964844-59.964844v-391.785156c0-33.0625 26.902344-59.964844 59.964844-59.964844h240.867187c33.066407 0 59.96875 26.902344 59.96875 59.964844v79.957031h-39.980469v-79.957031c0-11.019532-8.964843-19.988282-19.988281-19.988282h-240.867187c-11.019532 0-19.988282 8.96875-19.988282 19.988282v391.785156c0 11.019531 8.96875 19.988281 19.988282 19.988281h240.867187c11.023438 0 19.988281-8.96875 19.988281-19.988281zm96.949219-210.167969-28.269531 28.269531 45.972656 45.976563h-258.570312v39.976562h258.570312l-45.972656 45.972656 28.269531 28.269532 94.230469-94.230469zm0 0" />
          </svg>
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
            value={selectedValue}
          >
            <option key={0} value="default">
              Choix d’après la tactique
            </option>

            {tactics.map((tactic) => (
              <option key={tactic.id}>{tactic.name}</option>
            ))}
          </select>
        </label>
        <ul className={styles.exercises_list__list}>
          {exercises.length ? (
            exercises.map((exercise, index) => (
              <li className={styles.exercises_list__item} key={exercise.id}>
                <Link
                  to={`exercises/show/${exercise.id}`}
                  className={styles.exercises_list__link}
                >
                  <Chessboard
                    id={index}
                    position={JSON.parse(exercise.content).fen}
                    width={300}
                    draggable={false}
                  />
                  <p className={styles.exercises_list__title}>
                    {exercise.title}
                  </p>
                  {exercise.tactics
                    ? exercise.tactics.map((tactic) => (
                        <span
                          className={styles.exercises_list__tag}
                          key={tactic.id}
                        >
                          {tactic.name}
                        </span>
                      ))
                    : ''}
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.exercises_list__item}>
              Il n’y a pas encore d’exercices
              <Link
                to="/exercises/create"
                className={`${styles.exercises_list__new} btn`}
              >
                Créer un exercice
              </Link>
            </li>
          )}
        </ul>
        {links.length > 1 ? (
          <ul className={styles.exercises_list__pagination}>
            {links.map((link, index) => (
              <li
                className={styles.exercises_list__pagination__item}
                key={link.name}
              >
                <button
                  type="button"
                  className={`${styles.exercises_list__pagination__link} ${
                    link.active
                      ? styles.exercises_list__pagination__link__active
                      : ''
                  }`}
                  onClick={(e) => getExercises(e, link.label)}
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
