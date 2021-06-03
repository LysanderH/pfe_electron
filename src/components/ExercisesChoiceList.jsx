import axios from 'axios';
import Chessboard from 'chessboardjsx';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import styles from '../styles/pages/exercisesList.module.scss';
import apiClient from '../utils/apiClient';

export default function ExerciseChoiceList(props) {
  const [PageIndex, setPageIndex] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [links, setLinks] = useState([]);
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toggleExercisesChoiceList, addExercise, chosenExercises } = props;

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
        console.log(chosenExercises);
        console.log(exercises);
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

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.exercises_choice_list}>
      <div className={styles.header}>
        <button type="button" onClick={toggleExercisesChoiceList}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 492 492"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                />
              </g>
            </g>
          </svg>
        </button>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
      </div>
      <section className={styles.exercises_list}>
        <h2 className={styles.exercises_list__heading}>
          Liste de vos exercices
        </h2>
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
              <li
                className={`${styles.exercises_list__item} ${
                  chosenExercises.some(
                    (chosenExercise) => chosenExercise.id === exercise.id
                  )
                    ? styles.exercises_list__item__chosen
                    : ''
                }`}
                key={exercise.id}
              >
                <button
                  type="button"
                  className={styles.exercises_list__link}
                  onClick={(e) => props.addExercise(exercise)}
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
                </button>
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
    </div>
  );
}

ExerciseChoiceList.defaultProps = {
  addExercise: () => {},
  toggleExercisesChoiceList: () => {},
  chosenExercises: [],
};
ExerciseChoiceList.propTypes = {
  addExercise: PropTypes.func,
  toggleExercisesChoiceList: PropTypes.func,
  chosenExercises: PropTypes.arrayOf(PropTypes.object),
};
