import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Col, Spin } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import { Main, H2, H3 } from "./style";
import moment from "moment";

import api from "../../axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  const [userRecommendationsLoading, setUserRecommendationsLoading] = useState(true);
  const [userRecommendations, setUserRecommendations] = useState([]);
  
  const [myId, setMyId] = useState(null);

  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    api({ sendToken: true })
      .get("/home/posts")
      .then((response) => {
        setFeed(response.data);
        setLoading(false)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setUserRecommendationsLoading(true)
    api({ sendToken: true })
      .get("/home/users")
      .then((response) => {
        setUserRecommendations(response.data.slice(0, 4));
        setUserRecommendationsLoading(false)
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createContentCard = (p) => {
    return (
      <ContentCard
        id={p.id}
        title={p.title}
        summary={p.summary}
        date={p.createdAt}
        userId={p.user.id}
        footer={p.user.name + " " + p.user.surname}
        img={p.user.profile_picture_url}
        status={p.status}
      />
    );
  };

  const getUniqueProjects = (arr) => {
    return [...new Map(arr.map(item => [item.id, item])).values()]
  }

  return (
    <Frame>
      <Main
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 14, offset: 5 }}
      >
        {loading ? (
          <H2>
            Loading... <Spin />
          </H2>
        ) : (
          getUniqueProjects([...feed.byUserTags, ...feed.byFollowings])
            .filter((p) => p.user.id !== parseInt(localStorage.getItem("userId")))
            .sort((p1,p2) => moment(p1.createdAt) < moment(p2.createdAt))
            .map((p) => createContentCard(p))
        )}
        {loading ? "" : <H3 style={{margin: "30px"}}>To see more results, please add more interest tags or follow more users.</H3> }
      </Main>
      <Col
        style={{ position: "fixed", right: "20px" }}
        align="center"
        span={0}
        lg={{ span: 5, offset: 0 }}
        xl={{ span: 4, offset: 1 }}
      >
        <H3>Recommended users</H3>
        { 
          userRecommendationsLoading ? <Spin/> :(
            userRecommendations.length === 0 ? "No recommendations yet..." :
              userRecommendations.map((u,i) => {
                return <PersonRecommendationCard 
                id={u.id}
                name={u.name + " " + u.surname}
                university={u.university}
                department={u.department}/>
              })
          ) 
        }

      </Col>
    </Frame>
  );
};

export default Home;
