import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Alert from 'simple-react-alert';
import history from './modules/history';
import AuthenticatedRoute from './AuthenticatedRoute';
import BookListViewContainer from './containers/BookListViewContainer';
import BookViewContainer from './containers/BookViewContainer';
import AddBookView from './views/AddBookView';
import DiscussionViewContainer from './containers/DiscussionViewContainer';
import TeamViewContainer from './containers/TeamViewContainer';
import TeamSetup from './views/TeamSetup';
import Fallback from './views/Fallback';
import LoginView from './views/LoginView';
import UserSettings from './views/UserSettings';
import Callback from './components/Callback';
import Auth from './modules/Auth';
import './App.css';

const auth = new Auth();

const login = () => {
  auth.login();
};

const logout = () => {
  auth.logout();
};

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  constructor() {
    super()
}

goTo(route) {
  this.props.history.replace(`/${route}`)
}

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/login" render={props => <LoginView handleLogin={login} auth={auth} {...props} />} />
            <Route
              path="/callback"
              render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
            <AuthenticatedRoute exact path="/add-book" auth={auth} pathName="addBook" component={AddBookView} />
            <AuthenticatedRoute exact path="/" auth={auth} pathName="home" component={BookListViewContainer} />
            <AuthenticatedRoute exact path="/settings" auth={auth} pathName="settings" component={UserSettings} />
            <AuthenticatedRoute exact path="/book/:bookId" auth={auth} pathName="bookView" component={BookViewContainer} />
            <AuthenticatedRoute exact path="/book/:bookId/discussion/:discussionId" auth={auth} pathName="discussionView" component={DiscussionViewContainer} />
            <AuthenticatedRoute exact path="/team-setup" auth={auth} pathName="teamSetup" component={TeamSetup} />
            <AuthenticatedRoute path="/team/:id" auth={auth} pathName="teamView" component={TeamViewContainer} />
            <AuthenticatedRoute exact path="*" pathName="404" auth={auth} component={Fallback} />
          </Switch>
        </Router>
        <Alert />
      </div>
    );
  }
}

export default App;
