/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const currentUser = sessionStorage.getItem('loggedIn');

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

PrivateRoute.defaultProps = {
  component: {},
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
