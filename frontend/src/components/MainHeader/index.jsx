import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authLogoutAction } from "../../redux/auth/actions";
import Notification from "../Notification/";
import ResponseNotification from "../ResponseNotification/";
import ChangePasswordModal from "../ChangePasswordModal";
import DeleteAccountModal from "../DeleteAccountModal";
import { useHistory } from "react-router-dom";
import { Row, Col, Badge, Divider, Menu } from "antd";
import {
  MenuOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  LockOutlined,
  CloseOutlined,
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
  SettingsModal,
} from "./style";
import logo from "../../assets/ad-logo-b9f5d8.png";
import searchIcon from "../../assets/search-icon.png";
import api from "../../axios";

const SiteHeader = () => {
  // states
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [userId, setUserId] = useState();
  // modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] = useState(false);
  // notification states
  const [notificationData, setNotificationData] = useState([]);
  const [responseNotificationData, setResponseNotificationData] = useState([]);

  // define hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // toggle change password modal
  const toggleChangePasswordModal = () => {
    setIsChangePasswordModalVisible((prev) => !prev);
  };

  // toggle delete account modal
  const toggleDeleteAccountModal = () => {
    setIsDeleteAccountModalVisible((prev) => !prev);
  };

  // get collaboration requests
  useEffect(() => {
    // send a get request for the requests
    api({ sendToken: true })
      .get("/collab/get_requests")
      .then((response) => {
        // set notification data
        setNotificationData(response.data);
      });
  }, []);

  // get notificatiosn
  useEffect(() => {
    // send a get request for the notifications
    api({ sendToken: true })
      .get("/notification/get")
      .then((response) => {
        // set response notification data
        setResponseNotificationData(response.data);
      });
  }, []);

  // set current user's id
  useEffect(() => {
    // get current user's id
    const id = localStorage.getItem("userId");
    // set current user's id
    setUserId(id);
  }, []);

  // handles log out
  const handleLogout = () => {
    // dispatch log out action
    dispatch(authLogoutAction());
    // rediect to the root directory
    history.push("/");
  };

  // renders side bar items
  // (displayed during mobile size)
  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem onClick={() => history.push("/home")}>Home</SideBarItem>
        <SideBarItem onClick={() => history.push(`/profile/${userId}`)}>Profile</SideBarItem>
        <SideBarItem onClick={() => setIsSettingsModalVisible((prev) => !prev)}>
          Settings
        </SideBarItem>
        <SideBarItem onClick={() => showModal()}>Notifications</SideBarItem>
        <SideBarItem onClick={handleLogout}>Logout</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  // redirects to the search page
  const redirectToSearchPage = () => {
    history.push("/search?query=" + searchText );
  };

  const suffix = (
    <img
      src={searchIcon}
      alt="search icon"
      onClick={redirectToSearchPage}
      style={{ height: "15px", width: "15px", cursor: "pointer" }}
    />
  );

  // shows the notification modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // hides the notification modal
  const hideModal = () => {
    setIsModalVisible(false);
  };

  // handle accepting collaboration request
  const acceptRequest = (request_id, project_id, requester_id, requested_id, type) => {
    // set data
    var data = {
      projectId: project_id,
    };

    // handler request type
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

    // add collaborator to the project
    api({ sendToken: true })
      .post("/collab/add_collaborator", data)
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e.response.data.error));
    // delete request from requests
    api({ sendToken: true })
      .delete("/collab/delete_request/" + request_id)
      .then((_) => {
        // get collaboration requests
        api({ sendToken: true })
          .get("/collab/get_requests")
          .then((response) => {
            // set notification data
            setNotificationData(response.data);
          });
      });

    // hide the modal
    setIsModalVisible(false);
  };

  // handle reject request
  const rejectRequest = (requestId, projectId, rejectedId) => {
    // prepare the body
    const body = { requestId, projectId, rejectedId };
    // send a post request for reject 
    api({ sendToken: true }).post("/notification/add_rejection", body);
    // delete the request from requests
    api({ sendToken: true })
      .delete("/collab/delete_request/" + requestId)
      .then((_) => {
        // get requests again
        api({ sendToken: true })
          .get("/collab/get_requests")
          .then((response) => {
            // set notification data
            setNotificationData(response.data);
          });
      });

    setIsModalVisible(false);
  };

  // renders a notification component
  const notificationComponent = (n, k) => {
    if (n.project !== null && n.user !== null){
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
    }
    
  };

  // handles deletion of a notification
  const handleDelete = (id) => {
    // send a delete request to delete a notification
    api({ sendToken: true })
      .delete(`/notification/delete/${id}`)
      .then(() => {
        // get notifications again
        api({ sendToken: true })
          .get("/notification/get")
          .then((response) => {
            // set notification data
            setResponseNotificationData(response.data);
          });
      });
  };

  // creates a component for the response notification
  const responseNotificationComponent = (n, k) => {
    if (n.project !== null && n.accepter !== null){
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
    }
  };

  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "2" }}>
      <ChangePasswordModal
        visible={isChangePasswordModalVisible}
        toggleChangePasswordModal={toggleChangePasswordModal}
      />
      <DeleteAccountModal
        visible={isDeleteAccountModalVisible}
        toggleDeleteAccountModal={toggleDeleteAccountModal}
      />
      <SettingsModal
        mask={false}
        visible={isSettingsModalVisible}
        onCancel={() => setIsSettingsModalVisible(false)}
      >
        <Menu selectable={false} onClick={() => setIsSettingsModalVisible(false)}>
          <Menu.Item icon={<LockOutlined />} onClick={() => toggleChangePasswordModal()}>
            Change Password
          </Menu.Item>
          <Menu.Item icon={<CloseOutlined />} onClick={() => toggleDeleteAccountModal()}>
            Delete Account
          </Menu.Item>
        </Menu>
      </SettingsModal>
      <NotificationModal mask={false} visible={isModalVisible} onCancel={hideModal}>
        {notificationData.filter(n=>(n.project !== null && n.accepter !== null)).length + responseNotificationData.filter(n=>(n.project !== null && n.accepter !== null)).length > 0
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
            <Anchor onClick={() => setIsSettingsModalVisible((prev) => !prev)}>
              <SettingOutlined />
            </Anchor>{" "}
            |{" "}
            <Anchor onClick={() => showModal()}>
              <Badge count={notificationData.filter(n=>(n.project !== null && n.accepter !== null)).length + responseNotificationData.filter(n=>(n.project !== null && n.accepter !== null)).length}>
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
