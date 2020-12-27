import api from "../../axios";
import {message} from "antd"
//import * as actions from "./actions";

export const sendInviteRequest = (myId, otherId, projectId) => {
    const body = {requests: [[myId, otherId, projectId, 0]]}
  return (dispatch) => {
    api({ sendToken: true })
      .post("/collab/add_request", body)
      .then((response) => {
        message.success("Invitation sent successfully!")
      })
      .catch((e) => {
        console.log(e);
      });
  };
};