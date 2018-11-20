import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../components/_common/Panel';
import CreateTeamForm from '../components/forms/CreateTeamForm';
import FindTeamForm from '../components/forms/FindTeamForm';


class TeamSetup extends React.Component {

  render() {
    const { className, userId } = this.props;
    return (
      <div className={className}>
        <Panel>
          <CreateTeamForm
            userId={userId}
          />
        </Panel>
        <Panel>
          <FindTeamForm />
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
max-width: 800px;
`;
