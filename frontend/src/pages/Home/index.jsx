import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../redux/search/api";

import { Col, Spin } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import ProjectRecommendationCard from "../../components/ProjectRecommendationCard";
import {
  Main,
  H2,
  H3
} from "./style";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  const [loadingAllPeople, setLoadingAllPeople] = useState(true);
  const [allPeople, setAllPeople] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(search({query: "", type: 0}, setAllPeople, setLoadingAllPeople))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(search({query: "", type: 1}, setFeed, setLoading))
    // eslint-disable-next-line
  }, []);

  const createContentCard = (p) => {
    return (
      <ContentCard
        id={p.id}
        title={p.title}
        topnote={p.date}
        summary={p.summary}
        date={p.date}
        userId={p.userId}
        footer={getUserNameById(p.userId)}
        img={getUserPhotoById(p.userId)}
      />
    )
  }

  const getUserNameById = (userId) => {
    var userList = allPeople.users
    var user = userList.find(u => u.id === userId)
    return user ? (user.name + " " + user.surname) : null
  }

  const getUserPhotoById = (userId) => {
    var userList = allPeople.users
    var user = userList.find(u => u.id === userId)
    return user ? (user.profile_picture_url) : null
  }
  
  return (
    <Frame>
      <Main 
          xs={{span: 22, offset: 1}}
          sm={{span: 22, offset: 1}}
          md={{span: 22, offset: 1}}
          lg={{span: 14, offset: 5}}>
            {loading || loadingAllPeople ? <H2>Loading... <Spin/></H2>  : feed.projects.reverse().map((p) => createContentCard(p))}
          </Main>
          <Col align="center"
          md={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <H3>Recommended users</H3>
            <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={0} />
            <PersonRecommendationCard name="Ali Velvez" commoncolabsnum={1} />
            <PersonRecommendationCard name="Bahar Gülsonu" commoncolabsnum={2} />
            <H3>Projects you might like</H3>
            <ProjectRecommendationCard name="Research on application of DL on network security." tags={["Deep Learning", "Network"]} />
            <ProjectRecommendationCard name="Quantum face reconition." tags={["Quantum Computing"]} />
            <ProjectRecommendationCard name="Smart contracts at massive blockchain systems" tags={["Blockchain"]} />
          </Col>
    </Frame>
  );
};

export default Home;

