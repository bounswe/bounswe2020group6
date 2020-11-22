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
              Akademise is a social network for academic purposes.
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
