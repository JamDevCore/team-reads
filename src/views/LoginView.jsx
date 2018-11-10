import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import Panel from '../components/_common/Panel';

class LoginView extends React.Component {
  render() {
    const { handleLogin, className } = this.props;
    return (
      <div className={className}>
        <Panel>
          <h1>Welcome to Team Reads</h1>
          <Button
            label="Login / Sign up"
            icon="fas fa-door-open"
            onClick={() => handleLogin()}
          />
          <HighlightButton
            label="Contact us"
          />
        </Panel>
      </div>
    );
  }
}

LoginView.propTypes = {
 className: PropTypes.string,
 handleLogin: PropTypes.func,
};

LoginView.defaultProps = {
 className: undefined,
 handleLogin: undefined,
};

export default styled(LoginView)`
margin: 100px;
button {
  margin-right: 10px;
}
`;
