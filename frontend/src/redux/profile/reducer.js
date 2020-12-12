import * as actions from "../actionTypes";

const initialState = {
  profile: null,
  profileLoading: false,
};

const getProfileInfoStartReducer = (state, action) => {
  return {
    ...state,
    profileLoading: true,
  };
};

const getProfileInfoSuccessReducer = (state, action) => {
  return {
    ...state,
    profile: action.payload,
    profileLoading: false,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_PROFILE_INFO_START:
      return getProfileInfoStartReducer(state, action);
    case actions.GET_PROFILE_INFO_SUCCESS:
      return getProfileInfoSuccessReducer(state, action);
    default:
      return state;
  }
}
