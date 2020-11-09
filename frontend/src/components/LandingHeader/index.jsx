import React, { useState } from "react";

import { Row, Col, Form, Input, Checkbox } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  Header,
  Logo,
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

  const sideBar = (
    <SideBar visible={sideBarCollapsed}>
      <SideBarMenu>
        <SideBarItem>Menu</SideBarItem>
        <SideBarItem>Events</SideBarItem>
        <SideBarItem>About Us</SideBarItem>
      </SideBarMenu>
    </SideBar>
  );
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
        <Form layout="vertical">
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
            <LoginButton type="primary" htmlType="submit">
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
          <Nav xs={0} sm={4} md={4} lg={3}>
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
            <Logo>akademise</Logo>
          </Col>
          <Nav xs={0} sm={5} md={4} lg={3}>
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
