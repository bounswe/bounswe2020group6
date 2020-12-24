import api from "../../axios";
import { getProfileInfoWithoutLoading } from "../../redux/profile/api"
import * as actions from "./actions";

export const getFollowers = () => {
  return (dispatch) => {
    dispatch(actions.getFollowersStartAction());
    api({ sendToken: true })
      .get("/follow/followers/")
      .then((response) => {
        dispatch(actions.getFollowersSuccessAction(response.data.data));
      }) 
  };
};

export const getFollowing = () => {
  return (dispatch) => {
    dispatch(actions.getFollowingStartAction());
    api({ sendToken: true })
      .get("/follow/followings/")
      .then((response) => {
        dispatch(actions.getFollowingSuccessAction(response.data.data));
      })
  };
};

export const follow = (id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .post("/follow/add", {userId: id})
      .then((response) => {
        dispatch(getFollowing());
        dispatch(getProfileInfoWithoutLoading(id))
      })
  };
};

export const unfollow = (id) => {
  return (dispatch) => {
    api({ sendToken: true })
      .post("/follow/remove", {userId: id})
      .then((response) => {
        dispatch(getFollowing());
        dispatch(getProfileInfoWithoutLoading(id))
      })
  };
};
