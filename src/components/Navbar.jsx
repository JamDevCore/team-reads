import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';
import Logo from '../logo.png';

const MobileNav = styled.div`
  position: fixed;
  transition: right 1000ms;
  right: ${props => props.mobileNavIsOpen ? 0 : '-2000px'};
  width:300px;
  background-color: white;
  height: 100%;
  z-index: 100;
  text-align: right;
  padding: 20px;
  color: ${theme.colors.black};
  .mobileNavLink {
    display: block !important;
    margin: 20px;
    font-size: 32px;
    font-weight: bold;
    color: ${theme.colors.black};
  }
  i {
    display: block !important;
    font-size: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  background-color: rgba(33, 152, 243, 0.6);
  width: 100%;
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
    const { mobileNavIsOpen } = this.state;
    return mobileNavIsOpen && (
      <MobileNav mobileNavIsOpen={mobileNavIsOpen}>
        <i
          className="fas fa-times"
          onClick={() => this.toggleMobileNav()}
        />
      <Link className="mobileNavLink" to="/">Your books</Link>
        <Link className="mobileNavLink" to="/">Team view</Link>
        <Link className="mobileNavLink" to="/">Settings</Link>
      </MobileNav>);
  }

  renderOverlay() {
    const { mobileNavIsOpen } = this.state;
    return mobileNavIsOpen && (
      <Overlay onClick={() => this.toggleMobileNav()} mobileNavIsOpen={mobileNavIsOpen} />);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Link to="/">
          <img src={Logo} alt="team-reads-logo"></img>
        </Link>
        <Link className="navLink" to="/">Your books</Link>
        <Link className="navLink" to="/">Team view</Link>
        <Link className="navLink" to="/">Settings</Link>
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
};

Navbar.defaultProps = {
  className: undefined,
};

export default styled(Navbar)`
  position: relative;
  width: 100%;
  height: 60px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: ${theme.boxShadow};
  background-color: white;
  i {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: ${theme.colors.black};
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
    color: ${theme.colors.black};
    font-weight: bold;
    margin: auto 20px;
  }
  .navLink:last-of-type {
    margin-right: 40px;
  }

  img {
    width: 200px;
    position: absolute;
    left: 0;
  }
`;
