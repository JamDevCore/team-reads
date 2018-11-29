import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../components/_common/Panel';
import PageTitle from '../components/_common/PageTitle';
import UserDetailsForm from '../components/forms/UserDetailsForm';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: this.props.username,
    }
  }

  render() {
    const { className, userId, userSub } = this.props;
    const { email, username } = this.state;
    return (
      <div className={className}>
        <PageTitle>Settings</PageTitle>
        <Panel>
          <UserDetailsForm
            username={username}
            email={email}
            userId={userId}
            userSub={userSub}
          />
        </Panel>
      </div>
    );
  }
}

UserSettings.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  email: PropTypes.string,
  userSub: PropTypes.string,
};

UserSettings.defaultProps = {
  username: undefined,
  userId: undefined,
  email: undefined,
  userSub: undefined,
};

export default styled(UserSettings)`
width: 1000px;
margin: 0px auto;
`;
