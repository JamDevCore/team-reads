import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import SidebarMenu from '../components/SidebarMenu';
import TeamSettingsView from './TeamSettingsView';
import TeamDiscussionListViewContainer from '../containers/TeamDiscussionListViewContainer';
import TeamBookListContainer from '../containers/TeamBookListContainer';
import Fallback from './Fallback';

const TeamView = ({
  teamId,
  className,
  userId,
  teamName,
  teamMembers,
  joinRequests,
  sentInvitations,
  updateTeamName,
  updateTeamMembers,
  removeJoinRequests,
}) => (
  <div className={className}>
    <React.Fragment>
      <SidebarMenu teamId={teamId} />
      <div className="teamView">
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
                updateTeamMembers={updateTeamMembers}
                updateTeamName={updateTeamName}
                removeJoinRequests={removeJoinRequests}
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

TeamView.propTypes = {
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  updateTeamMembers: PropTypes.func,
  updateTeamName: PropTypes.func,
  removeJoinRequests: PropTypes.func,
};

TeamView.defaultProps = {
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
  updateTeamMembers: undefined,
  updateTeamName: undefined,
  removeJoinRequests: undefined,
};

export default styled(TeamView)`
display: flex;
.teamView {
  margin-left: 300px;
  margin-right: 5px;
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
