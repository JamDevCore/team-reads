import React from 'react';
import styled from 'styled-components';
import Load from '../Loading.svg';

class Loading extends React.Component {
  render() {
    console.log('render')
    const { className } = this.props;
    return (
      <div className={className}>
        <img src={Load} alt="loading"/>
      </div>
    );
  }
}

export default styled(Loading)`
  width 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80px;
  }
  i {
    font-size: 32px;
    margin-right: 30px;
  }
`;
