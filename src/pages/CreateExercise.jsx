import Chessboard from 'chessboardjsx';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/createExercise.module.scss';
import apiClient from '../utils/apiClient';

const Chess = require('chess.js');

export default function CreateExercise() {
  const [type, setType] = useState('fen');
  const [tactics, setTactics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorRedirect, setErrorRedirect] = useState(false);
  const [chess] = useState(new Chess('8/8/8/8/8/8/8/8 w - - 0 1'));
  const [fen, setFen] = useState(chess.fen());
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);

  const storeExercise = (e) => {
    e.preventDefault();
    setLoading(true);

    const tactic = e.target.tactic.value;
    const fenInput = e.target.fen ? e.target.fen.value : fen;
    const title = e.target.title.value ?? 'Exercice';
    console.log(fenInput);

    if (chess.validate_fen(fenInput)) {
      apiClient
        .post('exercises', {
          tactic,
          title,
          content: { fen: fenInput },
        })
        .then((response) => {
          setLoading(false);
          setRedirect(true);
          console.log(response);
          return null;
        })
        .catch((errors) => {
          setLoading(false);
          setError('L’exercice n’a pas pu être enregistrer');
          console.log(errors);
        });
      return null;
    }

    return null;
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('tactics')
      .then((response) => {
        setLoading(false);
        setTactics(response.data.tactics);
        return null;
      })
      .catch(() => {
        setLoading(false);
        setErrorRedirect(true);
      });
  }, []);

  const svgStyle = {
    margin: 'auto',
    background: 'transparent none repeat scroll 0% 0%',
    display: 'block',
    'shape-rendering': 'auto',
  };

  if (errorRedirect) {
    return <Redirect to="/" />;
  }

  if (redirect) {
    return <Redirect to="/exercises" />;
  }

  const handleMove = (newMove) => {
    // const moves = chess.moves();
    const pieces = {
      wK: { type: chess.KING, color: chess.WHITE },
      bK: { type: chess.KING, color: chess.BLACK },
      wQ: { type: chess.QUEEN, color: chess.WHITE },
      bQ: { type: chess.QUEEN, color: chess.BLACK },
      wR: { type: chess.ROOK, color: chess.WHITE },
      bR: { type: chess.ROOK, color: chess.BLACK },
      wB: { type: chess.BISHOP, color: chess.WHITE },
      bB: { type: chess.BISHOP, color: chess.BLACK },
      wN: { type: chess.KNIGHT, color: chess.WHITE },
      bN: { type: chess.KNIGHT, color: chess.BLACK },
      wP: { type: chess.PAWN, color: chess.WHITE },
      bP: { type: chess.PAWN, color: chess.BLACK },
    };

    if (newMove.from === 'spare') {
      const pieceOnSquare = chess.get(newMove.to)
        ? chess.get(newMove.to).color + chess.get(newMove.to).type.toUpperCase()
        : false;
      if (pieceOnSquare === newMove.piece) {
        chess.remove(newMove.to);
        chess.remove(newMove.from);
      } else {
        chess.put(pieces[newMove.piece], newMove.to);
      }
    } else {
      chess.remove(newMove.to);
      chess.put(pieces[newMove.piece], newMove.to);
      chess.remove(newMove.from);
    }
    setFen(chess.fen());
  };

  const emptyBoard = () => {
    chess.clear();
    setFen(chess.fen());
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.header}>
        <Link to="/exercises">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 492 492"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                />
              </g>
            </g>
          </svg>
        </Link>
        <span className={styles.header__heading}>Chess Teaching Tool</span>
        <Link to="/logout" className={`${styles.header__btn} btn`}>
          Se déconnecter
        </Link>
      </div>
      <section className={styles.new_exercise}>
        <h2 className={styles.new_exercise__heading}>Créer un exercice</h2>
        <form
          className={styles.new_exercise__form}
          onSubmit={(e) => storeExercise(e)}
        >
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
              <span className="label">Choisir une catégorie</span>
              <select
                id="choice"
                className={styles.new_exercise__select}
                name="tactic"
              >
                {tactics.map((tactic) => (
                  <option key={tactic.id}>{tactic.name}</option>
                ))}
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

            {type === 'editor' ? (
              <>
                <Chessboard
                  position={fen}
                  dropOffBoard="trash"
                  sparePieces
                  className={styles.new_exercise__content}
                  draggable
                  onDrop={(move) =>
                    handleMove({
                      from: move.sourceSquare,
                      to: move.targetSquare,
                      piece: move.piece,
                      // This promotion attribute changes pawns to a queen if they reach the other side of the board.
                    })
                  }
                />
                <button type="button" onClick={emptyBoard}>
                  Vider l’échiquier
                </button>
              </>
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
