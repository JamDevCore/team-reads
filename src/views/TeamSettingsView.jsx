import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';
import Panel from '../components/_common/Panel';
import UpdateTeamNameForm from '../components/forms/UpdateTeamNameForm';

class TeamSettingsView extends React.Component {

  render() {
    const { className, userId, teamId, teamName } = this.props;
    console.log(teamName)
    return (
      <div className={className}>
        <h1>Settings</h1>
          <Panel>
            <UpdateTeamNameForm
              key={teamName}
              userId={userId}
              teamId={teamId}
              teamName={teamName}
            />
          </Panel>
      </div>
    );
  }
}

TeamSettingsView.propTypes = {
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
};

TeamSettingsView.defaultProps = {
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
};

export default styled(TeamSettingsView)`
width: 70%;
margin: 0px auto;
.updateName {
  display: flex;
}
`;
