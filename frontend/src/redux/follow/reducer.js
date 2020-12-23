import * as actions from "../actionTypes";

const initialState = {
  followers: null,
  followersLoading: false,
  following: null,
  followingLoading: false,
};

const getFollowersStartReducer = (state, action) => {
  return {
    ...state,
    followersLoading: true,
  };
};

const getFollowersSuccessReducer = (state, action) => {
  return {
    ...state,
    followers: action.payload,
    followersLoading: false,
  };
};

const getFollowingStartReducer = (state, action) => {
  return {
    ...state,
    followingLoading: true,
  };
};

const getFollowingSuccessReducer = (state, action) => {
  return {
    ...state,
    following: action.payload,
    followingLoading: false,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_FOLLOWERS_START:
      return getFollowersStartReducer(state, action);
    case actions.GET_FOLLOWERS_SUCCESS:
      return getFollowersSuccessReducer(state, action);
    case actions.GET_FOLLOWING_START:
      return getFollowingStartReducer(state, action);
    case actions.GET_FOLLOWING_SUCCESS:
      return getFollowingSuccessReducer(state, action);
    default:
      return state;
  }
}
