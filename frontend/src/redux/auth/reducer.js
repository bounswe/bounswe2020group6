import * as actions from "../actionTypes";

const initialState = {
  token: null,

  signupLoading: false,
  signupSuccessMessage: null,
  signupFailMessage: null,
};

const authLoginReducer = (state, action) => {
  return {
    ...state,
    token: action.token,
  };
};

const authSignupStartReducer = (state, action) => {
  return {
    ...state,
    signupLoading: true,
  };
};

const authSignupSuccessReducer = (state, action) => {
  localStorage.setItem("token", action.token);
  return {
    ...state,
    signupSuccessMessage: action.message,
    signupLoading: false,
    token: action.token,
  };
};

const authSignupFailReducer = (state, action) => {
  return {
    ...state,
    signupFailMessage: action.message,
    signupLoading: false,
  };
};

const authClearMessagesReducer = (state, action) => {
  return {
    ...state,
    signupFailMessage: null,
    signupSuccessMessage: null,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.AUTH_LOGIN:
      return authLoginReducer(state, action);
    case actions.AUTH_SIGNUP_START:
      return authSignupStartReducer(state, action);
    case actions.AUTH_SIGNUP_SUCCESS:
      return authSignupSuccessReducer(state, action);
    case actions.AUTH_SIGNUP_FAIL:
      return authSignupFailReducer(state, action);
    case actions.AUTH_CLEAR_MESSAGES:
      return authClearMessagesReducer(state, action);
    default:
      return state;
  }
}
