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
            response.data.accessToken,
            response.data.id
          )
        );
      })
      .catch((e) => {
        const errorMessage = e.response.data.error;
        dispatch(actions.authSignupFailAction(errorMessage));
      });
  };
};

export const validateCode = (body) => {
  return (dispatch) => {
    dispatch(actions.authCodeValidationStartAction());
    api({ sendToken: true })
      .post("/validate", body)
      .then((response) => {
        dispatch(
          actions.authCodeValidationSuccessAction(
            "Email validation successful!",
            response.data.accessToken
          )
        );
      })
      .catch((e) => {
        const errorMessage = e.response.data.error;
        dispatch(actions.authCodeValidationFailAction(errorMessage));
      });
  };
};

export const infoUpdate = (body) => {
  return (dispatch) => {
    dispatch(actions.authInfoUpdateStartAction());
    api({ sendToken: true })
      .post("/profile/update", body)
      .then((response) => {
        dispatch(
          actions.authInfoUpdateSuccessAction("Profile updated!", response.data.accessToken)
        );
      })
      .catch((e) => {
        const errorMessage = e.response.data.error;
        dispatch(actions.authInfoUpdateFailAction(errorMessage));
      });
  };
};

export const login = (body) => {
  return (dispatch) => {
    dispatch(actions.authLoginStartAction());
    api()
      .post("/auth/login", body)
      .then((response) => {
        dispatch(actions.authLoginSuccessAction(response.data.accessToken, response.data.id));
      })
      .catch((e) => {
        const errorMessage = e.response.data.message;
        dispatch(actions.authLoginFailAction(errorMessage));
      });
  };
};
