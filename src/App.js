import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import history from './modules/history';
import Navbar from './components/Navbar';
import YourBooksView from './views/YourBooksView';
import DiscussionView from './views/DiscussionView';
import CreateDiscussionView from './views/CreateDiscussionView';
import Fallback from './views/Fallback';
import LoginView from './views/LoginView';
import Auth from './modules/Auth';
import formatId from './modules/format-id';
import './App.css';

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
    const { auth } = this.props;
    if (this.props.auth.isAuthenticated()) {
      const profile = auth.getProfile();
      console.log(formatId(profile.sub));
      this.setState({
        userId: formatId(profile.sub)
      });
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { auth } = this.props;
    const { userId } = this.state;
    const userProfile = auth.getProfile();
    console.log(userProfile);
    return (
      <div className="App">
        {auth.isAuthenticated() ?
          <React.Fragment>
          <Navbar handleLogout={this.logout}/>
          <Switch>
            <Route exact path="/" render={(props) => <YourBooksView userId={formatId(userProfile.sub)} { ...props }/>}/>
            <Route exact path="/book/:id" render={(props) => <DiscussionView userId={userId} { ...props }/> }/>
            <Route exact path="/book/:id/discussion/:id" render={(props) => <CreateDiscussionView userId={userId} { ...props }/> }/>
            <Route exact path="*" render={() => <Fallback />}/>
          </Switch>
        </React.Fragment> :
        <LoginView handleLogin={this.login}/>}
      </div>
    );
  }
}

export default App;
