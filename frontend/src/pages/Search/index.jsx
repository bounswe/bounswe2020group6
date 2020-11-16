import React from "react";

import { Row, Col } from "antd";
import MainHeader from "../../components/MainHeader";
import ContentCard from "../../components/ContentCard";
import FilterButton from "../../components/FilterButton";
import ProfileSider from "../../components/ProfileSider";
import { 
  Content, 
  Main, 
  H1, 
  H2
} from "./style";

const Search = () => {
  return (
    <Content>
      <MainHeader />
      <Row style={{ height: "100vh"}} align="top" justify="start">
          <ProfileSider/>
          <Main 
          xs={{span: 22, offset: 1}}
          sm={{span: 22, offset: 1}}
          md={{span: 22, offset: 1}}
          lg={{span: 14, offset: 5}}>
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
          style={{marginTop: "175px"}}
          md={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <FilterButton type="all" selected={true}>
              All
            </FilterButton>
            <FilterButton type="paper">
              Papers
            </FilterButton>
            <FilterButton type="project">
              Projects
            </FilterButton>
            <FilterButton type="event">
              Events
            </FilterButton>
            <FilterButton type="people">
              People
            </FilterButton>
            <FilterButton type="advanced">
              Advanced
            </FilterButton>
          </Col>
      </Row>
    </Content>
  );
};

export default Search;

