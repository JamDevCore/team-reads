import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../components/_common/Panel';


class TeamSetup extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Panel><h3></h3></Panel>
      </div>
    );
  }
}

TeamSetup.propTypes = {

};

TeamSetup.defaultProps = {

};

export default styled(TeamSetup)`
margin: 40px;
width: 100%;
`;
