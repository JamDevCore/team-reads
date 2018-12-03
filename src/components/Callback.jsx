import React from 'react';
import Load from '../Loading.svg';
import styled from 'styled-components';

class Callback extends React.Component {
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

export default styled(Callback)`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    margin: 0px auto;
  }
  i {
    font-size: 48px;
    margin-right: 30px;
  }
`;
