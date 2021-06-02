import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import apiClient from './apiClient';

export default function Logout() {
  const [redirectRoute, setRedirectRoute] = useState('/');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiClient
      .post('auth/logout', {
        user: sessionStorage.getItem('user'),
      })
      .then(() => {
        sessionStorage.clear();
        setRedirectRoute('/login');
        setLoading(false);
        return null;
      })
      .catch((error) => {
        console.log(error);
        setRedirectRoute('/');
        setLoading(false);
        return null;
      });
  }, []);

  const svgStyle = {
    margin: 'auto',
    background: 'transparent none repeat scroll 0% 0%',
    display: 'block',
    'shape-rendering': 'auto',
  };

  if (loading) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <circle cx="60" cy="50" r="4" fill="#28292f">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="-0.67s"
            />
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="-0.67s"
            />
          </circle>
          <circle cx="60" cy="50" r="4" fill="#28292f">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="-0.33s"
            />
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="-0.33s"
            />
          </circle>
          <circle cx="60" cy="50" r="4" fill="#28292f">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="0s"
            />
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="0s"
            />
          </circle>
        </g>
        <g transform="translate(-15 0)">
          <path
            d="M50 50L20 50A30 30 0 0 0 80 50Z"
            fill="#0a0a0a"
            transform="rotate(90 50 50)"
          />
          <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#0a0a0a">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;45 50 50;0 50 50"
              keyTimes="0;0.5;1"
            />
          </path>
          <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#0a0a0a">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;-45 50 50;0 50 50"
              keyTimes="0;0.5;1"
            />
          </path>
        </g>
      </svg>
    );
  }
  return <Redirect to={redirectRoute} />;

  // return <Redirect to="/login" />;
}
