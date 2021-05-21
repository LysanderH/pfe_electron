import React from 'react';
import { Redirect } from 'react-router';
import apiClient from './apiClient';

export default function Logout(props) {
  apiClient
    .post('http://api.localhost/api/auth/logout', {
      user: sessionStorage.getItem('user'),
    })
    .then((user) => {
      props.setLoggedIn(false);
      sessionStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });

  return <Redirect to="/login" />;
}
