import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authLogoutAction } from "../../redux/auth/actions";
import Notification from "../Notification/"
import { useHistory } from "react-router-dom";
import { Row, Col, Modal } from "antd";
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
  LogoText,
  NotificationModal,
} from "./style";
import logo from "../../assets/ad-logo-b9f5d8.png";
import searchIcon from "../../assets/search-icon.png";

const SiteHeader = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [userId, setUserId] = useState();

  const notifications = [
    {
      type: "follow",
      userId: 1,
      userName: "Kerim Yücedemir",
      userLink: "#",
    },
    {
      type: "collaboration",
      userId: 1,
      userName: "Kerim Yücedemir",
      userLink: "#",
      projectName: "Erke Dönergeci",
      projectLink: "#"
    },
    {
      type: "collaboration",
      userId: 2,
      userName: "Sümeyye Karbüzen",
      userLink: "#",
      projectName: "Contorium Gerçeği",
      projectLink: "#"
    },
    {
      type: "follow",
      userId: 3,
      userName: "Esma Samyeli",
      userLink: "#",
    },
    {
      type: "collaboration",
      userId: 4,
      userName: "Fikri Bilir",
      userLink: "#",
      projectName: "Bor ile Çalışan Araba",
      projectLink: "#"
    },
  ]

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(authLogoutAction());
    history.push("/");
  };

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem>Home</SideBarItem>
        <SideBarItem>Profile</SideBarItem>
        <SideBarItem>Settings</SideBarItem>
        <SideBarItem onClick={handleLogout}>Logout</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  const redirectToSearchPage = () => {
    history.push({ pathname: "/search", search: searchText });
  };

  const suffix = (
    <img
      src={searchIcon}
      alt="search icon"
      onClick={redirectToSearchPage}
      style={{ height: "15px", width: "15px", cursor: "pointer" }}
    />
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "2" }}>
      <NotificationModal
        visible={isModalVisible}
        onCancel={hideModal}
      >
        {notifications.map((n,i) => {
          return <Notification
          type={n.type}
          userName={n.userName}
          userLink={n.userLink}
          projectName={n.projectName}
          projectLink={n.projectLink}
          />
        })}
      </NotificationModal>
      {sideBar}
      <SideBarIcon sm={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
        <MenuOutlined style={{ fontSize: "32px" }} />
      </SideBarIcon>
      <Header style={{ width: "100%" }}>
        <Row>
          <Col xs={6} sm={5} md={6}>
            <Row>
              <img
                src={logo}
                alt="logo"
                style={{ height: "32px", margin: "auto 10px", marginTop: "16px" }}
              />
              <LogoText>Akademise</LogoText>
            </Row>
          </Col>
          <Col
            xs={{ span: 16, offset: 1 }}
            sm={{ span: 8, offset: 0 }}
            md={{ span: 6, offset: 1 }}
            align="center"
            offset={6}
          >
            <SearchBar
              suffix={suffix}
              size="small"
              onPressEnter={redirectToSearchPage}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </Col>
          <Nav xs={0} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
            <Anchor onClick={() => history.push("/home")}>Home</Anchor> |{" "}
            <Anchor onClick={() => history.push(`/profile/${userId}`)}>Profile</Anchor> |{" "}
            <Anchor href="#">Settings</Anchor> |{" "} 
            <Anchor onClick={() => showModal()}>Notification</Anchor> |{" "} 
            <Anchor onClick={handleLogout}>Logout</Anchor>
          </Nav>
        </Row>
      </Header>
    </div>
  );
};

export default SiteHeader;
