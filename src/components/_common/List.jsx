import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../theme'

const List = (props) => (
  <div className={props.className}>
    <ul className="list">
    {props.children}
    </ul>
  </div>
);

List.propTypes = {

};

List.defaultProps = {

};

export default styled(List)`
  .list {
    list-style-type: none;
    padding: 0;
    li {
      display: flex;
      border-bottom: 1px solid ${theme.colors.black};
      justify-content: flex-start;
      padding: 10px 0;
      margin: auto 0;
      height: 50px;
      width: 100%;
      button {
        margin-left: 20px;
      }
    }
  }

`;
