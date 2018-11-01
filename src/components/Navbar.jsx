import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';
class Navbar extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Link to="/">Your books</Link>
        <Link to="/">Team view</Link>
        <Link to="/">Settings</Link>
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
  a {
    color: ${theme.colors.black};
    font-weight: bold;
    margin: auto 20px;
  }
  a:last-child {
    margin-right: 40px;
  }
`;
