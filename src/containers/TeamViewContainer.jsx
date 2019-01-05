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
    }
  }

  componentDidMount() {
    const { teamId, userId } = this.props;
    this.setState({
      isLoading: true,
    })
    if (userId) {
      api.get(`user/${userId}`)
        .then((res) => {
          console.log(res)
          const user = res.data;
          if (user.teams[0]) {
            api.get(`team/${user.teams[0]}`)
              .then((response) => {
                const team = response.data;
                console.log(team)
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
      />)
  }
}

TeamViewContainer.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object)
};

TeamViewContainer.defaultProps = {
  userId: undefined,
  username: undefined,
  teamMembers: undefined,
};


export default TeamViewContainer;
