import * as actions from "../actionTypes";

const initialState = {
  profile: null,
  profileLoading: false,
  pictureLoading: false,
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
    default:
      return state;
  }
}
