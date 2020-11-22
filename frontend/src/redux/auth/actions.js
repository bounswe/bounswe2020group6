import * as actions from "../actionTypes";

export const authLoginAction = (userToken) => {
  return {
    type: actions.AUTH_LOGIN,
    token: userToken,
  };
};

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
