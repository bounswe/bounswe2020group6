import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFollowers, getFollowing } from "../../redux/follow/api";

import { Col, Spin } from "antd";
import Frame from "../../components/Frame";
import UserCard from "../../components/UserCard";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import { Main, H2, H3 } from "./style";
import { useHistory } from "react-router-dom";

import api from "../../axios";

const capitalize = function (type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const Home = () => {
  const selector = useSelector;

  const loadingFollowers = selector((state) => state.follow.followersLoading);
  const loadingFollowings = selector((state) => state.follow.followingLoading);
  const loadingAllPeople = loadingFollowers || loadingFollowings;

  const followers = selector((state) => state.follow.followers);
  const followings = selector((state) => state.follow.following);

  const dispatch = useDispatch();

  const { type } = useParams();

  const allPeople = type === "followers" ? followers : followings;

  const history = useHistory();

  const [userRecommendationsLoading, setUserRecommendationsLoading] = useState(true);
  const [userRecommendations, setUserRecommendations] = useState([]);
  useEffect(() => {
    setUserRecommendationsLoading(true)
    api({ sendToken: true })
      .get("/home/users")
      .then((response) => {
        console.log("resp", response);
        setUserRecommendations(
          [
            ...response.data.sameDepartment,
            ...response.data.sameUniversity,
            ...response.data.similarInterests,
          ]
          .sort(() => 0.5 - Math.random())
        );
        setUserRecommendationsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setUserRecommendationsLoading(false)
      });
  }, []);

  useEffect(() => {
    if (type === "followers") {
      dispatch(getFollowers());
    } else if (type === "following") {
      dispatch(getFollowing());
    } else {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, []);

  // https://github.com/bounswe/bounswe2020group6/blob/backend/backend/controllers/followController.js
  const createUserCard = (Id, Name, Surname, University, Department, Title, ImgUrl) => {
    return (
      <UserCard
        id={Id}
        name={Name}
        surname={Surname}
        university={University}
        department={Department}
        title={Title}
        img={ImgUrl}
        history={history}
      />
    );
  };

  return (
    <Frame>
      <Main
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 14, offset: 5 }}
      >
        <H2>{capitalize(type)}</H2>
        {loadingAllPeople || !allPeople ? (
          <H2>
            Loading... <Spin />
          </H2>
        ) : (
          allPeople.map((u) =>
            (type === "followers") ?
            createUserCard(
              u.followed.id,
              u.followed.name,
              u.followed.surname,
              u.followed.university, 
              u.followed.department, 
              u.followed.title,
              u.followed.profile_picture_url,
            ) :
            createUserCard(
              u.following.id,
              u.following.name,
              u.following.surname,
              u.following.university, 
              u.following.department, 
              u.following.title,
              u.following.profile_picture_url,
            )
            
          )
        )}
      </Main>
      <Col 
        align="center" md={0} 
        lg={{ span: 5, offset: 0 }} 
        xl={{ span: 4, offset: 1 }}
        style={{ position: "fixed", right: "20px", minWidth: "280px" }}
      >
      <H3>Recommended users</H3>
        { 
          userRecommendationsLoading ? <Spin/> :(
            userRecommendations.length === 0 ? "No recommendations yet..." :
              userRecommendations
              .filter((u) => u.id !== parseInt(localStorage.getItem("userId")))
              .slice(0, 4)
              .map((u,i) => {
                return <PersonRecommendationCard 
                id={u.id}
                name={u.name + " " + u.surname}
                university={u.university}
                department={u.department}
                imgUrl={u.profile_picture_url}
                onFollowed={() => setUserRecommendations(prev => prev.filter((x) => x.id !== u.id))}
                />
              })
          ) 
        }
      </Col>
    </Frame>
  );
};

export default Home;
