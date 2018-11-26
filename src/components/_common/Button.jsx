import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';

const Button = (props) => {
  const {
    className,
    label,
    icon,
    onClick,
    type,
    isLoading,
    link,
  } = props;
  return !link ? (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {icon && !isLoading ? <i className={icon} /> : null}
      {isLoading && <i className="fas fa-spinner fa-spin" />}
      {label}
    </button>) :
      <Link to={link}>
        <button
          type={type}
          className={className}
          onClick={onClick}
        >
      {icon && !isLoading ? <i className={icon} /> : null}
      {isLoading && <i className="fas fa-spinner fa-spin" />}
      {label}
          </button>
      </Link>
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
};

Button.defaultProps = {
  label: undefined,
  onClick: undefined,
  icon: undefined,
  className: undefined,
  type: undefined,
  isLoading: undefined,
  link: undefined,
};

export default styled(Button)`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  display: flex;
  height: 40px;
  justify-content: center;
  background: ${theme.colors.success};
  font-size: ${theme.fontSize}px;
  margin: ${theme.baseMargin / 2}px 0;
  border: none;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  min-width: 120px;
  padding: 10px;
  cursor: pointer;
  font-family: 'Maven Pro', sans-serif;
  a {
    margin: 0;
    padding: 0;
    color: white;
    width: 100%;
    height: 100%;
  }
  i {
    margin-right: 10px;
    width: auto;
  }
`;
