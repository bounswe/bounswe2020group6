import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authLogoutAction } from "../../redux/auth/actions";
import Notification from "../Notification/";
import ResponseNotification from "../ResponseNotification/";
import { useHistory } from "react-router-dom";
import { Row, Col, Badge } from "antd";
import {
  MenuOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
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
import api from "../../axios";

const SiteHeader = () => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [userId, setUserId] = useState();

  const [notificationData, setNotificationData] = useState([]);
  const [responseNotificationData, setResponseNotificationData] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    api({ sendToken: true })
      .get("/collab/get_requests")
      .then((response) => {
        setNotificationData(response.data);
      });
  }, []);

  useEffect(() => {
    api({ sendToken: true })
      .get("/notification/get")
      .then((response) => {
        setResponseNotificationData(response.data);
      });
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleLogout = () => {
    dispatch(authLogoutAction());
    history.push("/");
  };

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem onClick={() => history.push("/home")}>Home</SideBarItem>
        <SideBarItem onClick={() => history.push(`/profile/${userId}`)}>Profile</SideBarItem>
        <SideBarItem href="#">Settings</SideBarItem>
        <SideBarItem onClick={() => showModal()}>Notifications</SideBarItem>
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

  const acceptRequest = (request_id, project_id, requester_id, requested_id, type) => {
    var data = {
      projectId: project_id,
    };

    if (type === 0) {
      // they wanted me to join their project
      data = {
        ...data,
        userId: requested_id,
      };
    } else if (type === 1) {
      // they wanted to join my project
      data = {
        ...data,
        userId: requester_id,
      };
    }

    api({ sendToken: true })
      .post("/collab/add_collaborator", data)
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e.response.data.error));
    api({ sendToken: true })
      .delete("/collab/delete_request/" + request_id)
      .then((_) => {
        api({ sendToken: true })
          .get("/collab/get_requests")
          .then((response) => {
            setNotificationData(response.data);
          });
      });

    setIsModalVisible(false);
  };

  const rejectRequest = (requestId, projectId, rejectedId) => {
    const body = { requestId, projectId, rejectedId };
    api({ sendToken: true }).post("/notification/add_rejection", body);
    api({ sendToken: true })
      .delete("/collab/delete_request/" + requestId)
      .then((_) => {
        api({ sendToken: true })
          .get("/collab/get_requests")
          .then((response) => {
            setNotificationData(response.data);
          });
      });

    setIsModalVisible(false);
  };

  const notificationComponent = (n, k) => {
    return (
      <Notification
        key={k}
        type={n.requestType}
        userName={n.user.name + " " + n.user.surname}
        userLink={() => {
          history.push({ pathname: "/profile/" + n.requester.id });
        }}
        projectName={n.project.title}
        projectLink={() => {
          history.push({ pathname: "/project/details/" + n.projectId });
        }}
        accept={() => {
          acceptRequest(n.id, n.projectId, n.requesterId, n.requestedId, n.requestType);
        }}
        reject={() => {
          rejectRequest(n.id, n.projectId, n.requesterId);
        }}
      />
    );
  };

  const handleDelete = (id) => {
    api({ sendToken: true })
      .delete(`/notification/delete/${id}`)
      .then(() => {
        api({ sendToken: true })
          .get("/notification/get")
          .then((response) => {
            setResponseNotificationData(response.data);
          });
      });
  };

  const responseNotificationComponent = (n, k) => {
    return (
      <ResponseNotification
        key={k}
        type={n.type}
        userName={n.accepter.name + " " + n.accepter.surname}
        userLink={() => {
          history.push({ pathname: "/profile/" + n.accepterId });
        }}
        projectName={n.project.title}
        projectLink={() => {
          history.push({ pathname: "/project/details/" + n.projectId });
        }}
        handleDelete={() => handleDelete(n.id)}
      />
    );
  };

  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "2" }}>
      <NotificationModal mask={false} visible={isModalVisible} onCancel={hideModal}>
        {notificationData.length + responseNotificationData.length > 0
          ? [
              ...notificationData
                .map((n, i) => {
                  return notificationComponent(n, i);
                })
                .reverse(),
              ...responseNotificationData
                .map((n, i) => {
                  return responseNotificationComponent(n, i);
                })
                .reverse(),
            ]
          : "You have no new notifications"}
      </NotificationModal>
      {sideBar}
      <SideBarIcon sm={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
        <MenuOutlined style={{ fontSize: "32px" }} />
      </SideBarIcon>
      <Header style={{ width: "100%" }}>
        <Row>
          <Col xs={6} sm={5} md={6}>
            <Row style={{ cursor: "pointer" }} onClick={() => history.push("/home")}>
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
            <Anchor onClick={() => history.push("/home")}>
              <HomeOutlined />
            </Anchor>{" "}
            |{" "}
            <Anchor onClick={() => history.push(`/profile/${userId}`)}>
              <UserOutlined />{" "}
            </Anchor>{" "}
            |{" "}
            <Anchor href="#">
              <SettingOutlined />
            </Anchor>{" "}
            |{" "}
            <Anchor onClick={() => showModal()}>
              <Badge count={notificationData.length + responseNotificationData.length}>
                <BellOutlined style={{ fontSize: "20px" }} />
              </Badge>
            </Anchor>{" "}
            |{" "}
            <Anchor onClick={handleLogout}>
              <LogoutOutlined />
            </Anchor>
          </Nav>
        </Row>
      </Header>
    </div>
  );
};

export default SiteHeader;
