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
  const [roomId, setRoomId] = useState();
  const [jitsi, setJitsi] = useState({});
  const [user, setUser] = useState();

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

  const disconnect = (e) => {
    e.preventDefault();
    return <Redirect to="/" />;
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

  useEffect(() => {
    apiClient
      .post('/rooms', {
        offerer: JSON.stringify({}),
        group: sessionStorage.getItem('user'),
      })
      .then((response) => {
        setRoomId(response.data.room.id);
        setUser(response.data.user.name);
        initialiseJitsi(response.data.room.id, response.data.user);
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

  const [chess] = useState(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  );
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (newMove) => {
    // const moves = chess.moves();
    chess.move(newMove);
    console.log(chess.fen());
    setFen(chess.fen());
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
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
            promotion: 'q',
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
    </section>
  );
}
