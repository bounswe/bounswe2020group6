import React, { useState } from "react";

import { Layout, Row, Col, Form, Input, Checkbox, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  Header,
  Logo,
  footerStyle,
  CtaButton,
  Nav,
  LoginModal,
  LoginTitle,
  LoginButton,
  LoginLabel,
  Content,
  SideBar,
} from "./style";

const { Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Landing = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);

  const sideMenu = (
    <Sider collapsible collapsed={sideMenuCollapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <SubMenu key="sub1" title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">Files</Menu.Item>
      </Menu>
    </Sider>
  );

  return (
    <Layout>
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
          <SideBar xs={3} sm={0} md={0} onClick={() => setSideMenuCollapsed((prev) => !prev)}>
            <MenuOutlined style={{ fontSize: "32px" }} />
          </SideBar>
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
      <Content>
        <Row style={{ height: "100%" }} align="middle">
          <Col xs={{ span: 22, offset: 1 }} sm={12} offset={2}>
            <div style={{ textAlign: "center", fontSize: "54px", fontFamily: "Philosopher" }}>
              Akademise
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s.
            </p>
            <Row justify="center">
              <CtaButton>JOIN</CtaButton>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Landing;
