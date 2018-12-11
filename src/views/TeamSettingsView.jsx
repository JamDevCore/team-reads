import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import api from '../modules/api-call';
import theme from '../theme';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import List from '../components/_common/List';
import BannerMessage from '../components/_common/BannerMessage';
import UpdateTeamNameForm from '../components/forms/UpdateTeamNameForm';
import FindUserForm from '../components/forms/FindUserForm';
import TeamMembers from '../components/TeamMembers';
import PageTitle from '../components/_common/PageTitle';



class TeamSettingsView extends React.Component {
  constructor() {
    super();
    this.state = {
      userRequests: [],
      userSearchList: [],
      isSendingRequest: false,
      isAcceptingUser: false,
      isDecliningUser: false,
    }

    this.acceptJoinRequest = this.acceptJoinRequest.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
  }
  componentDidMount() {
    const { joinRequests } = this.props;
    const { userRequests } = this.state;
    console.log(joinRequests)
    if (joinRequests.length > 0) {
      joinRequests.forEach((id) => {
        api.get(`user/${id}`)
        .then((res) => {
          const requests = userRequests;
          console.log(requests)
          console.log(res);
          requests.push(res.data)
          this.setState({
            userRequests,
          })
        })
        .catch(err => console.log(err));
      })
    }
  }

  acceptJoinRequest(userId) {
    const { teamId } = this.props;
    console.log(userId, teamId)
    this.setState({ isAcceptingUser: userId });
    api.put(`team/${teamId}`, {
      newUser: userId,
    })
    .then(() => {
      this.setState({ isAcceptingUser: false })
      openAlert({ message: "This request has been accepted", type: "success" });
    })
    .catch((err) => {
      this.setState({ isAcceptingUser: false });
      openAlert({ message: `Error: ${err}`, type: "danger" });
    })
  }

  declineJoinRequest(userId) {
    const { teamId } = this.props;
    console.log(userId, teamId)
    this.setState({ isDecliningUser: userId });
    api.put(`team/${teamId}`, {
      declineRequest: userId,
    })
    .then(() => {
      this.setState({ isDecliningUser: false })
      openAlert({ message: "This request has been declined", type: "success" });
    })
    .catch((err) => {
      this.setState({ isDecliningUser: false });
      openAlert({ message: `Error: ${err}`, type: "danger" });
    })
  }

  sendRequest(userId) {
    const { teamId } = this.props;
    this.setState({ isSendingRequest: userId });
    api.put(`team/${teamId}`, {
      sendInvitation: userId,
    })
    .then((res )=> {
      openAlert({ message: 'Your invite has been sent', type: 'info' });
      this.setState({ isSendingRequest: false });
    })
    .catch((err) => {
      openAlert({ message: `Error: ${err}`, type: 'danger' });
      this.setState({ isSendingRequest: false });
    })
  }

  setSearchResults (users) {
    console.log(users)
    this.setState({
      userSearchList: users,
    })
  }

  render() {
    const { className, userId, teamId, teamName, teamMembers } = this.props;
    const { userRequests, isAcceptingUser, isDecliningUser, userSearchList, isSendingRequest } = this.state;
    console.log(teamId)
    return (
      <div className={className}>
          {userRequests && userRequests.length > 0 ?
          userRequests.map((user) => {
          return (
            <BannerMessage
              key={user && user._id}
              meta={user && user._id}
              actionLoading={user && isAcceptingUser === user._id}
              closeLoading={user && isDecliningUser === user._id}
              action={this.acceptJoinRequest}
              closeAction={this.declineJoinRequest}
              actionLabel="Accept invite"
              closeLabel="Decline"
              message={user && `${user.email} has requested to join your team`}
              />)})
          : null}
          <Panel>
            <UpdateTeamNameForm
              key={teamName}
              userId={userId}
              teamId={teamId}
              teamName={teamName}
            />
          </Panel>
          <Panel>
            <TeamMembers
              key={teamName}
              userId={userId}
              teamId={teamId}
              teamName={teamName}
              teamMembersId={teamMembers}
              teamMembers={teamMembers}
            />
          </Panel>
          <Panel>
            <FindUserForm
              teamId={teamId}
              setSearchResults={this.setSearchResults}
            />
            {userSearchList && userSearchList.length > 0 ?
              <React.Fragment>
              <h2>Search results</h2>
              <List>
              {userSearchList.map((user) => (
                <li key={user._id}>
                  <h3>{user.username}</h3>
                  <Button
                    label="Send an invite"
                    isLoading={isSendingRequest === user._id}
                    onClick={() => this.sendRequest(user._id)}
                  />
                </li>
              ))}
            </List>
            </React.Fragment> : null}
          </Panel>

      </div>
    );
  }
}

TeamSettingsView.propTypes = {
  joinRequests: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
};

TeamSettingsView.defaultProps = {
  joinRequests: undefined,
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
};

export default styled(TeamSettingsView)`
width: 95%;
padding-top: 40px;
@media(max-width: 950px) {
  margin: 20px auto;
  width: 100%;
}
`;
