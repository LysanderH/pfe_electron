import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/Start.scss';
import apiClient from '../utils/apiClient';

export default function StartConference() {
  const [redirect, setRedirect] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const startClass = (e) => {
    e.preventDefault();
    const groupId = e.target.group.value;
    sessionStorage.setItem('groupId', groupId);
    setRedirect(true);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('groups')
      .then((response) => {
        setGroups(response.data.groups);
        setLoading(false);
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

  return loading ? (
    <Loading />
  ) : (
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
