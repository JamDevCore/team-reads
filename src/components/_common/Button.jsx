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
    type,
    isLoading,
  } = props;
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {icon && !isLoading ? <i className={icon} /> : null}
      {isLoading && <i className="fas fa-spinner fa-spin" />}
      {label}
    </button>)
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  icon: undefined,
  className: undefined,
  type: undefined,
  isLoading: undefined,
};

export default styled(Button)`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  display: flex;
  justify-content: center;
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
  i {
    margin-right: 10px;
  }
`;
