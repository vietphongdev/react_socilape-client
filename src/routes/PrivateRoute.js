import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticated } from '../utils/authenticated';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = authenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
