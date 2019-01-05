import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const Heading = styled.div`
position: absolute;
width: 100%;
height: 40px;
text-align:left;
`

const Panel = ({ children, className, heading }) => (
  <div className={className}>
    {heading && <Heading><h5>{heading}</h5></Heading>}
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.bool,
};

Panel.defaultProps = {
  className:undefined,
  heading: false,
};

export default styled(Panel)`
  width: 95%;
  position:relative;
  max-height: 600px;
  padding: 30px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  margin: 0px 10px 30px 10px;
`;
