import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFollowers, getFollowing } from "../../redux/follow/api";

import { Col, Spin } from "antd";
import Frame from "../../components/Frame";
import UserCard from "../../components/UserCard";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import { Main, H2, H3 } from "./style";
import { useHistory } from "react-router-dom";

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
  const allPeople = followers || followings;

  const dispatch = useDispatch();

  const { type } = useParams();

  const history = useHistory();

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
  const createUserCard = (Id, Name, Surname, /*University, Department, Title, */ ImgUrl) => {
    return (
      <UserCard
        id={Id}
        name={Name}
        surname={Surname}
        /*
        university={University}
        department={Department}
        title={Title}
        */
        img={ImgUrl}
      />
    );
  };

  console.log(allPeople);

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
            createUserCard(
              u.id,
              u.name,
              u.surname,
              /*u.university, u.department, u.title,*/ u.profile_picture_url
            )
          )
        )}
      </Main>
      <Col align="center" md={0} lg={{ span: 5, offset: 0 }} xl={{ span: 4, offset: 1 }}>
        <H3>Recommended users</H3>
        <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={0} />
        <PersonRecommendationCard name="Ali Velvez" commoncolabsnum={1} />
        <PersonRecommendationCard name="Bahar Gülsonu" commoncolabsnum={2} />
      </Col>
    </Frame>
  );
};

export default Home;