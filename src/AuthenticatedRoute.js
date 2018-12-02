import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Callback from './components/Callback';
import api from './modules/api-call';
import Navbar from './components/Navbar';
import formatId from './modules/format-id';



class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.auth.getProfile();
    console.log(user);
    this.state = {
      userId: user && formatId(user.sub),
      userSub: user && user.sub,
      teamId: undefined,
      teamInvites: undefined,
      isLoading: false,
      email: undefined,
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.setState({ isLoading: true });
      const user = this.props.auth.getProfile();
      const userId = formatId(user.sub);
      api.get(`user/${userId}`)
      .then((res) => {
        this.setState({
          teamId: res.data && res.data.teams && res.data.teams[0],
          isLoading: false,
          username: res.data.username,
          teamInvites: res.data.teamInvites,
          email: res.data.email,
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        })
      })
    }
  }

  testRouteName(pathName) {
    const regexp = /\b(\w*team\w*)\b/
    return pathName !== 'teamSetup' && regexp.test(pathName)
  }

  render() {
    const {
      component,
      auth,
      pathName,
      className,
      ...rest
    } = this.props;
    const {
      userId, username, isLoading , teamId, teamInvites, email, userSub,
    } = this.state;

  return (
    <div className={className}>
      <Navbar handleLogout={auth.logout} teamId={teamId}/>
      <div className="view">
      {!isLoading ? <Route
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

          if (this.testRouteName(pathName) && !teamId) {
            return <Redirect to="/team-setup" />
            }

          if((pathName === 'team' || pathName === 'teamSetup') && teamId) return <Redirect to ={`/team/${teamId}`} />

          return React.createElement(component, {
            ...props,
            userId,
            username,
            teamId,
            userSub,
            auth,
            email,
            teamInvites,
            isAuthenticated: auth.isAuthenticated(),
          });
        }}
      /> : <Callback />}
      </div>
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

export default styled(AuthenticatedRoute)`
.view {
  padding-top: 60px;
}
`;
