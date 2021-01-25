import * as actions from "./actions";
import api from "../../axios";

export const search = (params, setData, setLoading) => {
  return (dispatch) => {
    dispatch(actions.searchAction());

    api({sendToken: true})
    .get("/search?query=" + params.query + "&type=" + params.type + "&tags=" + params.tags, {query: params})
    .then((response) => {
      console.log(params.query, params.type, response)
      if(params.type===0){
        if(response.data.nameMatchedResults !== undefined){
          setData({users: response.data.nameMatchedResults})
        } else {
          setData({users: []})
        }
      } else if(params.type===1){
        if(response.data !== undefined){
          setData({projects: response.data.projects})
        } else {
          setData({projects: []})
        }
        
      } else if(params.type===2){
        setData({events: response.data.events})
      }
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
    })
  };
};