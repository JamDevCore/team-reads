import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import InputLabel from './InputLabel';
import theme from '../../../theme';

const Select = styled.select`
  box-sizing: border-box;
  height: 40px;
  background-color: transparent;
  padding: 10px 10px;
  color: ${theme.colors.black}
  border-radius: ${theme.borderRadius}px;
  border: 1px solid #d3d3d3;
  font-size: ${theme.fontSize}px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const SelectInput = ({
  label,
  className,
  field: { name, ...field },
  form: { touched, errors },
  placeholder,
  children,
  ...props,
}) => {
  const error = errors[name];
  const touch = touched[name];
  return (
    <div className={className}>
      <InputLabel>{label}</InputLabel>
        <Select
          placeholder={placeholder}
          hasError={error && touch}
          {...field}
          {...props}
        >
        {children}
      </Select>
    </div>);
}

SelectInput.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

SelectInput.defaultProps = {
  placeholder: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
};

export default styled(SelectInput)`
margin: 0 0 ${theme.baseMargin}px;
width: 100%;
box-sizing: border-box;
`;
