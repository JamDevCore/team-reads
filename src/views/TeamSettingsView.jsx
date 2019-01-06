import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { _ } from 'underscore';
import { openAlert } from 'simple-react-alert';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import BannerMessage from '../components/_common/BannerMessage';
import UpdateTeamNameForm from '../components/forms/UpdateTeamNameForm';
import FindUserForm from '../components/forms/FindUserForm';
import TeamMembers from '../components/TeamMembers';


class TeamSettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearchList: [],
      isSendingRequest: false,
      isAcceptingUser: false,
      isDecliningUser: false,
    };

    this.acceptJoinRequest = this.acceptJoinRequest.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  setSearchResults(users) {
    const { teamMembers } = this.props;
    console.log(teamMembers);
    const teamIds = _.pluck(teamMembers, '_id');
    const userSearch = users.filter(user => !_.contains(teamIds, user._id) && user._id);
    this.setState({
      userSearchList: userSearch,
    });
  }

  resetSearchResults() {
    this.setState({
      userSearchList: [],
    });
  }

  sendRequest(userId) {
    console.log(userId);
    const { teamId, updateTeamMembers } = this.props;
    this.setState({ isSendingRequest: userId });
    api.put(`team/${teamId}`, {
      sendInvitation: userId,
    })
      .then((res) => {
        console.log(res);
        openAlert({ message: 'Your invite has been sent', type: 'info' });
        this.setState({ isSendingRequest: false });
        api.get(`user/${userId}`)
          .then((response) => {
            const user = response.data;
            updateTeamMembers(user, true);
            this.resetSearchResults();
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        openAlert({ message: `Error: ${err}`, type: 'danger' });
        this.setState({ isSendingRequest: false });
      });
  }

  declineJoinRequest(userId) {
    const { teamId, removeJoinRequests } = this.props;
    console.log(userId, teamId);
    this.setState({ isDecliningUser: userId });
    api.put(`team/${teamId}`, {
      declineRequest: userId,
    })
      .then(() => {
        this.setState({ isDecliningUser: false });
        openAlert({ message: 'This request has been declined', type: 'success' });
        const user = { _id: userId };
        removeJoinRequests(user);
      })
      .catch((err) => {
        this.setState({ isDecliningUser: false });
        openAlert({ message: `Error: ${err}`, type: 'danger' });
      });
  }

  acceptJoinRequest(userId) {
    const { teamId, updateTeamMembers, removeJoinRequests } = this.props;
    console.log(userId, teamId);
    this.setState({ isAcceptingUser: userId });
    api.put(`team/${teamId}`, {
      newUser: userId,
    })
      .then(() => {
        this.setState({ isAcceptingUser: false });
        openAlert({ message: 'This request has been accepted', type: 'success' });
        api.get(`user/${userId}`)
          .then((response) => {
            const user = response.data;
            updateTeamMembers(user, true);
            removeJoinRequests(user);
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        this.setState({ isAcceptingUser: false });
        openAlert({ message: `Error: ${err}`, type: 'danger' });
      });
  }

  render() {
    const {
      className,
      userId,
      teamId,
      teamName,
      joinRequests,
      teamMembers,
      updateTeamMembers,
      updateTeamName,
    } = this.props;
    const {
      isAcceptingUser, isDecliningUser, userSearchList, isSendingRequest,
    } = this.state;
    console.log(teamId);
    return (
      <div className={className}>
        {joinRequests && joinRequests.length > 0
          ? joinRequests.map(user => (
            <BannerMessage
              key={user && user._id}
              isAlert
              meta={user && user._id}
              actionLoading={user && isAcceptingUser === user._id}
              closeLoading={user && isDecliningUser === user._id}
              action={this.acceptJoinRequest}
              closeAction={this.declineJoinRequest}
              actionLabel="Accept invite"
              closeLabel="Decline"
              message={user && `${user.email} has requested to join your team`}
            />))
          : null}
        <Panel>
          <UpdateTeamNameForm
            key={teamName}
            userId={userId}
            teamId={teamId}
            teamName={teamName}
            updateTeamName={updateTeamName}
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
            updateTeamMembers={updateTeamMembers}
          />
        </Panel>
        <Panel>
          <FindUserForm
            teamId={teamId}
            setSearchResults={this.setSearchResults}
          />
        </Panel>
        {userSearchList && userSearchList.length > 0 ? (
          <React.Fragment>
            {userSearchList.map(user => (
              <BannerMessage
                key={user}
                meta={user._id}
                actionLoading={isSendingRequest === user._id}
                action={this.sendRequest}
                actionLabel="Invite user"
                message={user && `Username: ${user.username} - Email: ${user.email}`}
              />))}
          </React.Fragment>) : null}
      </div>
    );
  }
}

TeamSettingsView.propTypes = {
  className: PropTypes.string,
  joinRequests: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  updateTeamMembers: PropTypes.func,
  updateTeamName: PropTypes.func,
  removeJoinRequests: PropTypes.func,
};

TeamSettingsView.defaultProps = {
  className: undefined,
  joinRequests: undefined,
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
  updateTeamMembers: undefined,
  updateTeamName: undefined,
  removeJoinRequests: undefined,
};

export default styled(TeamSettingsView)`
width: 95%;
padding-top: 40px;
h2 {
  margin: 20px 0px;
}
@media(max-width: 950px) {
  margin: 20px auto;
  width: 100%;
}
`;
