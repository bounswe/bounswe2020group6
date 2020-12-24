import * as actions from "../actionTypes";


export const getTagsStartAction = () => {
    return {
      type: actions.GET_TAGS_START,
    };
  };
  export const getTagsSuccessAction = (payload) => {
    return {
      type: actions.GET_TAGS_SUCCESS,
      payload,
    };
  };
  export const getTagsFailAction = () => {
    return {
      type: actions.GET_TAGS_FAIL,
    };
  };
  
  export const getDepartmentsStartAction = () => {
    return {
      type: actions.GET_DEPARTMENTS_START,
    };
  };
  export const getDepartmentsSuccessAction = (payload) => {
    return {
      type: actions.GET_DEPARTMENTS_SUCCESS,
      payload,
    };
  };
  export const getDepartmentsFailAction = () => {
    return {
      type: actions.GET_DEPARTMENTS_FAIL,
    };
  };
  
  export const getUniversitiesStartAction = () => {
    return {
      type: actions.GET_UNIVERSITIES_START,
    };
  };
  export const getUniversitiesSuccessAction = (payload) => {
    return {
      type: actions.GET_UNIVERSITIES_SUCCESS,
      payload,
    };
  };
  export const getUniversitiesFailAction = () => {
    return {
      type: actions.GET_UNIVERSITIES_FAIL,
    };
  };
  