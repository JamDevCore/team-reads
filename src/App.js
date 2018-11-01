import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import YourBooksView from './views/YourBooksView';
import styled from 'styled-components';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/" component={YourBooksView}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
