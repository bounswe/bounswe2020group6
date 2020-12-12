import * as actions from "../actionTypes";

export const getProfileInfoStartAction = () => {
  return {
    type: actions.GET_PROFILE_INFO_START,
  };
};

export const getProfileInfoSuccessAction = (response) => {
  return {
    type: actions.GET_PROFILE_INFO_SUCCESS,
    payload: response,
  };
};
