import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { search } from "../../redux/search/api";

import moment from "moment";

import { Col, Row, Spin, List, Space, Select, Form, Input } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import UserCard from "../../components/UserCard";
import FilterButton from "../../components/FilterButton";
import FilterButtonSmall from "../../components/FilterButtonSmall";
import {
  Main, 
  H1, 
  H2,
  H3,
} from "./style";

import { FormButton, FormLabel, FormTitle } from "../EditEvent/style";


import { StHref } from "../Events/style";

import { getTags } from "../../redux/choices/api";

import {
  CalendarTwoTone,
  TagTwoTone,
  EnvironmentTwoTone,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";

const Search = () => {
  // define history hook
  const history = useHistory();

  // loading states
  const [loadingAllPeople, setLoadingAllPeople] = useState(true);
  const [loadingUserResults, setLoadingUserResults] = useState(true);
  const [loadingProjectResults, setLoadingProjectResults] = useState(true);
  const [loadingEventResults, setLoadingEventResults] = useState(true);
  
  // states
  const [allPeople, setAllPeople] = useState(null);
  const [userResults, setUserResults] = useState(null);
  const [projectResults, setProjectResults] = useState(null);
  const [eventResults, setEventResults] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // define location and dispatch hooks
  const location = useLocation();
  const dispatch = useDispatch();

  // search states
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState('');

  // get option from select
  const { Option } = Select;

  // get parameters
  var params = new URLSearchParams(location.search.substring(0))
  
  useEffect(() => {
    // get parameters
    params = new URLSearchParams(location.search.substring(0))

    // set loading
    setLoadingUserResults(true);
    setLoadingProjectResults(true);
    setLoadingEventResults(true);

    // check 
    if(params.has('query')){
      setSearchText(params.get('query'));
    }
    if(params.has('tags')){
      setSelectedFilter('advanced')
      setSearchTags(params.get('tags'));
    }

    if(params.has('tags') && !params.has('query')){

    }
  }, [location]);

  useEffect(() => {
    dispatch(search({query: "", type: 0}, setAllPeople, setLoadingAllPeople))
    // eslint-disable-next-line
  }, []);

  // get resutls 
  useEffect(() => {
      // get results for every type of search
      dispatch(search({query: searchText, type: 0, tags: searchTags}, setUserResults, setLoadingUserResults))
      dispatch(search({query: searchText, type: 1, tags: searchTags}, setProjectResults, setLoadingProjectResults))
      dispatch(search({query: searchText, type: 2, tags: searchTags}, setEventResults, setLoadingEventResults))
    // eslint-disable-next-line
  }, [selectedFilter, searchText, searchTags]);

  // get tags  
  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  },[]);
  // tags that are available

  // define selector
  const selector = useSelector;
  // define tags
  const tags = selector((state) => state.choices.tags);

  // creates a content card
  // by using content card component
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

  // creates a user card by using 
  // user card component
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

  // selects the type of search
  const selectType = (filterType) => {
    if (filterType !== selectedFilter){
      // set loading
      setLoadingUserResults(true);
      setLoadingProjectResults(true);
      setLoadingEventResults(true);
      // set selected
      setSelectedFilter(filterType);
    }
  }

  // get user name of a user by id
  const getUserNameById = (userId) => {
    var userList = allPeople.users
    var user = userList.find(u => u.id === userId)
    return user ? (user.name + " " + user.surname) : null
  }

  // get pp of a user by id
  const getUserPhotoById = (userId) => {
    var userList = allPeople.users
    var user = userList.find(u => u.id === userId)
    return user ? (user.profile_picture_url) : null
  }

  // creates a text with icon
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // lists event results
  const eventResultsList = () => {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 4,
        }}
        dataSource={eventResults.events}

        renderItem={(item) => 
          {
            // if item is a project
            if(item.description !== undefined){
              return ""
            } else {
              return (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={() => <EnvironmentTwoTone twoToneColor="#6B8F71" />}
                      text={item.location}
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={() => <CalendarTwoTone twoToneColor="#548d5d" />}
                      text={moment(item.date).format("DD/MM/YYYY HH:mm")}
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
                      item.body !== undefined && item.body !== null
                      ? item.body.length < 150
                        ? item.body.concat("...")
                        : item.body.substring(0, 150).concat("...")
                      : ""
                    }
                  />
                </List.Item>
              )
            }
          }
        }
      />
    )
  }

  // lists the contents that needs to be displayed
  // according to the filters and loading states
  const content = () => {
    var spin = <H2><Spin/></H2>;
    if (loadingAllPeople) return spin;
    // according to selected filter
    switch(selectedFilter){
      case "people":
        // if user results are loaded
        if (!loadingUserResults) {
          // list user results
          return userResults.users.length > 0 ?
          <> <H2>Users</H2> {userResults.users.map((u) => createUserCard(u))}</>
          : <H3>No users found.</H3>
        }
        else{
          return spin;
        }
      case "project":
        // if project results are loaded
        if (!loadingProjectResults) {
          // list project results
          return projectResults.projects.length > 0 ?
          <><H2>Projects</H2> {projectResults.projects.map((p) => p.privacy ? createContentCard(p) : "")}</> 
          : <H3>No projects found.</H3>
        }
        else{
          return spin;
        }
      case "event":
        // if event results are loaded
        if (!loadingEventResults) {
          // list event results
          return eventResults.events.filter(d => d.requirements === undefined).length > 0 ?
          <>
            <H2>Events</H2> 
            {eventResultsList()}
          </> 
          : <H3>No events found.</H3>
        }
        else{
          return spin;
        }
      case "all":
        // if all results are loaded
        if (!loadingProjectResults && !loadingUserResults && !loadingEventResults) {
          // list all results
          return projectResults.projects.length > 0 || userResults.users.length > 0 || eventResults.events.length > 0 ?
          <>
            {projectResults.projects.length > 0 ? 
            <><H2>Projects</H2> {projectResults.projects.map((p) => p.privacy ? createContentCard(p) : "")}</>
            :""}
            {eventResults.events.length > 0 ? 
            <><H2>Events</H2> {eventResultsList()}</>
            :""}
            {userResults.users.length > 0  && searchTags === '' ? 
            <><H2>Users</H2> {userResults.users.map((u) => createUserCard(u))}</>
            :""}
          </>
          :<H3>No results found.</H3>
        }
        else{
          return spin;
        }
      case "advanced":
        // get search query and the selected tags
        // with following form
        return (
          <>
            <H2>Advanced Project Search</H2>
            <Form
              layout="vertical" 
              initialValues={
                {query: searchText, tags: searchTags.split(',')}
              }
            >
              <Form.Item
                label={<FormLabel>Search Query</FormLabel>}
                name="query"
                rules={[{ required: false, message: "" }]}
              >
                <Input placeholder="Query to be included in project" onChange={(e)=>{setSearchText(e.target.value)}}/>
              </Form.Item>
              <Form.Item
                label={<FormLabel>Choose tags to filter with<br/></FormLabel>}
                name="tags"
                rules={[{ required: false, message: "" }]}
              >
                <Select mode="tags" style={{ width: "100%" }} placeholder="Tags" onChange={(e)=>{setSearchTags(e.join(','))}}>
                  {tags.map((x)=>(<Option key={x}>{x}</Option>))}
                </Select>
              </Form.Item>
            </Form>
            { // list the results that are filtered by the tags
              (!loadingProjectResults) ?
              projectResults.projects.length > 0 ?
              <><H2>Project Results</H2> {projectResults.projects.map((p) => p.privacy ? createContentCard(p) : "")}</> 
              : <H3>No projects found.</H3>
            : spin }
          </>
        )
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
              {searchText !== "" ? <>Search results for '{searchText}'</>: <>All Results</>}
            </H1>
            <H2>
              {searchTags !== "" ? <>Filtered by tags: {searchTags.split(',').map(s => ("'"+s+"'")).join(", ")}</>: <></>}
            </H2>

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

