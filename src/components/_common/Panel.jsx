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
  children: PropTypes.string,
  className: PropTypes.sring,
};

Panel.defaultProps = {
  children: undefined,
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
  box-shadow: ${theme.boxShadow};
  margin: 0px 10px;
  h2 {
    font-family: 'Playfair Display', serif;
  }
  p {
    font-family: 'Playfair Display', serif;
  }
  h3 {
    font-weight: bold;
  }
`;
