import * as actions from "./actions";
import api from "../../axios";

export const signUp = (body) => {
  return (dispatch) => {
    dispatch(actions.authSignupStartAction());
    api()
      .post("/auth/signup", body)
      .then((response) => {
        dispatch(
          actions.authSignupSuccessAction(
            "Activation code has been sent to your email",
            response.data.accessToken
          )
        );
      })
      .catch((e) => {
        const errorMessage = e.response.data.error;
        dispatch(actions.authSignupFailAction(errorMessage));
      });
  };
};
