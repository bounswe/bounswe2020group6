import * as actions from "./actions";
import api from "../../axios";

export const search = (params, setData, setLoading) => {
  return (dispatch) => {
    dispatch(actions.searchAction());

    api({sendToken: true})
    .get("/search", {params: params})
    .then((response) => {
      setData(response.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log("err")
      setLoading(false)
    })
  };
};