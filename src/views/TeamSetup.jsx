import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import api from '../modules/api-call'
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import List from '../components/_common/List';
import CreateTeamForm from '../components/forms/CreateTeamForm';
import FindTeamForm from '../components/forms/FindTeamForm';


class TeamSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      teamSearchList: undefined,
      isLoading: false,
    }
    this.setSearchResults = this.setSearchResults.bind(this);
  }

  sendRequest(teamId) {
    const { userId } = this.props;
    this.setState({ isLoading: true });
    api.put(`team/${teamId}`, {
      joinRequest: userId,
    })
    .then((res )=> {
      openAlert({ message: 'Your request has been sent', type: 'info' });
      this.setState({ isLoding: false });
    })
    .catch((err) => {
      openAlert({ message: `Error: ${err}`, type: 'danger' });
      this.setState({ isLoding: false });
    })
  }

  setSearchResults (teams) {
    this.setState({
      teamSearchList: teams,
    })
  }
  render() {
    const { className, userId } = this.props;
    const { teamSearchList } = this.state;
    return (
      <div className={className}>
        <Panel>
          <h2>Create a team</h2>
          <CreateTeamForm
            userId={userId}
          />
        </Panel>
        <Panel>
          <h2>Find a team</h2>
          <FindTeamForm
            setSearchResults={this.setSearchResults}
          />
          {teamSearchList && teamSearchList.length > 0 ?
            <React.Fragment>
            <h2>Search results</h2>
            <List>
            {teamSearchList.map((team) => (
              <li key={team._id}>
                <h3>{team.teamName}</h3>
                <Button
                  label="Request to join"
                  onClick={() => this.sendRequest(team._id)}
                />
              </li>
            ))}
          </List>
          </React.Fragment> : null}
      </Panel>
      </div>
    );
  }
}

TeamSetup.propTypes = {
  userId: PropTypes.string
};

TeamSetup.defaultProps = {
  userId: undefined,
};

export default styled(TeamSetup)`
margin 40px auto;
width: 800px;
h2 {
  margin-top 40px;
}
`;
