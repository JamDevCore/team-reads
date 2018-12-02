import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Alert from 'simple-react-alert';
import history from './modules/history';
import AuthenticatedRoute from './AuthenticatedRoute';
import DashboardViewContainer from './containers/DashboardViewContainer';
import BookViewContainer from './containers/BookViewContainer';
import DiscussionViewContainer from './containers/DiscussionViewContainer';
import TeamView from './views/TeamView';
import TeamSetup from './views/TeamSetup';
import Fallback from './views/Fallback';
import LoginView from './views/LoginView';
import UserSettings from './views/UserSettings';
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
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
    return (
    <Router history={history} component={App}>
      <div className="App">
          <Switch>
            <Route path="/login" render={(props) => <LoginView handleLogin={this.login} auth={auth} {...props}/>} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <AuthenticatedRoute exact path="/" auth={auth} pathName="home" component={DashboardViewContainer}/>
            <AuthenticatedRoute exact path="/settings" auth={auth} pathName="settings" component={UserSettings}/>
            <AuthenticatedRoute exact path="/book/:bookId" auth={auth} pathName="bookView" component={BookViewContainer}/>
            <AuthenticatedRoute exact path="/book/:bookId/discussion/:discussionId" auth={auth} pathName="discussionView" component={DiscussionViewContainer} />
            <AuthenticatedRoute exact path="/team-setup" auth={auth} pathName="teamSetup" component={TeamSetup}/>
            <AuthenticatedRoute path="/team/:id" auth={auth} pathName="teamView" component={TeamView}/>
            <AuthenticatedRoute exact path="*" pathName="404" auth={auth} component={Fallback}/>
          </Switch>

        <Alert />
      </div>
              </Router>
    );
  }
}

export default App;
