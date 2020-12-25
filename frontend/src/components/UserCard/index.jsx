import { Row, Col, Avatar } from "antd";
import { 
  Layout,
  Title,
  Info,
  Summary,
} from "./style";

import defaultProfilePictureHref from "../../assets/asset_hrefs";


// https://github.com/bounswe/bounswe2020group6/blob/backend/backend/controllers/followController.js
const UserCard = (props) => {

  return (
    <Layout key={props.id} wrap={false} xs={18} sm={18} md={18} lg={18} onClick={() => props.history.push("/profile/" + props.id)} style={{cursor:"pointer"}}>
      <Col flex="40px">
        <Avatar size={38}  src={props.img !== null ? props.img : defaultProfilePictureHref} style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="center">
        <Row wrap={false}>
            <Title>
              {props.name} {props.surname}
            </Title>
        </Row>
        <Row>
          <Summary>
            {props.title}
          </Summary>
        </Row>
        <Row wrap={false}>
          <Info>
              {props.university} {props.department} 
          </Info>
        </Row>
      </Col>
    </Layout>
  );
};

export default UserCard;
