import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles/pages/createClass.module.scss';
import apiClient from '../utils/apiClient';

/**
 * Component to create a class with its students
 */
export default function CreateClass() {
  const [students, setStudents] = useState([]);
  const [studentError, setStudentError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);

  const newStudent = (e) => {
    e.preventDefault();
    if (
      e.target.users.value !== '' &&
      !students.includes(e.target.users.value)
    ) {
      const email = e.target.users.value;
      apiClient
        .get(`groups/create?email=${email}`)
        .then((response) => {
          console.log(response);
          if (response.data.userExists) {
            setStudents([...students, e.target.users.value]);
            e.target.users.value = '';
          } else {
            setError('Cet utilisateur n’existe pas');
          }
          return null;
        })
        .catch((errors) => {
          setLoading(false);
          setError('La classe n’a pas pu être enregistrer');
          console.log(errors);
        });
    } else {
      setStudentError('Veuillez incérer un email valable');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    if (students.length !== 0) {
      const name = e.target.name.value;
      const description = e.target.description.value;
      apiClient
        .post('groups', {
          name,
          description,
          students,
        })
        .then((response) => {
          setLoading(false);
          setRedirect(true);
          return null;
        })
        .catch((errors) => {
          setLoading(false);
          setError('L’exercice n’a pas pu être enregistrer');
          console.log(errors);
        });
    } else {
      setLoading(false);
    }
  };

  const removeUser = (e, student) => {
    e.preventDefault();
    const users = students.slice();
    const index = users.indexOf(student);
    users.splice(index, 1);
    setStudents(users);
  };

  if (redirect) {
    return <Redirect to="/classes" />;
  }

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
      <section className={styles.create_class}>
        <h2 className={styles.create_class__heading}>Créer une classe</h2>
        <form
          className={styles.create_class__main_form}
          onSubmit={(e) => submitForm(e)}
        >
          <label htmlFor="name" className={styles.create_class__label}>
            <span className="label">Nom</span>
            <input type="text" id="name" placeholder="Eynatten 1" name="name" />
          </label>
          <label htmlFor="message" className={styles.create_class__label}>
            <span className="label">Votre message</span>
            <textarea
              id="message"
              placeholder="Eynatten 1"
              name="description"
              defaultValue="Dernier cours le 20.02"
            />
          </label>
          <button type="submit" className="btn btn--submit form__submit">
            Enregistrer la classe
          </button>
        </form>
        <form
          className={styles.create_class__users_form}
          onSubmit={(e) => newStudent(e)}
        >
          <label htmlFor="users" className={styles.create_class__label}>
            <span className="label">Ajouter des étudiants</span>
            <input
              type="email"
              id="users"
              placeholder="Eynatten 1"
              name="name"
            />
          </label>
          <button type="submit" className="btn form__submit">
            Ajouter l’utilisateur
          </button>
        </form>
        <ul className={styles.create_class__list}>
          {students ? (
            students.map((student) => (
              <li key={student} className={styles.create_class__list_item}>
                {student}{' '}
                <button type="button" onClick={(e) => removeUser(e, student)}>
                  <svg
                    id="Layer_1"
                    enableBackground="new 0 0 512 512"
                    height="512"
                    viewBox="0 0 512 512"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
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
            <li className={styles.create_class__list_item}>
              Aucun utilisateur a été ajouté
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
