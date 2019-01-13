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
  field,
  form,
  placeholder,
  searchBar,
  type,
  id,
  ...props
}) => {
  const error = field && form ? form.errors[field.name] : '';
  const touch = field && form ? form.touched[field.name] : '';
  return (
    <div className={className}>
      <InputLabel htmlFor={(field && field.name) || id} error={error}>{label}</InputLabel>
        <Input
          id={(field && field.name) || id}
          type={type || "text"}
          placeholder={placeholder}
          hasError={error && touch}
          {...field}
          {...props}
        />
      {searchBar && <i className="fas fa-search" />}
      {form && form.touch && form.error && <InputError>{form.error}</InputError>}
    </div>);
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchBar: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
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
  id: PropTypes.string,
};

export default styled(TextInput)`
margin: 0px 20px;
i {
  position: relative;
  top: -30px;
  right: -10px;
}
input {
  padding-left: ${(props) => props.searchBar ? '40px' : '10px'};
}
`;
