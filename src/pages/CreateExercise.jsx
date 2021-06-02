import Chessboard from 'chessboardjsx';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import styles from '../styles/pages/CreateExercise.scss';
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
    <Redirect to="/" />;
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
