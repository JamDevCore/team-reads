import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/_common/Button';
import Logo from '../components/Logo';
import ButtonGroup from '../components/_common/ButtonGroup';
import background from '../background.png';
import Panel from '../components/_common/Panel';

class LoginView extends React.Component {
  render() {
    const { handleLogin, className } = this.props;
    return (
      <div className={className}>
        <div className="logo"><Logo /></div>
        <div className="taglineContainer">
          <div className="login">
            <h1>Read, share, thrive</h1>
            <h3>Enable your team to benefit from the power of compound learning. Read books, share insights and discuss ideas that will shape the future of your team.
            </h3>
              <ButtonGroup>
              <Button
                theme="success"
                label="Get started"
                onClick={() => handleLogin()}
              />
              <Button
                theme="highlight"
                status="secondary"
                label="Contact us"
              />
            </ButtonGroup>
            </div>
        </div>
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
background-image: url(${background});
background-repeat: no-repeat;
background-position: center right;
height: 100%;
.logo {
  width: 100px;
  background-color: transparent;
  height: 150px;
}
.taglineContainer {
  width: 100%;
  margin: 40px;
}
.login {
  max-width: 600px;

}
@media(max-width: 950px) {
  .loginContainer {
    width: 100%;
  }
}
`;
