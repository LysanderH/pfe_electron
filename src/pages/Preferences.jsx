import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/preferences.module.scss';
import apiClient from '../utils/apiClient';

export default function Preferences() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('user')
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        return null;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  /**
   * Check if email is correctly formatted
   *
   * @param {string} mail
   * @returns boolean
   */
  function validateEmail(mail) {
    console.log(mail);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  }

  const updateUser = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setName(e.target.name.value);
    setEmail(e.target.email.value);
    setPassword(e.target.password.value);
    setNewPassword(e.target.newpassword ? e.target.newpassword.value : '');
    setConfirmNewPassword(
      e.target.newpassword_confirmation
        ? e.target.newpassword_confirmation.value
        : ''
    );

    if (e.target.name.value.length < 1) {
      setLoading(false);
      setError({ name: 'Il faut donner un nom correct' });
    }

    if (!validateEmail(e.target.email.value)) {
      setLoading(false);
      return setError({
        email: 'Veuillez mettre une adresse email au format example@mail.com',
      });
    }

    if (e.target.password.value.length < 1) {
      setLoading(false);
      return setError({
        password: 'Veuillez mettre votre mot de passe actuel',
      });
    }
    console.log(
      newPassword.length > 0,
      newPassword.length < 8,
      newPassword.length > 0 && newPassword.length < 8
    );

    if (
      e.target.newpassword.value.length > 0 &&
      e.target.newpassword.value.length < 8
    ) {
      setLoading(false);
      return setError({
        newPassword: 'Le mot de passe doit contenir 8 caractères',
      });
    }

    console.log(e.target.newpassword.value.length, `c${confirmNewPassword}`);

    if (
      e.target.newpassword.value !== e.target.newpassword_confirmation.value
    ) {
      setLoading(false);
      return setError({
        confirmNewPassword: 'Le mot de passe ne correspond pas',
      });
    }

    if (!error) {
      apiClient
        .put(`users/${user.id}`, {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          newpassword: e.target.newpassword.value,
          newpassword_confirmation: e.target.newpassword_confirmation.value,
        })
        .then((response) => {
          setLoading(false);
          setUser(response.data.user);
          setRedirect(true);
          return null;
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.errors ?? '');
        });
    }
    setLoading(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

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
      <section className={styles.preferences}>
        <form
          className={styles.preferences__form}
          onSubmit={(e) => {
            updateUser(e);
          }}
        >
          <label htmlFor="name" className={styles.preferences__label}>
            <span className="label">Nom</span>
            <input
              type="text"
              id="name"
              placeholder="Max Mustermann"
              name="name"
              defaultValue={user.name ?? ''}
              required
            />
            {error ? (
              error.name ? (
                <p className={styles.register__error}>{error.name}</p>
              ) : (
                ''
              )
            ) : null}
          </label>
          <label htmlFor="email" className={styles.preferences__label}>
            <span className="label">Email</span>
            <input
              type="email"
              id="email"
              placeholder="exemple@mail.com"
              name="email"
              defaultValue={user.email ?? ''}
              required
            />
            {error ? (
              error.email ? (
                <p className={styles.register__error}>{error.email}</p>
              ) : (
                ''
              )
            ) : null}
          </label>
          <label htmlFor="password" className={styles.preferences__label}>
            <span className="label">Mot de passe courant</span>
            <input
              type="password"
              id="password"
              placeholder="**********"
              name="password"
              defaultValue={password ?? ''}
              required
            />
            {error ? (
              error.password ? (
                <p className={styles.register__error}>{error.password}</p>
              ) : (
                ''
              )
            ) : null}
          </label>
          <label htmlFor="newpassword" className={styles.preferences__label}>
            <span className="label">Nouveau mot de passe</span>
            <input
              type="password"
              id="newpassword"
              placeholder="***********"
              defaultValue={newPassword ?? ''}
              name="newpassword"
            />
            {error ? (
              error.newPassword ? (
                <p className={styles.register__error}>{error.newPassword}</p>
              ) : (
                ''
              )
            ) : null}
          </label>
          <label htmlFor="confirm" className={styles.preferences__label}>
            <span className="label">confirmer le mot de passe</span>
            <input
              type="password"
              id="confirm"
              defaultValue={confirmNewPassword ?? ''}
              placeholder="**********"
              name="newpassword_confirmation"
            />
            {error ? (
              error.confirmNewPassword ? (
                <p className={styles.register__error}>
                  {error.confirmNewPassword}
                </p>
              ) : (
                ''
              )
            ) : null}
          </label>
          <button type="submit" className="btn">
            Enregistrer
          </button>
        </form>
      </section>
    </>
  );
}
