import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import InputLabel from './InputLabel';
import theme from '../../../theme';

const Input = styled.textarea`
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

const Textarea = ({
  label,
  className,
  rows,
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
          id={name}
          placeholder={placeholder}
          hasError={error && touch}
          rows={rows}
          {...field}
          {...props}
        />
    </div>);
}

Textarea.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

Textarea.defaultProps = {
  placeholder: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
  rows: undefined,
};

export default styled(Textarea)`
margin: 0 0 ${theme.baseMargin}px 0;
width: 100%;
box-sizing: border-box;
`;
