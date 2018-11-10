import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import formatId from './modules/format-id';


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
            ...props, userId: formatId(user.sub), isAuthenticated: auth.isAuthenticated(),
          });
        }}
      />
    </div>
  );
}

AuthenticatedRoute.propTypes = {
  component: PropTypes.any,
  user: PropTypes.object,
  auth: PropTypes.object,
  routeName: PropTypes.string,
};

AuthenticatedRoute.defaultProps = {
  component: undefined,
  user: undefined,
  auth: undefined,
  routeName: undefined,
};

export default AuthenticatedRoute;
