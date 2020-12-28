import * as actions from "../actionTypes";

export const searchLoadingAction = () => {
  return {
    type: actions.SEARCH_LOADING,
  };
};

export const searchAction = () => {
  return {
    type: actions.SEARCH,
  };
};

export const searchCompletedAction = () => {
  return {
    type: actions.SEARCH_COMPLETED,
  };
};



