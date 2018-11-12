import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import ButtonGroup from '../components/_common/ButtonGroup';
import Panel from '../components/_common/Panel';

class LoginView extends React.Component {
  render() {
    const { handleLogin, className } = this.props;
    return (
      <div className={className}>
        <Panel>
          <div className="loginContainer">
            <h1>Welcome to Team Reads</h1>
              <ButtonGroup>
              <Button
                label="Enter"
                icon="fas fa-door-open"
                onClick={() => handleLogin()}
              />
              <HighlightButton
                label="Contact us"
              />
            </ButtonGroup>
          </div>
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
margin: 100px auto;
max-width: 600px;
.loginContainer {
  width: 320px;
}
`;
