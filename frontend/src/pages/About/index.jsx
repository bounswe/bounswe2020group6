import React from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import LandingHeader from "../../components/LandingHeader";
import { footerStyle, CtaButton, Content } from "./style";

const { Footer } = Layout;

const About = () => {
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
              About Us
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
              {/** subtitle */}
            </div>
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              Welcome to Akademise, your number one source for academic collaboration. 
            </p>
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              Founded in 2020 by a team of students taking the Software Engineering course at Bogazici University, Akademise has come a long way. When BOUNSWEgroup6 first started out, their passion for finding a way to connect researchers and academicians drove them to action, and gave them the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the globe, and are thrilled to be a part of the academy.
            </p>
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              We hope you enjoy our product as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to <a href="mailto:akademisehelp@gmail.com" title="akademisehelp@gmail.com">send us an e-mail</a>.
            </p>
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontFamily: "Red Hat Display",
                fontWeight: "500",
              }}
            >
              Sincerely, <br/>
              BOUN Software Engineering Group 6
            </p>


          </Col>
        </Row>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default About;
