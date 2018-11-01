import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import InputLabel from './InputLabel';
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
  ...props,
}) => {
  const error = errors[name];
  const touch = touched[name];
  return (
    <div className={className}>
      <InputLabel>{label}</InputLabel>
        <Input
          placeholder={placeholder}
          hasError={error && touch}
          {...field}
          {...props}
        />
    </div>);
}

TextInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

TextInput.defaultProps = {
  placeholder: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
};

export default styled(TextInput)`
margin: 0 0 ${theme.baseMargin}px 0;
width: 100%;
box-sizing: border-box;
`;
