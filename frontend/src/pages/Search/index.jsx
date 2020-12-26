import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { search } from "../../redux/search/api";

import { Col, Row, Spin } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import FilterButton from "../../components/FilterButton";
import FilterButtonSmall from "../../components/FilterButtonSmall";
import {
  Main, 
  H1, 
  H2
} from "./style";

import defaultProfilePictureHref from "../../assets/asset_hrefs"

const Search = () => {
  const [loadingAllPeople, setLoadingAllPeople] = useState(true);
  const [allPeople, setAllPeople] = useState(null);
  const [loadingUserResults, setLoadingUserResults] = useState(true);
  const [userResults, setUserResults] = useState(null);
  const [loadingProjectResults, setLoadingProjectResults] = useState(true);
  const [projectResults, setProjectResults] = useState(null);
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
    console.log(searchText)
    dispatch(search({query: searchText, type: 0}, setUserResults, setLoadingUserResults))
    dispatch(search({query: searchText, type: 1}, setProjectResults, setLoadingProjectResults))
    // eslint-disable-next-line
  }, [selectedFilter, searchText]);

  const createContentCard = (Id, Title, TopNote, Summary, Footer, ImgUrl) => {
    return (<ContentCard
      key={Id}
      title={Title}
      topnote={TopNote}
      summary={Summary}
      footer={Footer}
      img={ImgUrl ? ImgUrl : defaultProfilePictureHref }
      />)
  }

  const selectType = (filterType) => {
    if (filterType !== selectedFilter){
      setLoadingUserResults(true);
      setLoadingProjectResults(true);
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

  const content = () => {
    var spin = <H2><Spin/></H2>;
    if (loadingAllPeople) return spin;
    switch(selectedFilter){
      case "people":
        if (!loadingUserResults) {
          return userResults.users.length > 0 ?
          <> <H2>User Results</H2> {userResults.users.map((u) => createContentCard(u.id, u.name + " " + u.surname, u.number_of_ups, "", "", u.profile_picture_url))}</>
          : <H2>"No users found."</H2>
        }
        else{
          return spin;
        }
      case "project":
        if (!loadingProjectResults) {
          return projectResults.projects.length > 0 ?
          <><H2>Project Results</H2> {projectResults.projects.map((p) => createContentCard(p.id, p.title, p.deadline, p.abstract, getUserNameById(p.userId), getUserPhotoById(p.userId)))}</> 
          : <H2>"No projects found."</H2>
        }
        else{
          return spin;
        }
      case "all":
        if (!loadingProjectResults && !loadingUserResults) {
          return projectResults.projects.length > 0 || projectResults.projects.length > 0 ?
          <>
            {projectResults.projects.length > 0 ? 
            <><H2>Project Results</H2> {projectResults.projects.map((p) => createContentCard(p.id, p.title, p.deadline, p.abstract, getUserNameById(p.userId), getUserPhotoById(p.userId)))}</>
            :""}
            {userResults.users.length > 0 ? 
            <><H2>User Results</H2> {userResults.users.map((u) => createContentCard(u.id, u.name + " " + u.surname, u.number_of_ups, "", "", u.profile_picture_url))}</>
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

