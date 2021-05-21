import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/CreateClass.scss';
/**
 * Component to create a class with its students
 */
export default function CreateClass() {
  const [students, setStudents] = useState([]);
  const [studentError, setStudentError] = useState(false);

  const newStudent = (e) => {
    e.preventDefault();
    if (
      e.target.users.value !== '' &&
      !students.includes(e.target.users.value)
    ) {
      setStudents([...students, e.target.users.value]);
      e.target.users.value = '';
    } else {
      setStudentError('Veuillez incérer un email valable');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <Link to="/logout" className={`${styles.header__btn} btn`}>
          Se déconnecter
        </Link>
      </div>
      <section className={styles.create_class}>
        <h2 className={styles.create_class__heading}>Créer une classe</h2>
        <form className={styles.create_class__main_form}>
          <label htmlFor="name" className={styles.create_class__label}>
            <span className="label">Nom</span>
            <input type="text" id="name" placeholder="Eynatten 1" name="name" />
          </label>
          <label htmlFor="message" className={styles.create_class__label}>
            <span className="label">Votre message</span>
            <textarea
              id="message"
              placeholder="Eynatten 1"
              name="name"
              defaultValue="Voici votre invitation pour la classe"
            />
          </label>
          <button type="submit" className="btn form__submit">
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
              <li className={styles.create_class__list_item}>{student}</li>
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
