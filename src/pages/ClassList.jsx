import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/ClassList.scss';
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

  const svgStyle = {
    margin: 'auto',
    background: 'transparent none repeat scroll 0% 0%',
    display: 'block',
    'shape-rendering': 'auto',
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
            {groups.map((group, key) => (
              <tr key={group.id}>
                <th scope="row">{group.name}</th>
                <td>{group.users ? group.users.length - 1 : '0'}</td>
                <td>
                  <Link
                    to={`/classes/${group.id}`}
                    className={`${styles.classes_list__btn} btn`}
                  >
                    Voir la classe<span className="sr-only"> Titre</span>
                  </Link>
                </td>
              </tr>
            ))}
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
