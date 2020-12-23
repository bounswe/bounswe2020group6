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
  };
};

export const recommendations = (recType, setRecommendations) => {

  var dispatchUrl;
  switch(recType) {
    case 'tag':
      dispatchUrl = "/autoComplete/getTags";
      break;
    case 'uni':
      dispatchUrl = "/autoComplete/getUniversities";
      break;
    case 'dep':
      dispatchUrl = "/autoComplete/getDepartments";
      break;
    default:
      return [];
  }

  return (dispatch) => {
    dispatch(actions.recommendationsAction());
    console.log('x');

    api({sendToken: true})
    .get(dispatchUrl)
    .then((response) => {
      setRecommendations(response.data.result);
      console.log('c');
      console.log(response.data.result);
      dispatch(actions.recommendationsCompletedAction());
    })
  };
};