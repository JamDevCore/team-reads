import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import api from './modules/api-call';
import Navbar from './components/Navbar';
import formatId from './modules/format-id';


class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.auth.getProfile();
    this.state = {
      userId: user && formatId(user.sub),
      teamId: undefined,
      isLoading: false,
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      const user = this.props.auth.getProfile();
      const userId = formatId(user.sub);
      api.get(`user/${userId}`)
      .then((res) => {
        this.setState({
          teamId: res.data && res.data.teams && res.data.teams[0],
          isLoading: false,
          username: res.data.username,
        });
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  testRouteName(pathName) {
    const regexp = /\b(\w*team\w*)\b/
    console.log(regexp.test(pathName))
    return pathName !== 'teamSetup' && regexp.test(pathName)
  }

  render() {
    const {
      component,
      auth,
      pathName,
      ...rest
    } = this.props;
    const { userId, teamId, username, isLoading } = this.state;
    console.log(userId)
  return (
    <div>
      <Navbar handleLogout={auth.logout}/>
      <Route
        {...rest}
        render={(props) => {
          if (!auth.isAuthenticated()) {
            if (pathName !== 'login') {
              return <Redirect to="/login" />;
            }
          }
          /* If the user is heading towards a team based pathName
          they need to have a team, so we check and redirect them to team
          setup if they don't have one */

          if (this.testRouteName(pathName) && !teamId) return <Redirect to="/team-setup" />

          return React.createElement(component, {
            ...props, userId, username, isAuthenticated: auth.isAuthenticated(),
          });
        }}
      />}
    </div>
  );
}
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
