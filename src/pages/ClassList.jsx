import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/classList.module.scss';
import apiClient from '../utils/apiClient';

export default function ClassList() {
  const [PageIndex, setPageIndex] = useState(1);
  const [groups, setGroups] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatLinkArray = (rawLinks) => {
    rawLinks.pop();
    rawLinks.shift();
    setLinks(rawLinks);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('groups')
      .then((response) => {
        console.log(response);
        setGroups(response.data.groups.data);
        formatLinkArray(response.data.groups.links);
        setLoading(false);
        return null;
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const getGroups = (e, pageNum) => {
    e.preventDefault();
    setLoading(true);
    apiClient
      .get(`groups?page=${pageNum}`)
      .then((response) => {
        setGroups(response.data.groups.data);
        formatLinkArray(response.data.groups.links);
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
      <section className={styles.classes_list}>
        <h2 className={styles.classes_list__heading}>Liste de vos classes</h2>
        <Link
          to="/classes/create"
          className={`${styles.classes_list__new} btn`}
        >
          Créer une nouvelle classe
        </Link>
        <table className={styles.classes_list__table}>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Nombre d’élèves</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.length ? (
              groups.map((group, key) => (
                <tr key={group.id}>
                  <th scope="row">{group.name}</th>
                  <td>{group.users ? group.users.length - 1 : '0'}</td>
                  <td>
                    <Link
                      to={`/classes/${group.id}`}
                      className={`${styles.classes_list__btn} btn`}
                    >
                      Voir la classe
                      <span className="sr-only"> {group.name}</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="1">
                <th scope="row">Vous avez pas encore de classes</th>
                <td>
                  <Link
                    to="/classes/create"
                    className={`${styles.classes_list__btn} btn`}
                  >
                    Créer une classe
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {links.length > 1 ? (
          <ul className={styles.classes_list__pagination}>
            {links.map((link) => (
              <li
                className={styles.classes_list__pagination__item}
                key={link.label}
              >
                <button
                  type="button"
                  className={`${styles.classes_list__pagination__link} ${
                    link.active
                      ? styles.classes_list__pagination__link__active
                      : ''
                  }`}
                  onClick={(e) => getGroups(e, link.label)}
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
