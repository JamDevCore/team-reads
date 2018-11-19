import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import history from '../modules/history';
import styled from 'styled-components';
import api from '../modules/api-call';
import SidebarMenu from '../components/SidebarMenu';
import TeamSetup from './TeamSetup';
import TeamOverview from './TeamOverview';
import Fallback from './Fallback';

class TeamView extends React.Component {
  constructor() {
    super();
      this.state = {
        teamId: undefined,
      }
  }

  render() {
    const { className, teamId } = this.props;
    console.log(teamId)
    return (
      <div className={className}>
        <SidebarMenu />
        <Switch>
          <Route exact path="/team/:id" component={TeamOverview} />
          <Route exact path="/team/:id/members"/>
          <Route exact path="/team/:id/books"/>
          <Route exact path="/team/:id/discussions"/>
          <Route exact path="/team/:id/settings"/>
          <Route exact path="/team/*" pathName="404" component={Fallback}/>
          </Switch>
      </div>
    );
  }
}

TeamView.propTypes = {
  userId: PropTypes.string,
};

TeamView.defaultProps = {
  userId: undefined,
};

export default styled(TeamView)`
width: 100%;
display: flex;
`;
