import React from 'react';

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  submitMessage() {
    if (this.state.input.trim()) {
      // Check if input is not empty
      this.setState((prevState) => ({
        messages: [...prevState.messages, prevState.input],
        input: '', // Clear the input after submission
      }));
    }
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input type="text" value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.submitMessage}>Add Message</button>
        <ul>
          {this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayMessages;

const ADD = 'ADD';

function messageReducer(state = [], action) {
  switch (action.type) {
    case ADD:
      return [...state, action.message];

    default:
      return state;
  }
}

function addMessage(message) {
  return { type: ADD, message };
}

const store = Redux.createStore(messageReducer);
