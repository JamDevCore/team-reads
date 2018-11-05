import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import YourBooksView from './views/YourBooksView';
import DiscussionView from './views/DiscussionView';
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
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
