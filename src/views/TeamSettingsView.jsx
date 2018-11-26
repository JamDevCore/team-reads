import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import api from '../modules/api-call';
import theme from '../theme';
import Panel from '../components/_common/Panel';
import BannerMessage from '../components/_common/BannerMessage';
import UpdateTeamNameForm from '../components/forms/UpdateTeamNameForm';
import TeamMembers from '../components/TeamMembers';


class TeamSettingsView extends React.Component {
  constructor() {
    super();
    this.state = {
      userRequests: [],
      isAcceptingUser: undefined,
      isDeclining: false,
    }

    this.acceptJoinRequest = this.acceptJoinRequest.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
  }
  componentDidMount() {
    const { joinRequests } = this.props;
    const { userRequests } = this.state;
    joinRequests.forEach((id) => {
      api.get(`user/${id}`)
      .then((res) => {
        const requests = userRequests;
        requests.push(res.data)
        this.setState({
          userRequests,
        })
      })
      .catch(err => console.log(err));
    })
  }

  acceptJoinRequest(userId) {
    const { teamId } = this.props;
    console.log(userId, teamId)
    this.setState({ isAcceptingUser: userId });
    api.put(`team/${teamId}`, {
      newUser: userId,
    })
    .then(() => {
      this.setState({ isAcceptingUser: undefined })
      openAlert({ message: "The join request has been accepted", type: "success" });
    })
    .catch((err) => {
      this.setState({ isAcceptingUser: undefined });
      openAlert({ message: `Error: ${err}`, type: "danger" });
    })
  }

  declineJoinRequest(userId) {
    console.log(userId)
  }
  render() {
    const { className, userId, teamId, teamName, teamMembers } = this.props;
    const { userRequests, isAcceptingUser, isDeclining } = this.state;
    console.log(teamId)
    return (
      <div className={className}>
        <h1>Settings</h1>
          {userRequests && userRequests.length > 0 ?
          userRequests.map((user) => {
          return (
            <BannerMessage
              key={user._id}
              meta={user._id}
              actionLoading={isAcceptingUser === user._id}
              closeAction={isDeclining}
              action={this.acceptJoinRequest}
              closeAction={this.declineJoinRequest}
              actionLabel="Accept invite"
              closeLabel="Decline"
              message={`${user.email} has requested to join your team`}
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
            />
          </Panel>
      </div>
    );
  }
}

TeamSettingsView.propTypes = {
  joinRequests: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.string),
};

TeamSettingsView.defaultProps = {
  joinRequests: undefined,
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: PropTypes.arrayOf(PropTypes.string),
};

export default styled(TeamSettingsView)`
width: 95%;
h1 {
  margin-left: 10px;
}
`;
