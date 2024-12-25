const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const defaultState = {
  authenticated: false,
};

const authReducer = (state = defaultState, action) => {
  // Change code below this line

  const draft = structuredClone(state);

  switch (action.type) {
    case LOGIN:
      draft.authenticated = true;
      break;

    case LOGOUT:
      draft.authenticated = false;
      break;

    default:
      break;
  }

  return draft;

  // Change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN,
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
