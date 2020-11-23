import * as actions from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,

  signupLoading: false,
  signupSuccessMessage: null,
  signupFailMessage: null,

  loginLoading: false,
  loginFailMessage: null,
};

// LOGIN
const authLoginStartReducer = (state, action) => {
  return {
    ...state,
    loginLoading: true,
  };
};

const authLoginSuccessReducer = (state, action) => {
  localStorage.setItem("token", action.token);
  localStorage.setItem("user", action.id);
  return {
    ...state,
    loginLoading: false,
    token: action.token,
    user: action.id,
  };
};

const authLoginFailReducer = (state, action) => {
  return {
    ...state,
    loginFailMessage: action.message,
    loginLoading: false,
  };
};

// LOGOUT
const authLogoutReducer = (state, action) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    ...state,
    token: null,
    user: null,
  };
};

// SIGNUP
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
    loginFailMessage: null,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.AUTH_LOGOUT:
      return authLogoutReducer(state, action);
    case actions.AUTH_LOGIN_START:
      return authLoginStartReducer(state, action);
    case actions.AUTH_LOGIN_SUCCESS:
      return authLoginSuccessReducer(state, action);
    case actions.AUTH_LOGIN_FAIL:
      return authLoginFailReducer(state, action);
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
