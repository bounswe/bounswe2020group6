import React from "react";

import { Col, Avatar, Button, Row } from "antd";
import {
  Layout,
  Title,
  Summary,
} from "./style";

const userResult = ({ id, img, name, department, university, profileLink, selected, buttonClicked }) => {

  return (  
    <Layout key={id} wrap={false} xs={18} sm={18} md={18} lg={18} onClick={profileLink} style={{cursor:"pointer"}}>
    <Col flex="40px">
      <Avatar size={30}  src={img} style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
    </Col>
    <Col flex="auto" justify="center">
      <Row wrap={false}>
          <Title>
            {name}
          </Title>
      </Row>
      <Row>
        <Summary>
          {university} {department}
        </Summary>
      </Row>
    </Col>
    <Button type="text" onClick={buttonClicked} style={{margin: "auto"}}>
      {selected ? "Remove" : "Add"}
    </Button>
  </Layout>
  );
};

export default userResult;

