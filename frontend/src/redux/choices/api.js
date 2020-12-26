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

export const getTitles = () => {
    return (dispatch) => {
        dispatch(actions.getTitlesStartAction());

        api({sendToken: true})
        .get("/autoComplete/getTitles")
        .then((response) => {
        dispatch(actions.getTitlesSuccessAction(response.data.result));
        })
        .catch(() => {
        dispatch(actions.getTitlesFailAction());
        })
    };
};

export const addTitle = (title) => {
    return (dispatch) => {
        api({sendToken: true})
        .post("/autoComplete/addTitle", {title})
        .then((response) => {
        dispatch(getTitles());
        })
        .catch((e) => {
          console.log(e.response.data)
        })
    };
};

export const addUniversity = (university) => {
    return (dispatch) => {
        api({sendToken: true})
        .post("/autoComplete/addUniversity", {university})
        .then((response) => {
          dispatch(getUniversities());
        })
        .catch((e) => {
          console.log(e.response.data)
        })
    };
};

export const addDepartment = (department) => {
    return (dispatch) => {
        api({sendToken: true})
        .post("/autoComplete/addDepartment", {department})
        .then((response) => {
          dispatch(getDepartments());
        })
        .catch((e) => {
          console.log(e.response.data)
        })
    };
};

export const addTag = (tag) => {
    return (dispatch) => {
        api({sendToken: true})
        .post("/autoComplete/addTag", {tag})
        .then((response) => {
          dispatch(getTags());
        })
        .catch((e) => {
          console.log(e.response.data)
        })
    };
};