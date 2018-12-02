import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../components/_common/Panel';
import PageTitle from '../components/_common/PageTitle';
import UserDetailsForm from '../components/forms/UserDetailsForm';
import api from '../modules/api-call';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: this.props.username,
    }
    this.updateUserDetails = this.updateUserDetails.bind(this);
  }
componentDidMount() {
  const { userId } = this.props;
  api.get(`user/${userId}`)
  .then((res) => {
    this.setState({
      email: res.data.email,
      username: res.data.username,
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

  updateUserDetails({ email, username }) {
    this.setState({
      email,
      username,
    });
  }
  render() {
    const { className, userId, userSub } = this.props;
    const { email, username } = this.state;
    console.log(email)
    return (
      <div className={className}>
        <PageTitle>Settings</PageTitle>
        <Panel>
          <UserDetailsForm
            key={`${email} ${username}`}
            username={username}
            email={email}
            userId={userId}
            userSub={userSub}
            updateUserDetails={this.updateUserDetails}
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
