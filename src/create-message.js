import React, { Component } from 'react';
import { post } from 'axios';
import { API_URL } from './App';

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
        <label className="form-components">The message will self-destroy after opened</label>
        <a className="form-components" href={`/readMessage/${token}`}>Secret link</a>
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
        <label className="form-components">Input your secret message</label>
        <textarea
          className="form-components"
          rows="4"
          cols="50"
          type="text"
          value={this.state.message}
          onChange={(event) => this.handleMessageChange(event.target.value)}
        />
        <input
          className="form-components"
          type="submit" value="Submit"
        />
      </form>
    );
  }
}

export default CreateMessage;
