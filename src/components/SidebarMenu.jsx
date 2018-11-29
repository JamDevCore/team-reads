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
        <MobileNavLink to={`/team/${teamId}/`}>Team Central</MobileNavLink>
        <MobileNavLink to={`/team/${teamId}/books`}>Books</MobileNavLink>
        {/* <MobileNavLink to={`/team/${teamId}/members`}>Members</MobileNavLink> */}
        <MobileNavLink to={`/team/${teamId}/discussions`}>Discussions</MobileNavLink>
        <MobileNavLink to={`/team/${teamId}/settings`}>Settings</MobileNavLink>
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
  position: fixed;
  top: 60px;
  height: 100vh;
  z-index: 11;
  width: 250px;
  background-color: white;
  margin: 0;
`;
