import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import sideImg from '../../assets/img/login.jpg';
import styles from '../styles/pages/login.module.scss';
import apiClient from '../utils/apiClient';
import Loading from '../components/Loading';

export default function Login(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [mail, setMail] = useState();

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  /**
   * Check if email is correctly formatted
   *
   * @param {string} email
   * @returns boolean
   */
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitLogin = (e) => {
    e.preventDefault();

    setLoadingStatus(true);

    const email = e.target.email.value;
    setMail(email);
    if (!validateEmail(email)) {
      setLoadingStatus(false);
      return setError(
        'Veuillez mettre une adresse email au format example@mail.com'
      );
    }

    const password = e.target.password.value;

    if (password.length === 0) {
      setLoadingStatus(false);
      return setError('Le champ mot de passe ne peux pas être libre');
    }

    apiClient
      .post('sanctum/login', {
        email,
        password,
        device_name: 'Chess Teaching Tool',
      })
      .then((response) => {
        props.login(response.data);
        setRedirect(true);
        setLoadingStatus(false);
        return null;
      })
      .catch(() => {
        setLoadingStatus(false);
        setError('Les identifiants que vous avez fourni ne sont pas correct');
      });

    return null;
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return loadingStatus ? (
    <Loading />
  ) : (
    <section className={styles.login}>
      <h2 aria-level="2" className={styles.login__heading}>
        Se connecter
      </h2>
      <div className={styles.header}>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <Link to="/register" className={`${styles.header__btn} btn`}>
          Créer un compte
        </Link>
      </div>
      <form
        action="/"
        method="get"
        onSubmit={(e) => {
          submitLogin(e);
        }}
        className={styles.login__form}
      >
        {error ? (
          <p className={styles.login__error}>
            Les identifiants ne sont pas correct
          </p>
        ) : null}
        <label htmlFor="email" className={styles.login__label}>
          <span className="label">Email</span>
          <input
            type="email"
            id="email"
            placeholder="exemple@mail.com"
            name="email"
            defaultValue={mail}
          />
        </label>
        <label htmlFor="password" className={styles.login__label}>
          <span className="label">Password</span>
          <div className={styles.login__password_wrapper}>
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Mot de passe"
              className={styles.login__pwd_input}
            />
            <button type="button" onClick={showPassword}>
              <span className="sr-only">Afficher le mot de passe</span>
              {!passwordShown ? (
                <svg
                  className={styles.login__toggl}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 511.999 511.999"
                  fill="#000000"
                  enableBackground="new 0 0 511.999 511.999"
                >
                  <g>
                    <g>
                      <path
                        d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                    c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                    C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                    c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                    C447.361,287.923,358.746,385.406,255.997,385.406z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                    s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                    s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"
                      />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 477.871 477.871"
                  className={styles.login__toggl}
                >
                  <g>
                    <g>
                      <path
                        d="M474.609,228.901c-29.006-38.002-63.843-71.175-103.219-98.287l67.345-67.345c6.78-6.548,6.968-17.352,0.42-24.132
                      c-6.548-6.78-17.352-6.968-24.132-0.42c-0.142,0.137-0.282,0.277-0.42,0.42l-73.574,73.506
                      c-31.317-17.236-66.353-26.607-102.093-27.307C109.229,85.336,7.529,223.03,3.262,228.9c-4.349,5.983-4.349,14.087,0,20.07
                      c29.006,38.002,63.843,71.175,103.219,98.287l-67.345,67.345c-6.78,6.548-6.968,17.352-0.42,24.132
                      c6.548,6.78,17.352,6.968,24.132,0.42c0.142-0.137,0.282-0.277,0.42-0.42l73.574-73.506
                      c31.317,17.236,66.353,26.607,102.093,27.307c129.707,0,231.407-137.694,235.674-143.565
                      C478.959,242.988,478.959,234.884,474.609,228.901z M131.296,322.494c-34.767-23.156-65.931-51.311-92.484-83.558
                      c25.122-30.43,106.598-119.467,200.124-119.467c26.609,0.538,52.77,6.949,76.612,18.773L285.92,167.87
                      c-39.2-26.025-92.076-15.345-118.101,23.855c-18.958,28.555-18.958,65.691,0,94.246L131.296,322.494z M285.016,217.005
                      c3.34,6.83,5.091,14.328,5.12,21.931c0,28.277-22.923,51.2-51.2,51.2c-7.603-0.029-15.101-1.78-21.931-5.12L285.016,217.005z
                      M192.856,260.866c-3.34-6.83-5.091-14.328-5.12-21.931c0-28.277,22.923-51.2,51.2-51.2c7.603,0.029,15.101,1.78,21.931,5.12
                      L192.856,260.866z M238.936,358.402c-26.609-0.538-52.769-6.949-76.612-18.773l29.628-29.628
                      c39.2,26.025,92.076,15.345,118.101-23.855c18.958-28.555,18.958-65.691,0-94.246l36.523-36.523
                      c34.767,23.156,65.931,51.312,92.484,83.558C413.937,269.366,332.461,358.402,238.936,358.402z"
                      />
                    </g>
                  </g>
                </svg>
              )}
            </button>
          </div>
        </label>
        <button
          type="submit"
          className="btn btn--submit"
          disabled={loadingStatus}
        >
          Se connecter
        </button>
      </form>
      <nav className={styles.login__nav}>
        <h3 className="sr-only">Navigation de connexion</h3>
        <Link to="/register" className={styles.login__item}>
          Je n’ai pas de compte
        </Link>
        <Link to="/forgot-password" className={styles.login__item}>
          J’ai ouvlié mon mot de passe
        </Link>
      </nav>
      <figure className={styles.login__figure}>
        <img src={sideImg} alt="" className={styles.login__img} />
      </figure>
    </section>
  );
}

Login.defaultProps = {
  login: () => {},
};

Login.propTypes = {
  login: PropTypes.func,
};
