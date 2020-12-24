import * as actions from "./actions";
import api from "../../axios";

export const getTags = () => {
    return (dispatch) => {
      dispatch(actions.getTagsStartAction());
  
      api({sendToken: true})
      .get("/autoComplete/getTags")
      .then((response) => {
        dispatch(actions.getTagsSuccessAction(response.data.result));
      })
      .catch(() => {
        dispatch(actions.getTagsFailAction());
      })
    };
  };

export const getUniversities = () => {
    return (dispatch) => {
        dispatch(actions.getUniversitiesStartAction());

        api({sendToken: true})
        .get("/autoComplete/getUniversities")
        .then((response) => {
        dispatch(actions.getUniversitiesSuccessAction(response.data.result));
        })
        .catch(() => {
        dispatch(actions.getUniversitiesFailAction());
        })
    };
};

export const getDepartments = () => {
    return (dispatch) => {
        dispatch(actions.getDepartmentsStartAction());

        api({sendToken: true})
        .get("/autoComplete/getDepartments")
        .then((response) => {
        dispatch(actions.getDepartmentsSuccessAction(response.data.result));
        })
        .catch(() => {
        dispatch(actions.getDepartmentsFailAction());
        })
    };
};