import React from "react";

import { Row } from "antd";
import MainHeader from "../MainHeader";
import ProfileSider from "../ProfileSider";
import { 
  Content
} from "./style";

const Frame = ({ children }) => {
  return (
    <Content>
      <MainHeader />
      <ProfileSider/>
      <Row align="top" justify="start">
        {children}
      </Row>
    </Content>
  );
};

export default Frame;