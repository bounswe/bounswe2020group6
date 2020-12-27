import * as actions from "../actionTypes";

const initialState = {
  profile: null,
  profileLoading: false,
  pictureLoading: false,
  projects: [],
  myProjects: [],
  
  scrollToProjects: false,
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

const getProjectsOfMeSuccessReducer = (state, action) => {
  return {
    ...state,
    myProjects: action.payload,
  };
};

const projectsClickedReducer = (state, action) => {
  return {
    ...state,
    scrollToProjects: true,
  };
};

const scrolledToProjectsReducer = (state, action) => {
  return {
    ...state,
    scrollToProjects: false,
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
    case actions.GET_PROJECTS_OF_ME_SUCCESS:
      return getProjectsOfMeSuccessReducer(state, action);
    case actions.PROJECTS_CLICKED:
      return projectsClickedReducer(state, action);
    case actions.SCROLLED_TO_PROJECTS:
      return scrolledToProjectsReducer(state, action);
    default:
      return state;
  }
}
