import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import history from '../modules/history';
import styled from 'styled-components';
import api from '../modules/api-call';
import SidebarMenu from '../components/SidebarMenu';
import TeamOverview from './TeamOverview';
import TeamSettingsView from './TeamSettingsView';
import TeamDiscussionsView from './TeamDiscussionsView';
import TeamBooksView from './TeamBooksView';
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
    const { teamId } = this.props;
    if (teamId) {
      api.get(`team/${teamId}`)
      .then((res) => {
        const team = res.data;
        this.setState({
          teamName: team.teamName,
          teamMembers: team.teamMembers,
          joinRequests: team.joinRequests,
        });
      });
    }
  }

  render() {
    const { className, teamId } = this.props;
    const { teamMembers, teamName, joinRequests } = this.state;
    console.log(teamName)
    return (
      <div className={className}>
        <SidebarMenu />
        <div className="teamView">
        <Switch>
          <Route exact path="/team/:id" teamName={teamName} teamId={teamId} component={TeamOverview} />
          <Route exact path="/team/:id/members" teamId={teamId} component={TeamMembersView}/>
          <Route exact path="/team/:id/books" teamId={teamId} component={TeamBooksView}/>
          <Route exact path="/team/:id/discussions" teamId={teamId} component={TeamDiscussionsView}/>
          <Route
            exact
            path="/team/:id/settings"
            render={(props) =>
              <TeamSettingsView
                joinRequests={joinRequests}
                teamName={teamName}
                teamId={teamId}
                teamMembers={teamMembers}
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
`;
