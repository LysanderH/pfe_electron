import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Echo from 'laravel-echo';
import axios from 'axios';
import apiClient from '../utils/apiClient';
import styles from '../styles/pages/Conference.scss';

window.Pusher = require('pusher-js');

const token = sessionStorage.getItem('user') ?? '';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

window.Echo = new Echo({
  broadcaster: 'pusher',
  // host: 'https://api.localhost',
  key: 'bc9ce7f1e2a8c4c77e2f',
  cluster: 'eu',
  // auth: {
  //   Authorization: `Bearer ${token}`,
  // },
});

console.log(window.Echo);

export default function Conference() {
  const [hasMedia, setHasMedia] = useState(false);
  const [video, setVideo] = useState();
  const [redirect, setRedirect] = useState(false);
  const [localStream, setLocalStream] = useState();
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
      iceCandidatePoolSize: 5,
    });

    const request = (offerer) => {
      apiClient
        .post('/rooms', {
          offerer: JSON.stringify(offerer),
          group: sessionStorage.getItem('user'),
        })
        .then((response) => {
          setRoomId(response.data.room.id);
          // console.log(window.Echo.private(`room.${response.data.room.id}`));
          window.Echo.channel(`room.${response.data.room.id}`).listen(
            'UserConnectedToRoom',
            (obj) => {
              console.log(obj);
            }
          );
          return null;
        })
        .catch((error) => console.error(error));
    };

    peerConnection
      .createOffer()
      .then((response) => {
        const offererDescription = response;
        const offerer = {
          sdp: offererDescription.sdp,
          type: offererDescription.type,
        };
        peerConnection.setLocalDescription(offererDescription);
        console.log(peerConnection);
        console.log(offerer);

        request(offerer);
        return null;
      })
      .catch((error) => console.error(error));
  }, []);

  const myVideo = useCallback((node) => {
    if (node !== null) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            node.srcObject = stream;
            setVideo(node);

            node.play();

            return null;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  });

  const disconnect = (e) => {
    e.preventDefault();
    console.log(video);
    video.pause();
    video.srcObject = null;
    // .stop();
  };

  const toggleVideo = (e) => {};
  const toggleMic = (e) => {};

  return (
    <section className={styles.chat}>
      <h2 className={styles.chat__title}>
        Identifiant de conférence&nbsp;: {roomId ?? ''}
      </h2>
      <video className={styles.chat__video} ref={myVideo}>
        <track kind="captions" srcLang="en" />
        Sorry, your browser doesn’t support embedded videos.
      </video>
      <div className={styles.chat__chessboard}>Échiquier</div>
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
