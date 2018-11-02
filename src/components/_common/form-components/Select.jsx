import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import InputLabel from './InputLabel';
import theme from '../../../theme';

const Select = ({
  label,
  className,
  children,
  id,
}) => {
  return (
    <div className={className}>
      <InputLabel>{label}</InputLabel>
        <select
          id={id}
        >
        {children}
      </select>
    </div>);
}

Select.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  id: PropTypes.string,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

Select.defaultProps = {
  placeholder: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
  id: undefined,
};

export default styled(Select)`
margin: 0 0 ${theme.baseMargin}px;
width: 100%;
box-sizing: border-box;
select {
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
}
`;
