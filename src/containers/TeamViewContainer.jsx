import React from 'react';
import PropTypes from 'prop-types';
import Callback from '../components/Callback';
import history from '../modules/history';
import api from '../modules/api-call';
import TeamView from '../views/TeamView';
import { ascending } from '../modules/sort-by-date';

class TeamViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      teamId: undefined,
      teamName: undefined,
      teamMembers: [],
      joinRequests: [],
      sentInvitations: [],
    };
    this.updateTeamName = this.updateTeamName.bind(this);
    this.updateTeamMembers = this.updateTeamMembers.bind(this);
    this.removeJoinRequests = this.removeJoinRequests.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.setState({
        isLoading: true,
      })
      api.get(`user/${userId}`)
        .then((res) => {
          console.log(res);
          const user = res.data;
          if (user.teams[0]) {
            api.get(`team/${user.teams[0]}`)
              .then((response) => {
                const team = response.data;
                console.log(team);
                this.setState({
                  teamId: team._id,
                  teamName: team.teamName,
                  teamMembers: team.teamMembers.concat(team.sentInvitations),
                  sentInvitations: team.sentInvitations,
                  joinRequests: team.joinRequests,
                  isLoading: false,
                });
              });
          } else {
            history.push('/team-setup');
          }
        });
    }
  }

  updateTeamName(newName) {
    this.setState({
      teamName: newName,
    });
  }

  updateTeamMembers(user, isJoining) {
    console.log('here', user, isJoining)
    const { teamMembers } = this.state;
    let team = teamMembers;
    if (isJoining) {
      team.push(user);
      this.setState({
        teamMembers: team,
      });
    } else {
      team = team.filter(u => u._id !== user);
      this.setState({
        teamMembers: team,
      });
    }
  }

  removeJoinRequests(userId) {
    console.log(userId)
    const { joinRequests } = this.state;
    let requests = joinRequests;
    requests = joinRequests.filter(user => user._id !== userId);
    this.setState({
      joinRequests: requests,
    });
  }

  render() {
    const {
      isLoading,
      teamName,
      teamId,
      teamMembers,
      sentInvitations,
      joinRequests,
    } = this.state;
    const { userId } = this.props;
    return isLoading && !teamId ? <Callback /> : (
      <TeamView
        key={teamId}
        userId={userId}
        teamId={teamId}
        teamName={teamName}
        teamMembers={teamMembers}
        joinRequests={joinRequests}
        sentInvitations={sentInvitations}
        updateTeamName={this.updateTeamName}
        updateTeamMembers={this.updateTeamMembers}
        removeJoinRequests={this.removeJoinRequests}
      />);
  }
}

TeamViewContainer.propTypes = {
  userId: PropTypes.string,
};

TeamViewContainer.defaultProps = {
  userId: undefined,
};


export default TeamViewContainer;
