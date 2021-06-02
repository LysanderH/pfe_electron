import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Echo from 'laravel-echo';
import axios from 'axios';
import Chessboard from 'chessboardjsx';
import { ChessInstance, ShortMove } from 'chess.js';
import apiClient from '../utils/apiClient';
import styles from '../styles/pages/Conference.scss';

const Chess = require('chess.js');

export default function Conference() {
  const [roomId, setRoomId] = useState('');
  const [jitsi, setJitsi] = useState({});
  const [user, setUser] = useState();
  const [exercises, setExercises] = useState([]);

  const [chess] = useState(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  );
  const [fen, setFen] = useState(chess.fen());

  const jitsiContainerId = 'jitsi-container-id';

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise;
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async (room, currentUser) => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: `ChessTeachingTool${room}`,
      userInfo: {
        displayName: currentUser.name,
        email: currentUser.email,
      },
      width: 700,
      height: 700,
    });

    setJitsi(jitsi);
  };

  const disconnect = () => {
    sessionStorage.removeItem('roomId');
    console.log('disconnected');
    return <Redirect to="/" />;
  };

  useEffect(() => {
    apiClient
      .post('/rooms', {
        offerer: JSON.stringify({}),
        group: sessionStorage.getItem('user'),
        lesson: sessionStorage.getItem('lesson'),
      })
      .then((response) => {
        setRoomId(response.data.room.id);
        setUser(response.data.user.name);
        setExercises(response.data.exercises);
        sessionStorage.setItem('roomId', response.data.room.id);
        initialiseJitsi(response.data.room.id, response.data.user);
        // jitsi.addEventListener('videoConferenceLeft', disconnect);

        return null;
      })
      .catch((error) => console.error(error));

    return () => jitsi?.dispose?.();
  }, []);

  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand('toggleVideo');
  };

  const toggleVideo = (e) => {};
  const toggleMic = (e) => {};

  const handleMove = (newMove) => {
    chess.load(fen);

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

  const setPosition = (e) => {
    const newPosition = JSON.parse(e.target.value);
    console.log(newPosition.fen);
    setFen(newPosition.fen);
    chess.load(fen);
  };

  return (
    <section className={styles.chat}>
      <h2 className={styles.chat__title}>
        Identifiant de conférence&nbsp;: {roomId ?? ''}
      </h2>
      <div
        id={jitsiContainerId}
        className={styles.chat__video}
        style={{ height: 720, width: '100%' }}
      />
      <Chessboard
        position={fen}
        sparePieces
        className={styles.chat__chessboard}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            piece: move.piece,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
          })
        }
      />
      <aside className={styles.chat__controls}>
        <button
          type="button"
          onClick={(e) => disconnect(e)}
          className={styles.chat__button}
        >
          Se déconnecter
        </button>
        <button
          type="button"
          onClick={(e) => toggleVideo(e)}
          className={styles.chat__button}
        >
          Allumer/éteindre la webcam
        </button>
        <button
          type="button"
          onClick={(e) => toggleMic(e)}
          className={styles.chat__button}
        >
          Allumer/éteindre le micro
        </button>
      </aside>
      <label htmlFor="cours" className={styles.chat__label}>
        <span className="label">Choix de la leçon</span>
        <select
          id="cours"
          name="lesson"
          className={styles.chat__select}
          onChange={(e) => setPosition(e)}
          defaultValue="empty"
        >
          <option
            key="empty"
            value={'{"fen":"8\\/8\\/8\\/8\\/8\\/8\\/8\\/8 w - - 0 1"}'}
          >
            Échiquier vide
          </option>
          {exercises ? (
            exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.content}>
                {exercise.title}
              </option>
            ))
          ) : (
            <option key="0" disabled>
              Oups les exercices se sont perdu...
            </option>
          )}
        </select>
      </label>
    </section>
  );
}
