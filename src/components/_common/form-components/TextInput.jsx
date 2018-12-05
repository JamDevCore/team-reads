import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import InputLabel from './InputLabel';
import InputError from './InputError';
import theme from '../../../theme';

const Input = styled.input`
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: ${theme.borderRadius}px;
  border: 1px solid #d3d3d3;
  font-size: ${theme.fontSize}px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const TextInput = ({
  label,
  className,
  field: { name, ...field },
  form: { touched, errors },
  placeholder,
  searchBar,
  type,
  ...props,
}) => {
  const error = errors[name];
  const touch = touched[name];
  return (
    <div className={className}>
      <InputLabel htmlFor={name} error={error}>{label}</InputLabel>
        <Input
          id={name}
          type={type || "text"}
          placeholder={placeholder}
          hasError={error && touch}
          {...field}
          {...props}
        />
      {searchBar && <i className="fas fa-search" />}
      {touch && error && <InputError>{error}</InputError>}
    </div>);
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchBar: PropTypes.bool,
  type: PropTypes.string,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

TextInput.defaultProps = {
  type: undefined,
  placeholder: undefined,
  searchBar: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
};

export default styled(TextInput)`
margin: 0 0 ${theme.baseMargin}px 0;
width: 100%;
box-sizing: border-box;
i {
  position: relative;
  top: -30px;
  right: -10px;
}
input {
  padding-left: ${(props) => props.searchBar ? '40px' : '10px'};
}
`;
