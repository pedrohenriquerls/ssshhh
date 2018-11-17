import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { get, post } from 'axios'
import logo from './logo.svg';
import './App.css';

const API_URL = 'https://wt-48cf45041ea67fe5072f21aa825fe023-0.sandbox.auth0-extend.com/ssshhhh';

class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      expireTime: 100
    };
  }

  createMessage(event) {
    event.preventDefault();
    const { message, expireTime } = this.state;
    post(
      `${API_URL}/create-message`,
      { message, expireTime }
    ).then((response) => {
      const token = response.data;
      this.setState({ token });
    });
  }

  handleMessageChange(message) {
    this.setState({ message });
  }

  showMessageLink() {
    const { token } = this.state;
    return (
      <div>
        <a href={`/readMessage/${token}`}>Secret link</a>
      </div>
    )
  }

  render() {
    const { token } = this.state;
    if (token) {
      return this.showMessageLink();
    }
    return (
      <form onSubmit={(event) => this.createMessage(event)}>
        <label>Input your secret message</label>
        <input
          type="text"
          value={this.state.message}
          onChange={(event) => this.handleMessageChange(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class MessageReader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { token } = this.props.match.params;
    get(`${API_URL}/${token}`).then((response) => {
      const { message, countdown } = response.data;
      this.setState({ message, countdown });
    }).catch(() => {
      this.setState({ message: "There's nothing to see here!" });
    });
  }

  renderCountDown() {
    const { countdown } = this.state;
    if (!countdown) { return null; }
    return (
      <p>This message will self destroy in {countdown} seconds</p>
    );
  }

  render() {
    const { message, countdown } = this.state;
    return (
      <div>
        {this.renderCountDown()}
        <p>{message}</p>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
