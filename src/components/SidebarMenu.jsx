import React from 'react';
import PropTypes from 'prop-types';
import MobileNavLink from '../components/_common/MobileNavLink';
import styled from 'styled-components';
import theme from '../theme';

const teamId = "5bc4b158209338216135bbe4";

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
    const { isMobileNavOpen } = this.state;
    const mobileNavMenu = isMobileNavOpen ? 'openLinks' : 'closedLinks';
    return (
      <div className={className}>
        {/*<MobileNavLink to={`/team/${teamId}/`}>Team Central</MobileNavLink>*/}
        <div
          className="button"
          onClick={() => this.toggleMobileNav()}
        >
          <p>View options</p>
        </div>
        <div className={mobileNavMenu}>
          <MobileNavLink to={`/team/${teamId}/books`}>Books</MobileNavLink>
          {/* <MobileNavLink to={`/team/${teamId}/members`}>Members</MobileNavLink> */}
          <MobileNavLink to={`/team/${teamId}/discussions`}>Discussions</MobileNavLink>
          <MobileNavLink to={`/team/${teamId}/settings`}>Settings</MobileNavLink>
        </div>
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
    font-weight: bold;
    width: 100%;
    padding:0;
    text-align: center;
    }
  }
  @media(max-width: 950px) {
    padding: 0;
    width: 100%;
    height: 40px;
    top: 60px;
    .closedLinks {
      display: none;
    }
    .openLinks {
      text-align: center;
      width: 100vw;
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: ${theme.strongBoxShadow};
      border-top: 1px solid ${theme.colors.lightGrey}
    }
    .button {
      padding: 10px 0px 10px 0px;
      color: ${theme.colors.light}
      display: flex;
    }
    .button:hover {
      background-color: ${theme.colors.grey}
    }
  }
`;
