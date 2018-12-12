import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';


class Fallback extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <i className="fas fa-sad-tear"></i>
        <h2>Please forgive us..</h2>
        <h3>We couldn't find what you were looking for, <br /> but we promise to make it up to you!</h3>
          <Button
            label="Return to home"
            link="/"
          />
      </div>
    );
  }
}

Fallback.propTypes = {

};

Fallback.defaultProps = {

};

export default styled(Fallback)`
  height: 100%;
  display: flex;
  margin: 100px auto;
  text-align: center;
  flex-direction: column
  min-width:300px;
  i {
    font-size: 62px;
  }
  button {
    margin: 20px auto;
  }
`;
