import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const Panel = ({ children, className, header }) => (
  <div className={className}>
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  header: PropTypes.bool,
};

Panel.defaultProps = {
  className:undefined,
  header: false,
};

export default styled(Panel)`
  width: 95%;
  position:relative;
  max-height: 600px;
  padding: 30px;
  background-color: ${({ header }) => header ? theme.colors.light : 'white'};
  box-sizing: border-box;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  margin: 0px 10px 30px 10px;
`;
