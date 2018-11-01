import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../theme';

const Form = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]).isRequired,
};

Form.defaultProps = {
  className: undefined,
};

export default styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 ${theme.baseMargin * 2}px ${theme.baseMargin * 2}px ${theme.baseMargin * 2}px;
  box-sizing: border-box;
`;
