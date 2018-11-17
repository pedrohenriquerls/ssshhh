import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.png';
import './App.css';
import MessageReader from './message-reader';
import CreateMessage from './create-message';

export const API_URL = 'https://wt-48cf45041ea67fe5072f21aa825fe023-0.sandbox.auth0-extend.com/ssshhhh';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ssshhhh!! It's a secret</h1>
        </header>
        <Router>
          <div className="App-intro">
            <Route exact path="/" component={CreateMessage} />
            <Route path="/readMessage/:token" component={MessageReader} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
