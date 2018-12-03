import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageTitle from '../components/_common/PageTitle';
import Panel from '../components/_common/Panel';


class TeamOverview extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Panel header >
        <PageTitle>Team home</PageTitle>
        </Panel>
      </div>
    );
  }
}

TeamOverview.propTypes = {

};

TeamOverview.defaultProps = {

};

export default styled(TeamOverview)`
width: 95%;
padding-top: 40px;
`;
