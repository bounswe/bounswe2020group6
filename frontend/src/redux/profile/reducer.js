import * as actions from "../actionTypes";

const initialState = {
  profile: null,
  profileLoading: false,
  pictureLoading: false,
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
    pictureLoading: false,
  };
};

const changePictureStartReducer = (state, action) => {
  return {
    ...state,
    pictureLoading: true,
  };
};

const changePictureDoneReducer = (state, action) => {
  return {
    ...state,
    pictureLoading: false,
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
    case actions.CHANGE_PICTURE_START:
      return changePictureStartReducer(state, action);
    case actions.CHANGE_PICTURE_DONE:
      return changePictureDoneReducer(state, action);
    case actions.GET_PROJECTS_OF_USER_SUCCESS:
      return getProjectsOfUserSuccessReducer(state, action);
    default:
      return state;
  }
}
