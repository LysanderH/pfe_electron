import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import Loading from '../components/Loading';
import apiClient from '../utils/apiClient';
import styles from '../styles/pages/createLesson.module.scss';
import ExerciseChoiceList from '../components/ExercisesChoiceList';

export default function CreateLesson() {
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState({});
  const [exercises, setExercises] = useState([]);
  const [errorRedirect, setErrorRedirect] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [displayList, setDisplayList] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const updateLesson = (e) => {
    e.preventDefault();
    setLoading(true);
    setTitle(e.target.title.value);
    setDescription(e.target.description.value);
    apiClient
      .post('courses', {
        title,
        description,
        exercises,
      })
      .then((response) => {
        setLoading(false);
        setLesson(response.data.course);
        setSuccess(true);
        setExercises(response.data.course.exercises ?? []);
        return null;
      })
      .catch((errors) => {
        setLoading(false);
        setError('L’exercice n’a pas pu être enregistrer');
        console.log(errors);
      });
  };

  const removeExercise = (e, exercise) => {
    e.preventDefault();
    const copyExercises = exercises.slice();
    const index = copyExercises.indexOf(exercise);
    copyExercises.splice(index, 1);
    setExercises(copyExercises);
  };

  const toggleExercisesChoiceList = () => {
    setDisplayList(!displayList);
    console.log(displayList);
  };

  const addExercise = (exercise) => {
    const copyExercises = exercises.slice();
    copyExercises.push(exercise);
    setExercises(copyExercises);
  };

  if (errorRedirect) {
    <Redirect to="/lessons" />;
  }

  if (success) {
    console.log(lesson, lesson.id);
    return <Redirect to={`/lessons/${lesson.id}`} />;
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      {displayList ? (
        <ExerciseChoiceList
          addExercise={addExercise}
          chosenExercises={exercises}
          toggleExercisesChoiceList={toggleExercisesChoiceList}
        />
      ) : (
        <>
          <div className={styles.header}>
            <Link to="/lessons">
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
            </Link>
            <span className={styles.header__heading}>Chess Teaching Tool</span>
          </div>
          <section className={styles.new_lesson}>
            <h2 className={styles.new_lesson__heading}>Créer la leçon</h2>
            <form
              className={styles.new_lesson__form}
              onSubmit={(e) => updateLesson(e)}
            >
              <div className={styles.new_lesson__form_body}>
                <label htmlFor="title" className={styles.new_lesson__label}>
                  <span className="label">Titre</span>
                  <input
                    type="text"
                    id="title"
                    placeholder="Matt en 3 coups"
                    name="title"
                    defaultValue={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="message" className={styles.new_lesson__label}>
                  <span className="label">Votre message</span>
                  <textarea
                    id="message"
                    placeholder="Note"
                    name="description"
                    defaultValue={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </label>
                <div className={styles.new_lesson__buttons}>
                  <button type="submit" className="btn">
                    <svg
                      id="Capa_1"
                      enableBackground="new 0 0 512.007 512.007"
                      height="512"
                      viewBox="0 0 512.007 512.007"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="m511.927 126.537c-.279-2.828-1.38-5.666-3.315-8.027-.747-.913 6.893 6.786-114.006-114.113-2.882-2.882-6.794-4.395-10.612-4.394-9.096 0-329.933 0-338.995 0-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 .001-364.186.041-339.316-.072-340.466zm-166.927-96.534v98c0 8.271-6.729 15-15 15h-19v-113zm-64 0v113h-139c-8.271 0-15-6.729-15-15v-98zm64 291h-218v-19c0-8.271 6.729-15 15-15h188c8.271 0 15 6.729 15 15zm-218 161v-131h218v131zm355-15c0 8.271-6.729 15-15 15h-92c0-19.555 0-157.708 0-180 0-24.813-20.187-45-45-45h-188c-24.813 0-45 20.187-45 45v180h-52c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h52v98c0 24.813 20.187 45 45 45h188c24.813 0 45-20.187 45-45v-98h2.787l104.213 104.214z" />
                      </g>
                    </svg>
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    className="btn--add"
                    onClick={toggleExercisesChoiceList}
                  >
                    <svg
                      height="426.66667pt"
                      viewBox="0 0 426.66667 426.66667"
                      width="426.66667pt"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                    </svg>
                    Ajouter un exercice
                  </button>
                </div>
              </div>
            </form>
            <ul className={styles.new_lesson__exercise_list}>
              {exercises.length ? (
                exercises.map((exercise, index) => (
                  <li
                    className={styles.new_lesson__exercise_item}
                    key={exercise.id}
                  >
                    <Chessboard
                      id={index}
                      position={JSON.parse(exercise.content).fen}
                      width={300}
                      draggable={false}
                    />
                    <button
                      type="button"
                      className={styles.new_lesson__exercise_item__button}
                      onClick={(e) => removeExercise(e, exercise)}
                    >
                      <svg
                        enableBackground="new 0 0 512 512"
                        // height="512"
                        viewBox="0 0 512 512"
                        // width="512"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.new_lesson__exercise_item__svg}
                      >
                        <g>
                          <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z" />
                          <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                          <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                          <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
                        </g>
                      </svg>
                    </button>
                  </li>
                ))
              ) : (
                <li className={styles.new_lesson__exercise_item}>
                  Il n’y a pas encore d’exercices ici
                </li>
              )}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
