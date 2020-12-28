import * as actions from "../actionTypes";

export const getFollowersStartAction = () => {
  return {
    type: actions.GET_FOLLOWERS_START,
  };
};

export const getFollowersSuccessAction = (payload) => {
  return {
    type: actions.GET_FOLLOWERS_SUCCESS,
    payload,
  };
};

export const getFollowingStartAction = () => {
  return {
    type: actions.GET_FOLLOWING_START,
  };
};

export const getFollowingSuccessAction = (payload) => {
  return {
    type: actions.GET_FOLLOWING_SUCCESS,
    payload,
  };
};
