import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import theme from '../../../theme';

const SelectLabel = styled.label`
  export default styled.label
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro|Playfair+Display|Roboto');
  font-size: ${theme.fontSize}px;
  display: block;
  margin: 0px 10px;
  font-family: 'Maven Pro', sans-serif;
  text-align: left;
  font-weight: bold;
`;
const Select = ({
  label,
  className,
  children,
  onChange,
  name,
  id,
}) => {
  return (
    <div className={className}>
      {label ? <SelectLabel>{label}</SelectLabel> : null}
        <select
          id={id}
          name={name}
          onChange={onChange}
        >
        {children}
      </select>
    </div>);
}

Select.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  /* eslint-disable react/forbid-prop-types,react/require-default-props */
  field: PropTypes.object,
  form: PropTypes.object,
  id: PropTypes.string,
  /* eslint-enable react/forbid-prop-types,react/require-default-props */
};

Select.defaultProps = {
  placeholder: undefined,
  onChange: undefined,
  label: undefined,
  field: undefined,
  form: undefined,
  id: undefined,
  name: undefined,
};

export default styled(Select)`
width: 95%;
box-sizing: border-box;

select {
  margin: ${theme.baseMargin / 2}px 10px;
  box-sizing: border-box;
  height: 40px;
  background-color: white;
  padding: 0px 10px;
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
