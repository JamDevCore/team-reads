import React from 'react';
import styled from 'styled-components';

class Callback extends React.Component {
  render() {
    console.log('render')
    const { className } = this.props;
    return (
      <div className={className}>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }
}

export default styled(Callback)`
  width 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
