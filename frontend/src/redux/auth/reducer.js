import * as actions from "../actionTypes";

const initialState = {
  token: null,

  signupLoading: false,
  signupSuccessMessage: null,
  signupFailMessage: null,

  validationLoading: false,
  validationSuccessMessage: null,
  validationFailMessage: null,

  infoUpdateLoading: false,
  infoUpdateSuccessMessage: null,
  infoUpdateFailMessage: null,
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

const authValidationStartReducer = (state, action) => {
  return {
    ...state,
    validationLoading: true,
  };
};

const authValidationSuccessReducer = (state, action) => {
  return {
    ...state,
    validationSuccessMessage: action.message,
    validationLoading: false,
  };
};

const authValidationFailReducer = (state, action) => {
  return {
    ...state,
    validationFailMessage: action.message,
    validationLoading: false,
  };
};

const authInfoUpdateStartReducer = (state, action) => {
  return {
    ...state,
    infoUpdateLoading: true,
  };
};

const authInfoUpdateSuccessReducer = (state, action) => {
  return {
    ...state,
    infoUpdateSuccessMessage: action.message,
    infoUpdateLoading: false,
  };
};

const authInfoUpdateFailReducer = (state, action) => {
  return {
    ...state,
    infoUpdateFailMessage: action.message,
    infoUpdateLoading: false,
  };
};

const authClearMessagesReducer = (state, action) => {
  return {
    ...state,
    signupFailMessage: null,
    signupSuccessMessage: null,
    validationFailMessage: null,
    validationSuccessMessage: null,
    infoUpdateFailMessage: null,
    infoUpdateSuccessMessage: null,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case actions.AUTH_LOGIN:
      return authLoginReducer(state, action);
    
    case actions.AUTH_CLEAR_MESSAGES:
      return authClearMessagesReducer(state, action);

    case actions.AUTH_SIGNUP_START:
      return authSignupStartReducer(state, action);
    case actions.AUTH_SIGNUP_SUCCESS:
      return authSignupSuccessReducer(state, action);
    case actions.AUTH_SIGNUP_FAIL:
      return authSignupFailReducer(state, action);

    case actions.AUTH_VALIDATION_START:
      return authValidationStartReducer(state, action);
    case actions.AUTH_VALIDATION_SUCCESS:
      return authValidationSuccessReducer(state, action);
    case actions.AUTH_VALIDATION_FAIL:
      return authValidationFailReducer(state, action);

    case actions.AUTH_INFOUPDATE_START:
      return authInfoUpdateStartReducer(state, action);
    case actions.AUTH_INFOUPDATE_SUCCESS:
      return authInfoUpdateSuccessReducer(state, action);
    case actions.AUTH_INFOUPDATE_FAIL:
      return authInfoUpdateFailReducer(state, action);


    default:
      return state;
  }
}
