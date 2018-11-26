import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const Panel = ({ children, className}) => (
  <div className={className}>
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
};

Panel.defaultProps = {
  className:undefined,
};

export default styled(Panel)`
  width: 95%;
  max-height: 600px;
  padding: 30px 40px 40px 40px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  margin: 0px 10px 30px 10px;
  h2 {
    font-family: 'Maven Pro', sans-serif;
  }
  p {
    font-family: 'Maven Pro', sans-serif;
  }
  h3 {
    font-weight: bold;
  }
`;
