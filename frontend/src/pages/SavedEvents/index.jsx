import React, { useState, useEffect } from "react";

import { Col, Spin } from "antd";
import { List, Avatar, Space } from "antd";
import {
  CalendarTwoTone,
  TagTwoTone,
  EnvironmentTwoTone,
} from "@ant-design/icons";
import Frame from "../../components/Frame";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import { Main, H2, H3, StHref } from "./style";

import api from "../../axios";

const SavedEvents = () => {
  // loading state
  const [loading, setLoading] = useState(true);
  // feed state
  const [feed, setFeed] = useState(null);
  // recommedations loading state
  const [userRecommendationsLoading, setUserRecommendationsLoading] = useState(
    true
  );
  // recommendations state
  const [userRecommendations, setUserRecommendations] = useState([]);

  // get saved events
  useEffect(() => {
    // get current user's id
    const myId = localStorage.getItem("userId")

    // feed is loading
    setLoading(true);
    // send a get request for saved events
    api({ sendToken: true })
      .get("/event/favorites?userId=" + myId)
      .then((response) => {
        // set feed data
        setFeed(response.data);
        // feed is loaded
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // get user recommendations
  useEffect(() => {
    // user recommendations are loading
    setUserRecommendationsLoading(true);
    // send a get request to get recommended users
    api({ sendToken: true })
      .get("/home/users")
      .then((response) => {
        console.log("resp", response);
        // set user recommendations data
        setUserRecommendations(
          [
            ...response.data.sameDepartment,
            ...response.data.sameUniversity,
            ...response.data.similarInterests,
          ].sort(() => 0.5 - Math.random())
        );
        // user recommendations are loaded
        setUserRecommendationsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUserRecommendationsLoading(false);
      });
  }, []);

  // creates a text with icon
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Frame>
      <Main
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 15, offset: 4 }}
        style={{ marginTop: "32px" }}
      >
        {loading ? (
          <H2>
            Loading... <Spin />
          </H2>
        ) : (
          <>
            <H2>Saved Events</H2>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              dataSource={feed.result}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText
                      icon={() => <EnvironmentTwoTone twoToneColor="#6B8F71" />}
                      text={item.location}
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={() => <CalendarTwoTone twoToneColor="#548d5d" />}
                      text={item.date.substring(0, 10)}
                      key="list-vertical-message"
                    />,
                    <IconText
                      icon={() => <TagTwoTone twoToneColor="#548d5d" />}
                      text={item.type}
                      key="list-vertical-message"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <StHref href={"/event/details/" + item.id}>
                        {item.title}
                      </StHref>
                    }
                    description={
                      item.body.length < 150
                        ? item.body.concat("...")
                        : item.body.substring(0, 150).concat("...")
                    }
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </Main>
      <Col
        style={{ position: "fixed", right: "20px", minWidth: "280px" }}
        align="center"
        span={0}
        lg={{ span: 5, offset: 0 }}
        xl={{ span: 4, offset: 1 }}
      >
        <H3>Recommended users</H3>
        {userRecommendationsLoading ? (
          <Spin />
        ) : userRecommendations.length === 1 ? (
          "No recommendations yet."
        ) : (
          userRecommendations
            .filter((u) => u.id !== parseInt(localStorage.getItem("userId")))
            .slice(0, 4)
            .map((u, i) => {
              return (
                <PersonRecommendationCard
                  id={u.id}
                  key={i}
                  name={u.name + " " + u.surname}
                  university={u.university}
                  department={u.department}
                  imgUrl={u.profile_picture_url}
                  onFollowed={() =>
                    setUserRecommendations((prev) =>
                      prev.filter((x) => x.id !== u.id)
                    )
                  }
                />
              );
            })
        )}
      </Col>
    </Frame>
  );
};

export default SavedEvents;
