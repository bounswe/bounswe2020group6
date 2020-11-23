import * as actions from "../actionTypes";

// LOGIN
export const authLoginStartAction = () => {
  return {
    type: actions.AUTH_LOGIN_START,
  };
};

export const authLoginSuccessAction = (token, id) => {
  return {
    type: actions.AUTH_LOGIN_SUCCESS,
    token,
    id,
  };
};

export const authLoginFailAction = (message) => {
  return {
    type: actions.AUTH_LOGIN_FAIL,
    message,
  };
};

// LOGOUT
export const authLogoutAction = (message) => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

// SIGNUP
export const authSignupStartAction = () => {
  return {
    type: actions.AUTH_SIGNUP_START,
  };
};

export const authSignupSuccessAction = (message, token) => {
  return {
    type: actions.AUTH_SIGNUP_SUCCESS,
    message,
    token,
  };
};

export const authSignupFailAction = (message) => {
  return {
    type: actions.AUTH_SIGNUP_FAIL,
    message,
  };
};

export const authClearMessagesAction = () => {
  return {
    type: actions.AUTH_CLEAR_MESSAGES,
  };
};
