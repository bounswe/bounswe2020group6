import React, { useState, useEffect } from "react";

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

  function momentComparator(a,b){  
    var dateA = moment(a.createdAt);
    var dateB = moment(b.createdAt);
    return dateA > dateB ? 1 : -1;  
}; 


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
        setUserRecommendations(
          response.data
          .sort(() => 0.5 - Math.random())
        );
        setUserRecommendationsLoading(false)
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

  return (
    <Frame>
      <Main
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 14, offset: 4 }}
        style={{marginTop: "32px"}}
      >
        {loading ? (
          <H2>
            Loading... <Spin />
          </H2>
        ) : (
          
          [...feed.byUserTags, ...feed.byFollowings]
          .filter((p) => p.user.id !== parseInt(localStorage.getItem("userId"))) // not this user's project
          .filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)                  // unique
          .sort(momentComparator)                                                // sorted by date
          .reverse()                                                             // descending
          .map((p) => createContentCard(p))
        )}
        {loading ? "" : <H3 style={{margin: "30px", color: "grey"}}>To see more results, please add more interest tags or follow more users.</H3> }

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
            userRecommendations.length === 1 
              ? 
              "No recommendations yet." 
              :
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
