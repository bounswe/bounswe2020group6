import * as actions from "../actionTypes";

export const getFollowersStartAction = () => {
  return {
    type: actions.GET_FOLLOWERS_START,
  };
};

export const getFollowersSuccessAction = () => {
  return {
    type: actions.GET_FOLLOWERS_SUCCESS,
  };
};

export const getFollowingStartAction = () => {
  return {
    type: actions.GET_FOLLOWING_START,
  };
};

export const getFollowingSuccessAction = () => {
  return {
    type: actions.GET_FOLLOWING_SUCCESS,
  };
};
