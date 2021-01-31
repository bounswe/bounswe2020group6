import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../redux/auth/api";
import { authClearMessagesAction } from "../../redux/auth/actions";

import { Row, Col, Form, Input, Checkbox, message, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  Header,
  Logo,
  LogoDock,
  Nav,
  LoginModal,
  LoginTitle,
  LoginButton,
  LoginLabel,
  SideBarIcon,
  SideBar,
  SideBarMenu,
  SideBarItem,
} from "./style";

const LandingHeader = () => {
  // login modal state
  const [loginVisible, setLoginVisible] = useState(false);
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false); // sidebar state

  const dispatch = useDispatch();
  const selector = useSelector;
  const history = useHistory();

  // login states
  const loginLoading = selector((state) => state.auth.loginLoading);
  const loginFailMessage = selector((state) => state.auth.loginFailMessage);
  const user = selector((state) => state.auth.user);

  useEffect(() => {
    // checks if error message occurs and shows it
    if (loginFailMessage) {
      message.error(loginFailMessage);
      dispatch(authClearMessagesAction());
    }
    // if user logs in redirects to home page
    if (user) {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, [loginFailMessage, user]);

  // responsive left sider on mobile screen
  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem onClick={() => setLoginVisible(true)}>Login</SideBarItem>
        <SideBarItem onClick={() => history.push("/join")}>Signup</SideBarItem>
        <SideBarItem onClick={(e) => history.push("/")}>Home</SideBarItem>
        <SideBarItem onClick={(e) => history.push("/about")}>About Us</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  // login handler, dispatches the redux login action
  const handleLogin = (values) => {
    dispatch(login(values));
  };

  // landing header structure with login modal in it as well
  return (
    <div>
      {sideBar}
      <LoginModal
        width={"350px"}
        visible={loginVisible}
        footer={null}
        onCancel={() => setLoginVisible(false)}
      >
        <LoginTitle>Login</LoginTitle>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            label={<LoginLabel>Email</LoginLabel>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<LoginLabel>Password</LoginLabel>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12 }} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <LoginButton loading={loginLoading} type="primary" htmlType="submit">
              Login
            </LoginButton>
          </Form.Item>
          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <Button onClick={() => history.push("/forgotPassword")} type="link">
              Forgot Password?
            </Button>
          </div>
        </Form>
      </LoginModal>
      <Header style={{ width: "100%" }}>
        <Row justify="center">
          <SideBarIcon xs={1} sm={0} md={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
            <MenuOutlined style={{ fontSize: "32px" }} />
          </SideBarIcon>
          <Nav xs={0} sm={4} md={4} lg={3} onClick={(e) => history.push("/")}>
            Home
          </Nav>
          <Nav xs={0} sm={5} md={4} lg={3} onClick={() => history.push("/join")}>
            Signup
          </Nav>
          <Col
            xs={{ span: 10, offset: 6 }}
            sm={{ span: 6, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 3, offset: 0 }}
          >
            <LogoDock>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Logo src={"ad-logo-1d1e19.png"} />
                    </td>
                  </tr>
                  <tr>
                    <td>akademise</td>
                  </tr>
                </tbody>
              </table>
            </LogoDock>
          </Col>
          <Nav xs={0} sm={5} md={4} lg={3} onClick={(e) => history.push("/about")}>
            About Us
          </Nav>
          <Nav
            xs={{ span: 0, offset: 3 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 3, offset: 0 }}
            onClick={() => setLoginVisible(true)}
          >
            Login
          </Nav>
        </Row>
      </Header>
    </div>
  );
};

export default LandingHeader;
