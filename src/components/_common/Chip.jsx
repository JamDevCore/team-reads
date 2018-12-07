import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';
import styled from 'styled-components';

const Chip = ({ text, className }) => (
  <div className={className}>
    <p>{text}</p>
  </div>
);

Chip.propTypes = {
  text: PropTypes.string,
};

Chip.defaultProps = {
  text: undefined,
};

export default styled(Chip)`
  padding: 0px 15px;
  p {
    margin: 5px;
  }
  font-weight: bold;
  border-radius: 25px 25px;
  min-width: 80px;
  border: 2px solid ${theme.colors.light}
`;
