import * as actions from "./actions";
import api from "../../axios";

export const profileInfo = (id, setData, setLoading) => {
  return (dispatch) => {
    api({sendToken: true})
    .get("/profile/" + id)
    .then((response) => {
      setData(response.data)
      setLoading(false)
    })
    .catch((e) => {
      console.log("error")
    });
  };
};