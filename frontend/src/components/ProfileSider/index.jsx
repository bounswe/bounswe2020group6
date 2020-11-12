import React, { useState } from "react";

import theme from "../../theme";
import { Rate, Avatar } from "antd";
import { CaretRightOutlined  } from "@ant-design/icons";
import {
  Layout,
  NameText,
  Title,
  Img
} from "./style";
import logo from '../../assets/ad-logo-b9f5d8.png';
import searchIcon from '../../assets/search-icon.png';

const ProfileSider = () => {
  return (
    <Layout>
      <Img src="https://britz.mcmaster.ca/images/nouserimage.gif/image" alt="profile photo"/>
      <NameText>Ertuğrul Düldül</NameText>
      <Rate/>
      <Title>Papers</Title>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 1 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 2 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> paper 3 </span>
      <Title>Projects</Title>
      <span style={{color: "white"}}><CaretRightOutlined /> project 1 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> project 2 </span>
      <span style={{color: "white"}}><CaretRightOutlined /> project 3 </span>
    </Layout>
  );
};

export default ProfileSider;
