import api from "../../axios";
import * as actions from "./actions";

export const getProfileInfo = (id) => {
  return (dispatch) => {
    dispatch(actions.getProfileInfoStartAction());
    api({ sendToken: true })
      .get("/profile/" + id)
      .then((response) => {
        //console.log(response.data);
        dispatch(actions.getProfileInfoSuccessAction(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
