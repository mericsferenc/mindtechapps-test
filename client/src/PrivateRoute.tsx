import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  user: any;
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
