//import * as actions from "./actions";
import api from "../../axios";

export const postPost = (body, history, message) => {
  return (dispatch) => {
    //dispatch(actions.newPostStartAction());

    api({ sendToken: true })
      .post("/post/add", body)
      .then((response) => {
        //dispatch(actions.newPostSuccessAction());
        message.success("Publication successfully posted.", 4);
        history.push("/home");
      })
      .catch((e) => {
        //dispatch(actions.newPostFailAction());
        message.success("Publication posting failed.", 4);
      });
  };
};

