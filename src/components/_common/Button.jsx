import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const Button = (props) => {
  const {
    className,
    label,
    icon,
    onClick,
  } = props;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {icon ? <i className={icon} /> : null}
      {label}
    </button>)
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  icon: undefined,
  className: undefined,
};

export default styled(Button)`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  background: ${theme.colors.success};
  font-size: ${theme.fontSize}px;
  margin-top: ${theme.baseMargin / 2}px;
  border: none;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  min-width: 50px;
  padding: 10px;
  cursor: pointer;
  font-family: 'Maven Pro', sans-serif;
`;
