import axios from 'axios';
import Chessboard from 'chessboardjsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/ExercisesList.scss';
import apiClient from '../utils/apiClient';

export default function ExerciseList() {
  const [PageIndex, setPageIndex] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [links, setLinks] = useState([]);
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const svgStyle = {
    margin: 'auto',
    background: 'transparent none repeat scroll 0% 0%',
    display: 'block',
    'shape-rendering': 'auto',
  };

  return loading ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle cx="60" cy="50" r="4" fill="#28292f">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.67s"
          />
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.67s"
          />
        </circle>
        <circle cx="60" cy="50" r="4" fill="#28292f">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.33s"
          />
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.33s"
          />
        </circle>
        <circle cx="60" cy="50" r="4" fill="#28292f">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="0s"
          />
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          />
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path
          d="M50 50L20 50A30 30 0 0 0 80 50Z"
          fill="#0a0a0a"
          transform="rotate(90 50 50)"
        />
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#0a0a0a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          />
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#0a0a0a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          />
        </path>
      </g>
    </svg>
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
            <option key={0} value="default">
              Choix d’après la tactique
            </option>

            {tactics.map((tactic) => (
              <option key={tactic.id}>{tactic.name}</option>
            ))}
          </select>
        </label>
        <ul className={styles.exercises_list__list}>
          {exercises ? (
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
            </li>
          )}
        </ul>
        {links.length > 1 ? (
          <ul className={styles.exercises_list__pagination}>
            {links.map((link, index) => (
              <li
                className={styles.exercises_list__pagination__item}
                key={link.toString()}
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
