import api from "../../axios";
import * as actions from "./actions";

export const getProfileInfo = (id) => {
  return (dispatch) => {
    dispatch(actions.getProfileInfoStartAction());
    api({ sendToken: true })
      .get("/profile/" + id)
      .then((response) => {
        dispatch(actions.getProfileInfoSuccessAction(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getProfileInfoWithoutLoading = (id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .get("/profile/" + id)
      .then((response) => {
        dispatch(actions.getProfileInfoSuccessAction(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const changeBio = (id, bioData) => {
  return (dispatch) => {
    api({ sendToken: true })
      .post("/profile/biography", bioData)
      .then((response) => {
        dispatch(getProfileInfoWithoutLoading(id));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getProjectsOfUser = (id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .get(`/post/get/${id}/0`)
      .then((response) => {
        console.log(response.data)
        dispatch(actions.getProjectsOfUserSuccess(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};