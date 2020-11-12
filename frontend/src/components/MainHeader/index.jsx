import React, { useState } from "react";

import theme from "../../theme";
import { Row, Col, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  Header,
  Nav,
  SideBarIcon,
  SideBar,
  SideBarMenu,
  SideBarItem,
  Anchor,
  SearchBar
} from "./style";
import logo from '../../assets/ad-logo-b9f5d8.png';
import searchIcon from '../../assets/search-icon.png';

const SiteHeader = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem>Home</SideBarItem>
        <SideBarItem>Profile</SideBarItem>
        <SideBarItem>Settings</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  const suffix = (
    <img src={searchIcon} onClick={() => console.log("hello")} style={{height: "15px", width: "15px"}} />
  );

  return (
    <div style={{position: "fixed", top: "0", width: "100%", zIndex: "2"}}>
      {sideBar}
      <Header style={{ width: "100%" }}>
        <Row>
          <SideBarIcon xs={3} sm={0} md={0} lg={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
            <MenuOutlined style={{ fontSize: "32px" }} />
          </SideBarIcon>
          <Col xs={3} sm={2} md={2} lg={3} align="center" justify="center" style={{fontFamily: "Philosopher", fontSize: "20px", color: theme.main.colors.fourth}}>
            <img src={logo} alt="logo" style={{height: "30px",  marginRight: "10px"}}/>
            Akademise
          </Col>
          <Col xs={3} sm={4} md={4} lg={6} align="center" offset={6}>
          <SearchBar
          suffix={suffix}
          size="small"
          />
          </Col>
          <Nav xs={0} sm={11} md={11} lg={9} >
            <Anchor href="#">Home</Anchor> | <Anchor href="">Profile</Anchor> | <Anchor href="#">Settings</Anchor>
          </Nav>
        </Row>  
      </Header>
    </div>
  );
};

export default SiteHeader;
