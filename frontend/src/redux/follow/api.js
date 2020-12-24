import api from "../../axios";
import * as actions from "./actions";

export const getFollowers = (setLoadingAllPeople, setAllPeople) => {
  return (dispatch) => {
    dispatch(actions.getFollowersStartAction(setLoadingAllPeople));
    api({ sendToken: true })
      .get("/follow/followers/")
      .then((response) => {
        console.log(response);
        setAllPeople(response.data.data);
        setLoadingAllPeople(false);
        dispatch(actions.getFollowersSuccessAction(response.data));
      })
      .catch((e) => {   
        setAllPeople([]);
        setLoadingAllPeople(false);
        console.log(e);
      });
  };
};

export const getFollowing = (setLoadingAllPeople, setAllPeople) => {
  return (dispatch) => {
    dispatch(actions.getFollowingStartAction(setLoadingAllPeople));
    api({ sendToken: true })
      .get("/follow/followings/")
      .then((response) => {
        console.log(response);
        setAllPeople(response.data.data);
        setLoadingAllPeople(false);
        dispatch(actions.getFollowingSuccessAction(response.data));
      })
      .catch((e) => {   
        setAllPeople([]);
        setLoadingAllPeople(false);
        console.log(e);
      });
  };
};
