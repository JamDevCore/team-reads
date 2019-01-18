import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';
import Logo from '../logo-green.png';
import MobileNavLink from './_common/MobileNavLink';

const MobileNav = styled.div`
  position: fixed;
  transition: right 1000ms;
  font-weight: bold;
  right: ${props => props.mobileNavIsOpen ? 0 : '-2000px'};
  width: 300px;
  background-color: white;
  height: 100%;
  padding-top: 20px;
  z-index: 100;
  color: ${theme.colors.black};
  i {
    text-align: right;
    display: block !important;
    font-size: 24px;
    color: ${theme.colors.black} !important;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 15 !important;
  background-color: rgba(33, 152, 243, 0.6);
  width: 100vw;
  height: 100%;
`

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNavIsOpen: false,
    }
  }

  toggleMobileNav() {
    const { mobileNavIsOpen } = this.state;
    this.setState({
      mobileNavIsOpen: !mobileNavIsOpen,
    });
  }

  renderMobileNav() {
    const { teamId, handleLogout } = this.props;
    const { mobileNavIsOpen } = this.state;
    return mobileNavIsOpen && (
      <MobileNav mobileNavIsOpen={mobileNavIsOpen}>
        <i
          className="fas fa-times"
          onClick={() => this.toggleMobileNav()}
        />
      <MobileNavLink onClick={() => this.toggleMobileNav()} to="/">Your books</MobileNavLink>
        <MobileNavLink onClick={() => this.toggleMobileNav()}to={`/team/${teamId}/books`}>Team view</MobileNavLink>
        <MobileNavLink onClick={() => this.toggleMobileNav()} to="/settings">Settings</MobileNavLink>
        <MobileNavLink onClick={() => handleLogout()} to="/login">Logout</MobileNavLink>
      </MobileNav>);
  }

  renderOverlay() {
    const { mobileNavIsOpen } = this.state;
    return mobileNavIsOpen && (
      <Overlay onClick={() => this.toggleMobileNav()} mobileNavIsOpen={mobileNavIsOpen} />);
  }

  render() {
    const { className, handleLogout, teamId } = this.props;
    return (
      <div className={className}>
        <Link to="/">
          <img src={Logo} alt="team-reads-logo"></img>
        </Link>
        <Link className="navLink" to="/">Your books</Link>
        <Link className="navLink" to={`/team/${teamId}/books`}>Team view</Link>
        <Link className="navLink" to="/settings">Settings</Link>
        <Link className="navLink" to="/login" onClick={() => handleLogout()}>Logout</Link>
        <i
          className="fas fa-bars"
          onClick={() => this.toggleMobileNav()}
        />
      {this.renderMobileNav()}
      {this.renderOverlay()}
      </div>
    );
  }
}

Navbar.propTypes = {
  className: PropTypes.string,
  handleLogout: PropTypes.func,
  teamId: PropTypes.string,
};

Navbar.defaultProps = {
  className: undefined,
  handleLogout: undefined,
  teamId: undefined,
};

export default styled(Navbar)`
  position:fixed;
  z-index: 2;
  width: 100%;
  height: 60px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: ${theme.boxShadow};
  background-color: ${theme.colors.primaryBright};
  i {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    margin: auto 20px;
  }
  @media(max-width: 960px) {
    i {
      display: block;
    }
    .navLink {
      display: none;
    }
    .navLink:first-of-type {
      display: block;
    }
  }
  .navLink {
    color: white;
    font-weight: bold;
    margin: auto 20px;
    padding: 5px 0px;
    border-bottom: 2px solid ${theme.colors.primaryBright};
  }
  }
  .navLink:last-of-type {
    margin-right: 40px;
  }
  .navLink:focus,
  .navLink:active {
    border-bottom: 2px solid white;
  }
  img {
    width: 200px;
    position: absolute;
    left: 0;
  }
`;
