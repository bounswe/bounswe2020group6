import * as actions from "../actionTypes";

const initialState = {
  profile: null,
  profileLoading: false,
  projects: [],
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

const getProjectsOfUserSuccessReducer = (state, action) => {
  return {
    ...state,
    projects: action.payload,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_PROFILE_INFO_START:
      return getProfileInfoStartReducer(state, action);
    case actions.GET_PROFILE_INFO_SUCCESS:
      return getProfileInfoSuccessReducer(state, action);
    case actions.GET_PROJECTS_OF_USER_SUCCESS:
      return getProjectsOfUserSuccessReducer(state, action);
    default:
      return state;
  }
}
