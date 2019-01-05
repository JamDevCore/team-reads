import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import history from '../modules/history';
import api from '../modules/api-call';
import SidebarMenu from '../components/SidebarMenu';
import TeamOverview from './TeamOverview';
import TeamSetup from './TeamSetup';
import TeamSettingsView from './TeamSettingsView';
import TeamDiscussionListViewContainer from '../containers/TeamDiscussionListViewContainer';
import TeamBookListContainer from '../containers/TeamBookListContainer';
import TeamMembersView from './TeamMembersView';
import Fallback from './Fallback';
import Callback from '../components/Callback';

class TeamView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  updateTeam() {

  }

  render() {
    const { className, teamId, userId } = this.props;
    const {
      teamMembers, teamName, joinRequests, sentInvitations, isLoading
    } = this.props;
    console.log(teamMembers, joinRequests)
    return (
      <div className={className}>
        <React.Fragment>
          <SidebarMenu teamId={teamId} />
          <div className="teamView">
          {/*<TeamBookListContainer
            teamId={teamId}
            teamMembers={teamMembers}
            teamName={teamName}
            {...this.props}
          />*/}
        <Switch>
          {/* <Route exact path="/team/:id" teamName={teamName} teamId={teamId} component={TeamOverview} /> */}
          {/* <Route exact path="/team/:id/members" teamId={teamId} component={TeamMembersView}/> */}
          <Route
            exact
            path="/team/:id/books"
            render={props => (
              <TeamBookListContainer
                teamId={teamId}
                teamMembers={teamMembers}
                teamName={teamName}
                {...props}
              />)}
          />
          <Route
            exact
            path="/team/:id/discussions"
            teamId={teamId}
            render={props => (
              <TeamDiscussionListViewContainer
                teamId={teamId}
                teamMembers={teamMembers}
                teamName={teamName}
                {...props}
              />)}
            />
          <Route
            exact
            path="/team/:id/settings"
            render={props => (
              <TeamSettingsView
                key={joinRequests.length}
                joinRequests={joinRequests}
                sentInvitations={sentInvitations}
                teamName={teamName}
                teamId={teamId}
                teamMembers={teamMembers}
                userId={userId}
                {...props}
              />)}
          />
          <Route
            exact
            path="/team/*"
            pathName="404"
            render={() => <Fallback />}
          />
        </Switch>
          </div>
        </React.Fragment>
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
  margin-left: 320px;
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
