import * as actions from "./actions";
import api from "../../axios";

export const search = (params, setData, setLoading) => {
  return (dispatch) => {
    dispatch(actions.searchAction());
    console.log('search dispatch')

    api({sendToken: true})
    .get("/search?query=" + params.query + "&type=" + params.type, {query: params})
    .then((response) => {
      if(params.type===0){
        if(response.data.nameMatchedResults !== undefined){
          setData({users: response.data.nameMatchedResults})
        } else {
          setData({users: []})
        }
      } else if(params.type===1){
        setData({projects: [...response.data.projects.titleResult, ...response.data.projects.summaryResult]})
      } else if(params.type===2){

      }
      setLoading(false)
      console.log("query:", params.query, "| type:", params.type)
      console.log('search response')
      console.log(response)
    })
    .catch((error) => {
      console.log("query:", params.query, "| type:", params.type)
      console.log("search err")
      console.log(error)
      setLoading(false)
    })
  };
};