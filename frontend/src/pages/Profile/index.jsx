import React from "react";

import { Row, Col, Divider, Tag, List, Avatar } from "antd";
import { PaperClipOutlined, TeamOutlined, FormOutlined, CheckOutlined } from "@ant-design/icons";

import MainHeader from "../../components/MainHeader";
import PrimaryButton from "../../components/PrimaryButton";

import { Image, Content, NumbersCol, Scrollable, SectionTitle, SectionCol } from "./style";

const Profile = () => {
  const tags = [
    "Physics",
    "Engineering",
    "Neuroscience",
    "AI",
    "Quantum Computing",
    "Advanced Robotics",
  ];

  const data = [
    {
      title: "Ant Design Title 1",
      description: "",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <div>
      <MainHeader />
      <Content>
        <Row style={{ marginTop: "90px", padding: "16px" }}>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Image src="https://britz.mcmaster.ca/images/nouserimage.gif/image" />
          </Col>
          <Col sm={10} lg={6} xl={6}>
            <Row style={{ fontSize: "28px", fontWeight: "500" }}>Ali Mert</Row>
            <Row style={{ margin: "10px 0" }} align="middle">
              <img style={{ height: "20px" }} src="cactus.png" alt="cactus" />
              <span style={{ marginLeft: "3px", fontSize: "20px" }}>97</span>
            </Row>
            <Row>
              <div style={{ fontWeight: 500 }}>Boğaziçi University</div>
            </Row>
            <Row>
              <div style={{ fontWeight: 500 }}>Computer Engineering BSc</div>
            </Row>
          </Col>
          <NumbersCol xs={24} sm={24} lg={12} xl={12}>
            <Row style={{ height: "100%" }} align="middle">
              <Col span={24}>
                <Row justify="space-around">
                  <Col>
                    <span style={{ fontWeight: 600 }}>0</span> publications
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 600 }}>0</span> followers
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 600 }}>0</span> following
                  </Col>
                </Row>
                <Row style={{ height: "40px" }} />
                <Row justify="center">
                  <Col xs={10} sm={8} md={6}>
                    <PrimaryButton icon={<CheckOutlined />}>Follow</PrimaryButton>
                  </Col>
                  <Col xs={10} sm={8} md={6} offset={4}>
                    <PrimaryButton icon={<FormOutlined />}>Invite</PrimaryButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </NumbersCol>
        </Row>

        <Divider orientation="left" />
        <Row style={{ padding: "16px", fontWeight: 500 }}>
          <Col md={4}>
            <Row>
              <SectionTitle>Interest Areas</SectionTitle>
              <Col style={{ marginTop: "10px" }}>
                {tags &&
                  tags.map((tag, i) => (
                    <Tag key={i} closable={false}>
                      {tag}
                    </Tag>
                  ))}
              </Col>
            </Row>
          </Col>
          <SectionCol xs={24} sm={24} md={{ span: 9, offset: 1 }}>
            <SectionTitle>Projects</SectionTitle>
            <Scrollable>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<PaperClipOutlined />} />}
                      title={item.title}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Scrollable>
          </SectionCol>
          <SectionCol xs={24} sm={24} md={{ span: 9, offset: 1 }}>
            <SectionTitle>Collaborations</SectionTitle>
            <Scrollable>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ color: "yelow" }}
                          icon={<TeamOutlined twoToneColor="#eb2f96" />}
                        />
                      }
                      title={item.title}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Scrollable>
          </SectionCol>
        </Row>
      </Content>
    </div>
  );
};

export default Profile;
