import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme';

const Highlight = styled.div`
position: absolute;
width: 5px;
height: 100%;
left:0;
top:0;
background-color: ${theme.colors.primary};
border-radius: 5px 0px 0px 5px;
`;

const HighlightRight = styled.div`
position: absolute;
width: 5px;
height: 100%;
right:0;
top:0;
background-color: ${theme.colors.primary};
border-radius: 0px 5px 5px 0px;
`;

const Panel = ({ children, className, header }) => (
  <div className={className}>
    {header && <Highlight />}
    {children}
  </div>
);

Panel.propTypes = {
  className: PropTypes.string,
  header: PropTypes.bool,
};

Panel.defaultProps = {
  className:undefined,
  header: false,
};

export default styled(Panel)`
  width: 95%;
  position:relative;
  max-height: 600px;
  padding: ${({ header }) => header ? '20px 30px' : '30px 40px 40px 40px'};
  background-color: ${({ header }) => header ? theme.colors.light : 'white'};
  box-sizing: border-box;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  margin: 0px 10px 30px 10px;
  h2 {
    font-family: 'Maven Pro', sans-serif;
  }
  p {
    font-family: 'Maven Pro', sans-serif;
  }
  h3 {
    font-weight: bold;
  }
`;
