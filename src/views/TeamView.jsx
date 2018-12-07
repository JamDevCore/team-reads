import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import history from '../modules/history';
import styled from 'styled-components';
import api from '../modules/api-call';
import SidebarMenu from '../components/SidebarMenu';
import TeamOverview from './TeamOverview';
import TeamSettingsView from './TeamSettingsView';
import TeamDiscussionListViewContainer from '../containers/TeamDiscussionListViewContainer';
import TeamBookListContainer from '../containers/TeamBookListContainer';
import TeamMembersView from './TeamMembersView';
import Fallback from './Fallback';

class TeamView extends React.Component {
  constructor() {
    super();
      this.state = {
        teamName: undefined,
        teamMembers: [],
        joinRequests: [],
      }
  }

  componentDidMount() {
    const { teamId, userId } = this.props;
    if (teamId) {
      console.log(teamId)
      api.get(`team/${teamId}`)
      .then((res) => {
        const team = res.data;
        console.log(team)
        console.log(team.joinRequests)
        this.setState({
          teamName: team.teamName,
          teamMembers: team.teamMembers,
          joinRequests: team.joinRequests,
        });
      });
    } else {
      history.push('/team-setup');
      api.get(`user/${userId}`)
      .then((res) => {
        const user = res.data;
        this.setState({
          teamInvites: user.teamInvites,
        });
      });
    }
  }

  render() {
    const { className, teamId, userId } = this.props;
    const { teamMembers, teamName, joinRequests } = this.state;
    console.log(teamId)
    return (
      <div className={className}>
        <SidebarMenu teamId={teamId} />
        <div className="teamView">
        <Switch>
          {/* <Route exact path="/team/:id" teamName={teamName} teamId={teamId} component={TeamOverview} /> */}
          {/* <Route exact path="/team/:id/members" teamId={teamId} component={TeamMembersView}/> */}
          <Route
            exact
            path="/team/:id/books"
            render={(props) =>
              <TeamBookListContainer
                teamId={teamId}
                teamMembers={teamMembers}
                teamName={teamName}
                {...props}
                />}
              />
          <Route
            exact
            path="/team/:id/discussions"
            teamId={teamId}
            render={(props) =>
              <TeamDiscussionListViewContainer
                teamId={teamId}
                teamMembers={teamMembers}
                teamName={teamName}
                {...props}

              />}/>
          <Route
            exact
            path="/team/:id/settings"
            render={(props) =>
              <TeamSettingsView
                key={joinRequests.length}
                joinRequests={joinRequests}
                teamName={teamName}
                teamId={teamId}
                teamMembers={teamMembers}
                userId={userId}
                { ...props}
                />}
              />
          <Route exact path="/team/*" pathName="404" render={() => <Fallback />}/>
        </Switch>
        </div>
      </div>
    );
  }
}

TeamView.propTypes = {
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.string),
};

TeamView.defaultProps = {
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
};

export default styled(TeamView)`
display: flex;
.teamView {
  margin-left: 350px;
  width: 100%;
  display: flex;
}
@media(max-width: 950px) {
  .teamView {
    margin: 0;
    width: 100%;
  }
}
`;
