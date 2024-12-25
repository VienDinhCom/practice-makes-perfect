const defaultState = {
  login: false,
};

const reducer = (state = defaultState, action) => {
  // Change code below this line

  const draft = structuredClone(state);

  switch (action.type) {
    case 'LOGIN':
      draft.login = true;
      break;

    default:
      break;
  }

  return draft;

  // Change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN',
  };
};
