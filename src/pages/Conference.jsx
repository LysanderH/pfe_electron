import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Echo from 'laravel-echo';
import axios from 'axios';
import Chessboard from 'chessboardjsx';
import { ChessInstance, ShortMove } from 'chess.js';
import apiClient from '../utils/apiClient';
import styles from '../styles/pages/conference.module.scss';
import firebase from '../utils/firebaseConfig';

const Chess = require('chess.js');

export default function Conference() {
  const [roomId, setRoomId] = useState('');
  const [jitsi, setJitsi] = useState({});
  const [user, setUser] = useState();
  const [exercises, setExercises] = useState([]);
  const [docId, setDocId] = useState();
  const [redirect, setRedirect] = useState(false);

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

    const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: `ChessTeachingTool${room}`,
      userInfo: {
        displayName: currentUser.name,
        email: currentUser.email,
      },
      width: 700,
      height: 700,
    });

    setJitsi(api);
  };

  const setFirebaseConnection = (newRoomId) => {
    console.log(roomId);
    const connection = firebase
      .firestore()
      .collection('rooms')
      .where('RoomId', '==', Number(newRoomId))
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          setFen(doc.data().fen);
        });
      });
  };

  const pushToFirebase = (newRoomId) => {
    firebase
      .firestore()
      .collection('rooms')
      .add({
        fen: chess.fen(),
        RoomId: Number(newRoomId),
      })
      .then((docRef) => {
        setDocId(docRef.id);
        setFirebaseConnection(newRoomId);
        return null;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const updateFirestore = () => {
    firebase
      .firestore()
      .collection('rooms')
      .doc(docId)
      .update({
        fen: chess.fen(),
        RoomId: Number(roomId),
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  useEffect(() => {
    apiClient
      .post('/rooms', {
        offerer: JSON.stringify({}),
        group: sessionStorage.getItem('group'),
        lesson: sessionStorage.getItem('lesson'),
      })
      .then((response) => {
        setRoomId(response.data.room.id);
        setUser(response.data.user.name);
        setExercises(response.data.exercises);
        sessionStorage.setItem('roomId', response.data.room.id);
        initialiseJitsi(response.data.room.id, response.data.user);

        pushToFirebase(response.data.room.id);
        return null;
      })
      .catch((error) => console.error(error));

    return () => jitsi?.dispose?.();
  }, []);

  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand('toggleVideo');
  };

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
      chess.remove(newMove.from);
      chess.put(pieces[newMove.piece], newMove.to);
    }

    setFen(chess.fen());

    updateFirestore();
  };

  const setPosition = (e) => {
    const newPosition = JSON.parse(e.target.value);
    setFen(newPosition.fen);
    updateFirestore();
    chess.load(fen);
  };

  const disconnect = () => {
    sessionStorage.removeItem('roomId');
    jitsi ? jitsi.executeCommand('hangup') : '';
    setJitsi();
    document.getElementById(jitsiContainerId).innerHTML = '';
    setRedirect(true);
  };

  const svgStyle = { 'enable-background': 'new 0 0 512 512' };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <section className={styles.chat}>
      <h2 className={styles.chat__title}>
        Identifiant de conférence&nbsp;: {roomId ?? ' charge...'}
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
          })
        }
      />
      <aside className={styles.chat__controls}>
        <button
          type="button"
          onClick={(e) => disconnect(e)}
          className={styles.chat__button}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={svgStyle}
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M502.72,253.163c-66.944-63.445-154.581-98.389-246.72-98.389S76.224,189.717,9.067,253.355
			C3.2,259.2,0,267.029,0,275.413c0,8.448,3.371,16.491,9.067,21.845l50.688,50.709c11.712,11.669,32.747,11.328,43.627,0.491
			c15.851-14.677,33.323-26.816,51.776-36.053c11.435-5.525,15.509-19.051,15.509-29.845v-56.021
			c27.2-7.317,58.133-7.979,85.333-7.979c28.821,0,58.965,0.661,85.333,7.915v56.085c0,14.165,5.717,25.387,15.189,29.995
			c19.285,9.643,36.821,21.76,52.032,36.032c5.803,5.483,13.696,8.64,21.632,8.64c8.384,0,16.213-3.2,22.059-9.045l50.688-50.688
			c5.845-5.845,9.067-13.675,9.067-22.08C512,267.029,508.8,259.2,502.72,253.163z"
                />
              </g>
            </g>
          </svg>
          Finir la session
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
            key="start-position"
            value={
              '{"fen":"rnbqkbnr\\/pppppppp\\/8\\/8\\/8\\/8\\/PPPPPPPP\\/RNBQKBNR w KQkq - 0 1"}'
            }
          >
            Échiquier vide
          </option>
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
