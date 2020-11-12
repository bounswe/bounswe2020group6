import React from "react";

import { Row } from "antd";
import MainHeader from "../../components/MainHeader";
import ContentCard from "../../components/ContentCard";
import ProfileSider from "../../components/ProfileSider";
import { Content, Main, H1, H2 } from "./style";

const Search = () => {
  return (
    <Content>
      <MainHeader />
      <Row style={{ height: "100vh"}} align="middle">
          <ProfileSider/>
          <Main xs={0} sm={16} md={15} lg={14} offset={5}>
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
      </Row>
    </Content>
  );
};

export default Search;

