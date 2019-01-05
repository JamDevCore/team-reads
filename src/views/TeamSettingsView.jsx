import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { _ } from 'underscore';
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
  constructor(props) {
    super(props);
    this.state = {
      userRequests: this.props.joinRequests,
      userSearchList: [],
      isSendingRequest: false,
      isAcceptingUser: false,
      isDecliningUser: false,
      teamMembers: this.props.teamMembers,
    }

    this.acceptJoinRequest = this.acceptJoinRequest.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.removeTeamMember = this.removeTeamMember.bind(this);
  }

  acceptJoinRequest(userId) {
    const { teamId, updateTeam } = this.props;
    console.log(userId, teamId)
    this.setState({ isAcceptingUser: userId });
    api.put(`team/${teamId}`, {
      newUser: userId,
    })
    .then(() => {
      this.setState({ isAcceptingUser: false })
      openAlert({ message: "This request has been accepted", type: "success" });
      api.get(`user/${userId}`)
        .then((response) => {
          const user = response.data;
          this.updateTeam(user)
          this.removeJoinRequests();
        })
        .catch(err => console.log(err))
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
    console.log(userId)
    const { teamId } = this.props;
    console.log(userId)
    this.setState({ isSendingRequest: userId });
    api.put(`team/${teamId}`, {
      sendInvitation: userId,
    })
      .then((res) => {
        console.log(res)
        openAlert({ message: 'Your invite has been sent', type: 'info' });
        this.setState({ isSendingRequest: false });
        api.get(`user/${userId}`)
          .then((response) => {
            const user = response.data;
            this.updateTeam(user)
            this.resetSearchResults();
          })
          .catch(err => console.log(err))
      })
      .catch((err) => {
        openAlert({ message: `Error: ${err}`, type: 'danger' });
        this.setState({ isSendingRequest: false });
      })
  }

  resetSearchResults() {
    this.setState({
      userSearchList: [],
    });
  }

  updateTeam(user) {
    const { teamMembers } = this.state;
    const team = teamMembers;
    team.push(user);
    this.setState({
      teamMembers: team,
    });
  }

  removeJoinRequests(userId) {
    const { userRequests } = this.state;
    let requests = userRequests;
    requests = requests.filter(user => user._id !== userId);
    this.setState({
      userRequests: requests,
    });
  }

  removeTeamMember(userId) {
    const { teamMembers } = this.state;
    let team = teamMembers;
    team = team.filter(user => user._id !== userId);
    this.setState({
      teamMembers: team,
    });
  }

  setSearchResults(users) {
    const { teamMembers } = this.state;
    console.log(teamMembers)
    const teamIds = _.pluck(teamMembers, '_id');
    const userSearch = users.filter(user => !_.contains(teamIds, user._id) && user._id)
    this.setState({
      userSearchList: userSearch,
    })
  }

  render() {
    const {
      className, userId, teamId, teamName, sentInvitations,
    } = this.props;
    const {
      userRequests, isAcceptingUser, isDecliningUser, userSearchList, isSendingRequest, teamMembers,
    } = this.state;
    console.log(teamId)
    return (
      <div className={className}>
          {userRequests && userRequests.length > 0 ?
          userRequests.map((user) => {
          return (
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
              removeTeamMember={this.removeTeamMember}
            />
          </Panel>
          <Panel>
            <FindUserForm
              teamId={teamId}
              setSearchResults={this.setSearchResults}
            />
          </Panel>
            {userSearchList && userSearchList.length > 0 ?
              (<React.Fragment>
                {userSearchList.map((user) => (
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
  joinRequests: PropTypes.arrayOf(PropTypes.object),
  sentInvitations: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  updateTeam: PropTypes.func,
};

TeamSettingsView.defaultProps = {
  joinRequests: undefined,
  sentInvitations: undefined,
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
  updateTeam: undefined,
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
