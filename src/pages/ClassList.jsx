import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
