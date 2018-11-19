import React from 'react';
import PropTypes from 'prop-types';
import MobileNavLink from '../components/_common/MobileNavLink';
import styled from 'styled-components';
import theme from '../theme';

const teamId = "5bc4b158209338216135bbe4";

class SidebarMenu extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <MobileNavLink to={`/team/${teamId}/books`}>Books</MobileNavLink>
        <MobileNavLink to={`/team/${teamId}/members`}>Members</MobileNavLink>
        <MobileNavLink to={`/team/${teamId}/discussions`}>Discussions</MobileNavLink>
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  className: PropTypes.string,
};

SidebarMenu.defaultProps = {
  className: undefined,
};

export default styled(SidebarMenu)`
  padding: 20px;
  postion: fixed;
  height: 100vh;
  z-index: 0;
  width: 300px;
  background-color: white;
  margin: 0;
`;
