import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/CreateExercise.scss';

// TODO
export default function CreateExercise() {
  const [type, setType] = useState('fen');

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
      <section className={styles.new_exercise}>
        <h2 className={styles.new_exercise__heading}>Créer un exercice</h2>
        <form className={styles.new_exercise__form}>
          <div className={styles.new_exercise__form_head}>
            <button
              type="button"
              className={styles.new_exercise__button}
              onClick={(e) => setType('fen')}
            >
              FEN
            </button>
            <button
              type="button"
              className={styles.new_exercise__button}
              onClick={(e) => setType('pgn')}
            >
              PGN
            </button>
            <button
              type="button"
              className={styles.new_exercise__button}
              onClick={(e) => setType('editor')}
            >
              Éditeur
            </button>
          </div>

          <div className={styles.new_exercise__form_body}>
            <label htmlFor="title" className={styles.new_exercise__label}>
              <span className="label">Titre</span>
              <input
                type="text"
                id="title"
                placeholder="Matt en 3 coups"
                name="title"
              />
            </label>
            <label htmlFor="choice" className={styles.new_exercise__label}>
              <select id="choice" className={styles.new_exercise__select}>
                <option value="zugzwang">Zugzwang</option>
                <option value="fourchette">La fourchette</option>
              </select>
            </label>

            {type === 'fen' ? (
              <label htmlFor="fen" className={styles.new_exercise__content}>
                <span className="label">Fen</span>
                <input
                  type="text"
                  id="fen"
                  placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK..."
                  name="fen"
                />
              </label>
            ) : (
              ''
            )}

            {type === 'pgn' ? (
              <label htmlFor="pgn" className={styles.new_exercise__content}>
                <span className="label">PGN</span>
                <textarea
                  type="text"
                  id="pgn"
                  placeholder='[Result "1-0"] 1.e4 c6"'
                  name="fen"
                />
              </label>
            ) : (
              ''
            )}
            {type === 'editor' ? (
              <div className={styles.new_exercise__content}>Échiquier</div>
            ) : (
              ''
            )}
            <button type="submit" className="btn">
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
