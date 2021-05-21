import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';

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
