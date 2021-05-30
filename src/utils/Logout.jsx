import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import apiClient from './apiClient';

export default function Logout(props) {
  apiClient
    .post('auth/logout', {
      user: sessionStorage.getItem('user'),
    })
    .then(() => {
      sessionStorage.clear();
      return <Redirect to="/login" />;
    })
    .catch((error) => {
      console.log(error);
      return <Redirect to="/" />;
    });

  // return <Redirect to="/login" />;
}

Logout.defaultProps = {
  setLoggedIn: () => {},
};

Logout.propTypes = {
  setLoggedIn: PropTypes.func,
};
