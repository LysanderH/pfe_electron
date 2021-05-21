import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MediaHandler from '../utils/MediaHandler';

export default function Conference() {
  const [hasMedia, setHasMedia] = useState(false);
  const [video, setVideo] = useState();
  const [redirect, setRedirect] = useState(false);
  const [localStream, setLocalStream] = useState();

  const myVideo = useCallback((node) => {
    if (node !== null) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            node.srcObject = stream;
            setVideo(node);
            // setLocalStream(stream);
            node.play();
            console.log(RTCPeerConnection);
            return null;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  });

  const stopVideo = (e) => {
    e.preventDefault();
    console.log(video);
    video.pause();
    video.srcObject = null;
    // .stop();
  };

  return (
    <div>
      <video className="myVideo" ref={myVideo} />
      <button onClick={(e) => stopVideo(e)}>Se déconnecter</button>
    </div>
  );
}
