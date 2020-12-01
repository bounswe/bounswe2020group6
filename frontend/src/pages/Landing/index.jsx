import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import LandingHeader from "../../components/LandingHeader";
import { footerStyle, CtaButton, Content } from "./style";

const { Footer } = Layout;

const Landing = () => {
  const history = useHistory();

  return (
    <Layout>
      <LandingHeader />
      <Content>
        <Row style={{ height: "100%" }} align="middle">
          <Col xs={{ span: 22, offset: 1 }} sm={12} offset={2}>
            <div
              style={{
                textAlign: "center",
                fontSize: "54px",
                fontFamily: "Philosopher",
                height: "65px",
              }}
            >
              Akademise
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "17px",
                fontFamily: "Philosopher",
                height: "45px",
                color: "gray",
              }}
            >
              academic collaboration made easy
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              Akademise is an academic platform where students and scholars can gather to present
              their ideas and thoughts on various topics. Our objective is to enhance networking
              with fellow students and scholars.
            </p>
            <Row justify="center">
              <CtaButton onClick={() => history.push("/join")}>JOIN</CtaButton>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Landing;
