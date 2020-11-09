import React, { useState } from "react";

import { Layout, Row, Col, Form, Input, Checkbox } from "antd";
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
} from "./style";

const { Footer } = Layout;

const Landing = () => {
  const [loginVisible, setLoginVisible] = useState(false);

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
          <Nav span={2}>Menu</Nav>
          <Nav span={2}>Events</Nav>
          <Col span={3}>
            <Logo>akademise</Logo>
          </Col>
          <Nav span={2}>About Us</Nav>
          <Nav onClick={() => setLoginVisible(true)} span={2}>
            Login
          </Nav>
        </Row>
      </Header>
      <div style={{ backgroundImage: "url(cactus.jpeg)", backgroundSize: "cover", height: "80vh" }}>
        <Row style={{ height: "100%" }} align="middle">
          <Col span={12} offset={1}>
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
      </div>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Landing;
