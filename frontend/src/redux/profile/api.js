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

export const infoUpdate = (body, id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .patch("/profile/update", body)
      .then((response) => {
        dispatch(getProfileInfo(id))
      })
      .catch((e) => {
        console.log(e.response.data)
      }
      )
  }
}
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

export const changePicture = (body, id) => {
  return (dispatch) => {
    dispatch(actions.changePictureStartAction())
    api({ sendToken: true })
      .post("/profile/avatar", body)
      .then((response) => {
        dispatch(getProfileInfoWithoutLoading(id))
      })
      .catch((e) => {
        dispatch(actions.changePictureDoneAction())
        console.log(e.response.data)
      }
      )
    }
  }

export const getProjectsOfUser = (id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .get(`/post/get/${id}/0`)
      .then((response) => {
        dispatch(actions.getProjectsOfUserSuccess(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const getProjectsOfMe = () => {
  const myId = localStorage.getItem("userId")
  return (dispatch) => {
    api({ sendToken: true })
      .get(`/post/get/${myId}/0`)
      .then((response) => {
        dispatch(actions.getProjectsOfMeSuccess(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};