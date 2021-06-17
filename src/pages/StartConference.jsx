import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/start.module.scss';
import apiClient from '../utils/apiClient';

export default function StartConference() {
  const [redirect, setRedirect] = useState(false);
  const [groups, setGroups] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);

  const startClass = (e) => {
    e.preventDefault();
    const group = e.target.group.value;
    const lesson = e.target.lesson.value;
    sessionStorage.setItem('group', group);
    sessionStorage.setItem('lesson', lesson);
    setRedirect(true);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('video-conference')
      .then((response) => {
        setGroups(response.data.groups);
        setLessons(response.data.lessons);
        setLoading(false);

        if (!response.data.groups.length && !response.data.lessons.length) {
          setErrorRedirect(true);
        }
        return null;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (redirect) {
    return <Redirect to="/conference" />;
  }
  if (errorRedirect) {
    return <Redirect to="/" />;
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.background}>
        <section className={styles.start}>
          <h2 className={styles.start__heading}>Commencer une conférence</h2>
          <form className={styles.start__form} onSubmit={(e) => startClass(e)}>
            <label htmlFor="group" className={styles.start__label}>
              <span className="label">Choix de la classe</span>
              <select
                id="group"
                name="group"
                className={styles.start__select}
                defaultValue="group"
              >
                <option key="group" disabled>
                  Choisir un groupe
                </option>
                {groups.length ? (
                  groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))
                ) : (
                  <option key="0" disabled>
                    Pas de groupe
                  </option>
                )}
              </select>
            </label>
            {groups.length ? (
              ''
            ) : (
              <p>
                Vous n’avez pas de groupes, veuillez en créer{' '}
                <Link to="/classes/create">ici.</Link>
              </p>
            )}
            <label htmlFor="cours" className={styles.start__label}>
              <span className="label">Choix de la leçon</span>
              <select id="cours" name="lesson" className={styles.start__select}>
                {lessons.length ? (
                  lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))
                ) : (
                  <option key="0" disabled>
                    Vous avez pas encore enregister de lessons
                  </option>
                )}
              </select>
            </label>
            {lessons.length ? (
              ''
            ) : (
              <p>
                Vous n’avez pas de groupes, veuillez en créer{' '}
                <Link to="/lessons/create">ici.</Link>
              </p>
            )}
            <div className={styles.start__btns}>
              <Link to="/" className="back">
                Retour
              </Link>
              {lessons.length && groups.length ? (
                <button type="submit" className={`${styles.start__btn} btn`}>
                  Commencer
                </button>
              ) : (
                ''
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
