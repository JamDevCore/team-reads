import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import YourBooksView from './views/YourBooksView';
import DiscussionView from './views/DiscussionView';
import CreateDiscussionView from './views/CreateDiscussionView';
import Fallback from './views/Fallback';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/" render={() => <YourBooksView />}/>
              <Route exact path="/book/:id" render={() => <DiscussionView />}/>
              <Route exact path="/book/:id/discussion/:id" render={() => <CreateDiscussionView />}/>
              <Route exact path="*" render={() => <Fallback />}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
