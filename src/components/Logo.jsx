import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../logo-blue.png';

const Logo = ({ className }) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
);

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: undefined,
};

export default styled(Logo)`
  height: 50px;
  width: 100px;
  padding: 25px;
  img {
    height: 50px;
  }
`;
