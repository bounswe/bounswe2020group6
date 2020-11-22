import React from "react";

import { Rate } from "antd";
import { CaretRightOutlined  } from "@ant-design/icons";
import {
  Layout,
  NameText,
  Title,
  Img
} from "./style";

const ProfileSider = () => {
  return (
    <Layout>
      <Img src="https://britz.mcmaster.ca/images/nouserimage.gif/image" alt="profile photo"/>
      <NameText>Ertuğrul Düldül</NameText>
      <Rate/>
      <div style={{width: "70%", display: "flex", flexDirection: "column"}}>
      <Title>Papers</Title>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 1 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 2 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 3 </span>
      <Title>Projects</Title>
      <span style={{color: "white"}}><CaretRightOutlined /> project 1 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> project 2 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> project 3 </span>
      </div>
    </Layout>
  );
};

export default ProfileSider;
