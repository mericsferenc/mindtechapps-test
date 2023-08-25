import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserDTO } from './types';

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  user: UserDTO;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
