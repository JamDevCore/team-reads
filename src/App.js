import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Alert from 'simple-react-alert';
import history from './modules/history';
import AuthenticatedRoute from './AuthenticatedRoute';
import YourBooksView from './views/YourBooksView';
import DiscussionView from './views/DiscussionView';
import CreateDiscussionView from './views/CreateDiscussionView';
import Fallback from './views/Fallback';
import LoginView from './views/LoginView';
import Callback from './components/Callback';
import Auth from './modules/Auth';
import './App.css';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      userId: undefined,
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const userProfile = auth.getProfile();
    console.log(userProfile);
    return (
      <div className="App">
        <Router history={history} component={App}>
          <Switch>
            <Route path="/login" render={(props) => <LoginView handleLogin={this.login} auth={auth} {...props}/>} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <AuthenticatedRoute exact path="/"  auth={auth} user={userProfile} pathName="home" component={YourBooksView}/>
            <AuthenticatedRoute exact path="/book/:id" auth={auth} user={userProfile} pathName="discussionView" component={DiscussionView}/>
            <AuthenticatedRoute exact path="/book/:id/discussion/:id" auth={auth} user={userProfile} pathName="createDiscu" component={CreateDiscussionView} />
            <AuthenticatedRoute exact path="*" user={userProfile} pathName="404" auth={auth} component={Fallback}/>
          </Switch>
        </Router>
        <Alert />
      </div>
    );
  }
}

export default App;
