import * as actions from "../actionTypes";

export const profileInfoAction = () => {
  return {
    type: actions.PROFILE_INFO,
  };
};

export const profileInfoLoadingAction = () => {
  return {
    type: actions.PROFILE_INFO_LOADING,
  };
};

export const profileInfoSuccessAction = () => {
  return {
    type: actions.PROFILE_INFO_SUCCESS,
  };
};