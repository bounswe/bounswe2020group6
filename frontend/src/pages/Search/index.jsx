import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { search } from "../../redux/search/api";

import { Col, Row, Spin, List, Space } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import UserCard from "../../components/UserCard";
import FilterButton from "../../components/FilterButton";
import FilterButtonSmall from "../../components/FilterButtonSmall";
import {
  Main, 
  H1, 
  H2
} from "./style";

import { StHref } from "../Events/style";


import {
  CalendarTwoTone,
  TagTwoTone,
  EnvironmentTwoTone,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();

  const [loadingAllPeople, setLoadingAllPeople] = useState(true);
  const [loadingUserResults, setLoadingUserResults] = useState(true);
  const [loadingProjectResults, setLoadingProjectResults] = useState(true);
  const [loadingEventResults, setLoadingEventResults] = useState(true);
  
  const [allPeople, setAllPeople] = useState(null);
  const [userResults, setUserResults] = useState(null);
  const [projectResults, setProjectResults] = useState(null);
  const [eventResults, setEventResults] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const location = useLocation();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(location.search.substring(1));

  useEffect(() => {
    setLoadingUserResults(true);
    setLoadingProjectResults(true);
    setSearchText(location.search.substring(1));
  }, [location]);

  useEffect(() => {
    dispatch(search({query: "", type: 0}, setAllPeople, setLoadingAllPeople))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(search({query: searchText, type: 0}, setUserResults, setLoadingUserResults))
    dispatch(search({query: searchText, type: 1}, setProjectResults, setLoadingProjectResults))
    dispatch(search({query: searchText, type: 2}, setEventResults, setLoadingEventResults))
    // eslint-disable-next-line
  }, [selectedFilter, searchText]);

  const createContentCard = (p) => {
    return (<ContentCard
      id={p.id}
      title={p.title}
      topnote={p.date}
      summary={p.summary}
      userId={p.userId}
      footer={getUserNameById(p.userId)}
      img={getUserPhotoById(p.userId)}
      />)
  }

  const createUserCard = (u) => {
    return (<UserCard
      id={u.id}
      name={u.name}
      surname={u.surname}
      university={u.university}
      department={u.department}
      img={u.profile_picture_url}
      history={history}
      />)
  }

  const selectType = (filterType) => {
    if (filterType !== selectedFilter){
      setLoadingUserResults(true);
      setLoadingProjectResults(true);
      setLoadingEventResults(true);
      setSelectedFilter(filterType);
    }
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

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const content = () => {
    var spin = <H2><Spin/></H2>;
    if (loadingAllPeople) return spin;
    switch(selectedFilter){
      case "people":
        if (!loadingUserResults) {
          return userResults.users.length > 0 ?
          <> <H2>User Results</H2> {userResults.users.map((u) => createUserCard(u))}</>
          : <H2>"No users found."</H2>
        }
        else{
          return spin;
        }
      case "project":
        if (!loadingProjectResults) {
          return projectResults.projects.length > 0 ?
          <><H2>Project Results</H2> {projectResults.projects.map((p) => p.privacy === 1 ? createContentCard(p) : "")}</> 
          : <H2>"No projects found."</H2>
        }
        else{
          return spin;
        }
      case "event":
        if (!loadingEventResults) {
          return eventResults.events.length > 0 ?
          <>
            <H2>Event Results</H2> 
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 4,
              }}
              dataSource={eventResults.events}

              renderItem={(item) => (
                <List.Item
                  key={item.data.title}
                  actions={[
                    <IconText
                      icon={() => <EnvironmentTwoTone twoToneColor="#6B8F71" />}
                      text={item.data.location}
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={() => <CalendarTwoTone twoToneColor="#548d5d" />}
                      text={item.data.date.substring(0, 10)}
                      key="list-vertical-message"
                    />,
                    <IconText
                      icon={() => <TagTwoTone twoToneColor="#548d5d" />}
                      text={item.data.type}
                      key="list-vertical-message"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <StHref href={"/event/details/" + item.data.id}>
                        {item.data.title}
                      </StHref>
                    }
                    description={
                      item.data.body.length < 150
                        ? item.data.body.concat("...")
                        : item.data.body.substring(0, 150).concat("...")
                    }
                  />
                </List.Item>
              )}
            />
          </> 
          : <H2>"No events found."</H2>
        }
        else{
          return spin;
        }
      case "all":
        if (!loadingProjectResults && !loadingUserResults && !loadingEventResults) {
          return projectResults.projects.length > 0 || userResults.users.length > 0 || eventResults.events.length > 0 ?
          <>
            {projectResults.projects.length > 0 ? 
            <><H2>Project Results</H2> {projectResults.projects.map((p) => p.privacy === 1 ? createContentCard(p) : "")}</>
            :""}
            {userResults.users.length > 0 ? 
            <><H2>User Results</H2> {userResults.users.map((u) => createUserCard(u))}</>
            :""}
            {eventResults.events.length > 0 ? 
            <><H2>Event Results</H2> {eventResults.events.map((e) => createUserCard(e))}</>
            :""}
          </>
          :<H2>"No results found."</H2>
        }
        else{
          return spin;
        }
      default:
        return ""
    }

  }

  return (
    <Frame>
      <Main 
          xs={{span: 22, offset: 1}}
          sm={{span: 22, offset: 1}}
          md={{span: 22, offset: 1}}
          lg={{span: 14, offset: 5}}>
            <Col lg={0}>
            <Row align="center">
            <FilterButtonSmall type="all" selected={selectedFilter === "all"} onClick={selectType}>
            </FilterButtonSmall>
            <FilterButtonSmall type="project" selected={selectedFilter === "project"} onClick={selectType}>
            </FilterButtonSmall>
            <FilterButtonSmall type="event" selected={selectedFilter === "event"} onClick={selectType}>
            </FilterButtonSmall>
            <FilterButtonSmall type="people" selected={selectedFilter === "people"} onClick={selectType}>
            </FilterButtonSmall>
            <FilterButtonSmall type="advanced" selected={selectedFilter === "advanced"} onClick={selectType}>
            </FilterButtonSmall>
          </Row>
            </Col>
            <H1>
              {searchText !== "" ? <>Search Results:'{searchText}'</>: <>Results</>}
            </H1>

            {content()}
            
          </Main>
          <Col align="center"
          style={{marginTop: "64px"}}
          xs={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <FilterButton type="all" selected={selectedFilter === "all"} onClick={selectType}>
              All
            </FilterButton>
            <FilterButton type="project" selected={selectedFilter === "project"} onClick={selectType}>
              Projects
            </FilterButton>
            <FilterButton type="event" selected={selectedFilter === "event"} onClick={selectType} style={{display: "none"}}>
              Events
            </FilterButton>
            <FilterButton type="people" selected={selectedFilter === "people"} onClick={selectType}>
              People
            </FilterButton>
            <FilterButton type="advanced" selected={selectedFilter === "advanced"} onClick={selectType}>
              Advanced
            </FilterButton>
          </Col>
    </Frame>
  );
};

export default Search;

