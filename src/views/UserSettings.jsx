import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { openAlert } from 'simple-react-alert';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import UserDetailsForm from '../components/forms/UserDetailsForm';
import api from '../modules/api-call';

const { REACT_APP_AUTH_0_CLIENT_ID } = process.env;

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
      isLoading: false,
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

  requestChangePasswordEmail() {
    const { email } = this.state;
    this.setState({ isLoading: true });
    var options = {
      method: 'POST',
      url: 'https://jamesvitaly.eu.auth0.com/dbconnections/change_password',
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: REACT_APP_AUTH_0_CLIENT_ID,
        email,
        connection: 'Username-Password-Authentication'
        },
      json: true
      };
      axios(options)
      .then((res) => {
        this.setState({
          isLoading: false,
        })
        openAlert({ message: `${res.data}`, type: 'success' });
        console.log(res)
      })
      .catch((err )=> {
        this.setState({
          isLoading: false,
        })
        openAlert({ message: `Err: ${err}`, type: 'danger' });
        console.log(err)
      })
  }

  updateUserDetails({ email, username }) {
    this.setState({
      email,
      username,
    });
  }
  render() {
    const { className, userId, userSub } = this.props;
    const { email, username, isLoading } = this.state;
    console.log(email)
    return (
      <div className={className}>
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
        <Panel>
          <HighlightButton
            label="Send password reset email"
            icon="fas fa-envelope"
            isLoading={isLoading}
            onClick={() => this.requestChangePasswordEmail()}
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
padding-top: 40px;
`;
