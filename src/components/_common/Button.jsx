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
    theme,
  } = props;
  return !link ? (
    <div className={className}>
      <button
        type={type}
        className={theme}
        onClick={onClick}
      >
        {icon && !isLoading ? <i className={icon} /> : null}
        {isLoading && <i className="fas fa-spinner fa-spin" />}
        {label}
      </button>
    </div>) :
    <div className={className}>
      <a href={link}>
        <button
          type={type}
          className={theme}
          onClick={onClick}
        >
      {icon && !isLoading ? <i className={icon} /> : null}
      {isLoading && <i className="fas fa-spinner fa-spin" />}
      {label}
          </button>
      </a>
    </div>
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
  isFullWidth: PropTypes.bool,
  theme: PropTypes.string,
};

Button.defaultProps = {
  isFullWidth: undefined,
  label: undefined,
  onClick: undefined,
  icon: undefined,
  className: undefined,
  type: undefined,
  isLoading: undefined,
  link: undefined,
  theme: undefined,
};

export default styled(Button)`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  .info {
    background-color: ${theme.colors.info} !important;
  }
  .success {
    background: ${theme.colors.success};
  }
  .highlight {
    background: ${theme.colors.highlight};
  }
  .danger {
    background: ${theme.colors.danger};
  }
  .link {
    background-color: transparent;
    color: ${theme.colors.primary};
    i {
      padding: 3px;
      margin-right: 8px;
      text-decoration: none !important;
    }
    &:hover {
      background-color: ${theme.colors.lightGrey};
    }
  }
  a {
    margin: 0;
    padding: 0;
    color: white;
    width: 100%;
    height: 100%;
  }
  button {
  display: flex;
  height: 40px;
  justify-content: center;
  background: ${theme.colors.success};
  font-size: 16px;
  margin: ${theme.baseMargin / 2}px 0 0;
  border: none;
  color: white;
  border-radius: 3px;
  font-weight: 500;
  min-width: 80px;
  width: ${props => props.isFullWidth ? '100%' : ''};
  padding: 0px 10px;
  cursor: pointer;
  font-family: 'Maven Pro', sans-serif;

  i {
    margin: 0;
    padding: 0 7px;
    text-decoration: none !important;
  }
  }
`;
