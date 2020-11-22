import React, { useState } from "react";

import { Col, Row } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import FilterButton from "../../components/FilterButton";
import FilterButtonSmall from "../../components/FilterButtonSmall";
import {
  Main, 
  H1, 
  H2
} from "./style";

const Search = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <Frame>
      <Main 
          xs={{span: 22, offset: 1}}
          sm={{span: 22, offset: 1}}
          md={{span: 22, offset: 1}}
          lg={{span: 14, offset: 5}}>
            <Col lg={0}>
            <Row align="center">
            <FilterButtonSmall type="all" selected={selectedFilter === "all"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
            <FilterButtonSmall type="paper" selected={selectedFilter === "paper"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
            <FilterButtonSmall type="project" selected={selectedFilter === "project"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
            <FilterButtonSmall type="event" selected={selectedFilter === "event"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
            <FilterButtonSmall type="people" selected={selectedFilter === "people"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
            <FilterButtonSmall type="advanced" selected={selectedFilter === "advanced"} onClick={setSelectedFilter}>
            </FilterButtonSmall>
          </Row>
            </Col>
            <H1>
              Search Results For "blockchain"
            </H1>
            <H2>Papers</H2>
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <H2>Projects</H2>
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <H2>Users</H2>
            <ContentCard
            title="Şener Gülsev"
            topnote="167 followers"
            info="ODTÜ"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            />
          </Main>
          <Col align="center"
          style={{marginTop: "64px"}}
          xs={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <FilterButton type="all" selected={selectedFilter === "all"} onClick={setSelectedFilter}>
              All
            </FilterButton>
            <FilterButton type="paper" selected={selectedFilter === "paper"} onClick={setSelectedFilter}>
              Papers
            </FilterButton>
            <FilterButton type="project" selected={selectedFilter === "project"} onClick={setSelectedFilter}>
              Projects
            </FilterButton>
            <FilterButton type="event" selected={selectedFilter === "event"} onClick={setSelectedFilter}>
              Events
            </FilterButton>
            <FilterButton type="people" selected={selectedFilter === "people"} onClick={setSelectedFilter}>
              People
            </FilterButton>
            <FilterButton type="advanced" selected={selectedFilter === "advanced"} onClick={setSelectedFilter}>
              Advanced
            </FilterButton>
          </Col>
    </Frame>
  );
};

export default Search;

