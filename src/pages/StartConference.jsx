import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from '../styles/pages/Start.scss';
import apiClient from '../utils/apiClient';

export default function StartConference() {
  const [redirect, setRedirect] = useState(false);
  const [groups, setGroups] = useState([]);
  const startClass = (e) => {
    e.preventDefault();
    const groupId = e.target.group.value;
    sessionStorage.setItem('groupId', groupId);
    setRedirect(true);
  };

  useEffect(() => {
    apiClient
      .get('groups')
      .then((response) => {
        setGroups(response.data.groups);
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (redirect) {
    return <Redirect to="/conference" />;
  }

  return (
    <>
      <div className={styles.background}>
        <section className={styles.start}>
          <h2 className={styles.start__heading}>Commencer une conférence</h2>
          <form className={styles.start__form} onSubmit={(e) => startClass(e)}>
            <label htmlFor="group" className={styles.start__label}>
              <select
                id="group"
                name="group"
                className={styles.start__select}
                defaultValue="group"
              >
                <option key="group" disabled>
                  Choisir un groupe
                </option>
                {groups ? (
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
            <label htmlFor="cours" className={styles.start__label}>
              <select id="cours" className={styles.start__select}>
                <option key="1">Cours 22/03</option>
              </select>
            </label>
            <button className="btn">Commencer</button>
          </form>
          <Link to="/" className="back">
            Retour
          </Link>
        </section>
      </div>
    </>
  );
}
