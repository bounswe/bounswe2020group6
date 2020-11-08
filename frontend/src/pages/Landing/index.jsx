import React from "react";

import { Layout, Row, Col } from "antd";
import { Header, Logo, footerStyle } from "./style";

const { Footer } = Layout;

const navStyle = {
  textAlign: "center",
  marginTop: "6px",
  color: "white",
  fontSize: "18px",
  fontWeight: "500",
  fontFamily: "Red Hat Display",
};

const Landing = () => {
  return (
    <Layout>
      <Header style={{ width: "100%" }}>
        <Row justify="center">
          <Col style={navStyle} span={2}>
            Menu
          </Col>
          <Col style={navStyle} span={2}>
            Events
          </Col>
          <Col span={3}>
            <Logo />
          </Col>
          <Col style={navStyle} span={2}>
            About Us
          </Col>
          <Col style={navStyle} span={2}>
            Login
          </Col>
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
              has been the industry's standard dummy text ever since the 1500s. hello
            </p>
          </Col>
        </Row>
      </div>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Landing;
