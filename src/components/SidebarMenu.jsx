import React from 'react';
import PropTypes from 'prop-types';
import MobileNavLink from '../components/_common/MobileNavLink';
import styled from 'styled-components';
import theme from '../theme';

class SidebarMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      isMobileNavOpen: false,
    }
  }

  toggleMobileNav() {
    const { isMobileNavOpen } = this.state;
    this.setState({
      isMobileNavOpen: !isMobileNavOpen,
    });
  }

  render() {
    const { className } = this.props;
    const { teamId } = this.props;
    const { isMobileNavOpen } = this.state;
    const mobileNavMenu = isMobileNavOpen ? 'openLinks' : 'closedLinks';
    return (
      <div className={className}>
        {/*<MobileNavLink to={`/team/${teamId}/`}>Team Central</MobileNavLink>*/}
        {<div
          className="button"
          onClick={() => this.toggleMobileNav()}
        >
          <p>Team menu</p>
        </div>}
        <div className={mobileNavMenu}>
          <MobileNavLink onClick={() => this.toggleMobileNav()} to={`/team/${teamId}/books`}>Books</MobileNavLink>
          {/* <MobileNavLink to={`/team/${teamId}/members`}>Members</MobileNavLink> */}
          <MobileNavLink onClick={() => this.toggleMobileNav()} to={`/team/${teamId}/discussions`}>Discussions</MobileNavLink>
          <MobileNavLink onClick={() => this.toggleMobileNav()} to={`/team/${teamId}/settings`}>Settings</MobileNavLink>
        </div>
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  className: PropTypes.string,
  teamId: PropTypes.string,
};

SidebarMenu.defaultProps = {
  className: undefined,
  teamId: undefined,
};

export default styled(SidebarMenu)`
  padding: 20px 0;
  position: fixed;
  top: 60px;
  height: 100vh;
  z-index: 1;
  width: 250px;
  background-color: white;
  margin: 0;
  .button {
    cursor: pointer;
    display: none;
    padding: 0;
    p {
    margin:0;
    font-weight: 500;
    width: 100%;
    padding:0;
    text-align: center;
    }
  }
  .button {
    display: none;
  }
  @media(max-width: 950px) {
    padding: 0;
    width: 100%;
    height: 40px;
    top: 60px;
    .button {
      padding: 10px 0px 10px 0px;
      color: ${theme.colors.light}
      display: flex;
      border-bottom: ${theme.colors.lightGrey}
      box-shadow: ${theme.boxShadow};
    }
    .button:hover {
      background-color: ${theme.colors.grey}
    }
    .closedLinks {
      display: none;
    }
    .openLinks {
      padding: 0px 0px;
      text-align: center;
      width: 100vw;
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: ${theme.strongBoxShadow};
      border-top: 1px solid ${theme.colors.lightGrey}
      a {
        margin: 0;
        padding: 20px 20px;
        font-size: 20px;
        font-weight: 500;
        height: 100%;
        width: 100%;
      }
      a:hover {
        background-color: ${theme.colors.grey};
      }
    }
  }
`;
