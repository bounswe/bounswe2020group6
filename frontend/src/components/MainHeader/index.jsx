import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  Header,
  Nav,
  SideBarIcon,
  SideBar,
  SideBarMenu,
  SideBarItem,
  Anchor,
  SearchBar,
  LogoText
} from "./style";
import logo from '../../assets/ad-logo-b9f5d8.png';
import searchIcon from '../../assets/search-icon.png';

const SiteHeader = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const history = useHistory();

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem>Home</SideBarItem>
        <SideBarItem>Profile</SideBarItem>
        <SideBarItem>Settings</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  const redirectToSearchPage = () => {
    history.push({ pathname: "/search", search: searchText})
  }

  const suffix = (
    <img src={searchIcon} alt="search icon" onClick={redirectToSearchPage} style={{height: "15px", width: "15px", cursor: "pointer"}} />
  );

  return (
    <div style={{position: "fixed", top: "0", width: "100%", zIndex: "2"}}>
      {sideBar}
      <SideBarIcon sm={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
            <MenuOutlined style={{ fontSize: "32px" }} />
      </SideBarIcon>
      <Header style={{ width: "100%" }}>
        <Row>
          <Col xs={6} sm={5} md={6}>
            <Row>
              <img src={logo} alt="logo" style={{height: "32px",  margin: "auto 10px", marginTop: "16px"}}/>
              <LogoText>
              Akademise
              </LogoText>
            </Row>
          </Col>
          <Col xs={{span:16, offset: 1}} sm={{span:8, offset: 0}} md={{span:6, offset: 1}} align="center" offset={6}>
          <SearchBar
          suffix={suffix}
          size="small"
          onPressEnter={redirectToSearchPage} 
          onChange={(e) => {setSearchText(e.target.value);}}
          />
          </Col>
          <Nav xs={0} sm={{span:10, offset: 1}} md={{span:10, offset: 1}}>
            <Anchor href="#">Home</Anchor> | <Anchor href="">Profile</Anchor> | <Anchor href="#">Settings</Anchor>
          </Nav>
        </Row>  
      </Header>
    </div>
  );
};

export default SiteHeader;
