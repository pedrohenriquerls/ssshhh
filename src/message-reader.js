import React, { Component } from 'react';
import { get } from 'axios';
import { API_URL } from './App';

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
      <p className="form-components">This message will self destroy in {countdown} seconds</p>
    );
  }

  render() {
    const { message, countdown } = this.state;
    return (
      <div>
        {this.renderCountDown()}
        <p className="form-components">{message}</p>
      </div>
    );
  }
}

export default MessageReader;
