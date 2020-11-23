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
export const authSignupSuccessAction = (message, token, userId) => {
  return {
    type: actions.AUTH_SIGNUP_SUCCESS,
    message,
    token,
    userId,
  };
};
export const authSignupFailAction = (message) => {
  return {
    type: actions.AUTH_SIGNUP_FAIL,
    message,
  };
};

// VALIDATION
export const authCodeValidationStartAction = () => {
  return {
    type: actions.AUTH_VALIDATION_START,
  };
};
export const authCodeValidationSuccessAction = (message, token) => {
  return {
    type: actions.AUTH_VALIDATION_SUCCESS,
    message,
    token,
  };
};
export const authCodeValidationFailAction = (message) => {
  return {
    type: actions.AUTH_VALIDATION_FAIL,
    message,
  };
};

// INFO UPDATE
export const authInfoUpdateStartAction = () => {
  return {
    type: actions.AUTH_INFOUPDATE_START,
  };
};
export const authInfoUpdateSuccessAction = (message, token) => {
  return {
    type: actions.AUTH_INFOUPDATE_SUCCESS,
    message,
  };
};
export const authInfoUpdateFailAction = (message) => {
  return {
    type: actions.AUTH_INFOUPDATE_FAIL,
    message,
  };
};

export const authClearMessagesAction = () => {
  return {
    type: actions.AUTH_CLEAR_MESSAGES,
  };
};
