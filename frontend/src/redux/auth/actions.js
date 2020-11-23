import * as actions from "../actionTypes";

export const authLoginAction = (userToken) => {
  return {
    type: actions.AUTH_LOGIN,
    token: userToken,
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
