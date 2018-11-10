import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';


const AuthenticatedRoute = ({
  component,
  user,
  auth,
  routeName,
  ...rest,
}) => {
  return (
    <div>
      <Navbar handleLogout={auth.logout}/>
      <Route
        {...rest}
        render={(props) => {
          if (!auth.isAuthenticated()) {
            if (routeName !== 'login') {
            }
            return <Redirect to="/login" />;
          }
          return React.createElement(component, {
            ...props, isAuthenticated: auth.isAuthenticated(),
          });
        }}
      />
    </div>
  );
}

AuthenticatedRoute.propTypes = {

};

AuthenticatedRoute.defaultProps = {

};

export default AuthenticatedRoute;
