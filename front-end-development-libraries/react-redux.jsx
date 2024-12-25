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

