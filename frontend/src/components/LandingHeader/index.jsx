import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../redux/auth/api";
import { authClearMessagesAction } from "../../redux/auth/actions";

import { Row, Col, Form, Input, Checkbox, message } from "antd";
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
  const [loginVisible, setLoginVisible] = useState(false);
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector;
  const history = useHistory();

  const loginLoading = selector((state) => state.auth.loginLoading);
  const loginFailMessage = selector((state) => state.auth.loginFailMessage);
  const user = selector((state) => state.auth.user);

  useEffect(() => {
    if (loginFailMessage) {
      message.error(loginFailMessage);
      dispatch(authClearMessagesAction());
    }
    if (user) {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, [loginFailMessage, user]);

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem>Menu</SideBarItem>
        <SideBarItem>Events</SideBarItem>
        <SideBarItem>About Us</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );

  const handleLogin = (values) => {
    dispatch(login(values));
  };

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
        </Form>
      </LoginModal>
      <Header style={{ width: "100%" }}>
        <Row justify="center">
          <SideBarIcon xs={3} sm={0} md={0} onClick={() => setSideBarCollapsed((prev) => !prev)}>
            <MenuOutlined style={{ fontSize: "32px" }} />
          </SideBarIcon>
          <Nav 
            xs={0} sm={4} md={4} lg={3}
            onClick={e => (history.push("/"))}
          >
            Menu
          </Nav>
          <Nav xs={0} sm={5} md={4} lg={3}>
            Events
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
          <Nav 
            xs={0} sm={5} md={4} lg={3}
            onClick={e => (history.push("/about"))}
          >
            About Us
          </Nav>
          <Nav
            xs={{ span: 2, offset: 3 }}
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
