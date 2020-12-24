import { Row, Col, Avatar } from "antd";
import { 
  Layout,
  TopNote,
  Title,
  Info,
  Summary,
  Footer
} from "./style";
import { useHistory } from "react-router-dom";


// https://github.com/bounswe/bounswe2020group6/blob/backend/backend/controllers/followController.js
const UserCard = (props) => {

  const history = useHistory();

  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
      <Avatar size={38}  src={props.img !== null ? props.img : "https://britz.mcmaster.ca/images/nouserimage.gif/image"} style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="start">
      <Row wrap={false}>
        <a onClick={() => history.push("/profile/" + props.id)}>
          <Title>
            {props.name} {props.surname}
          </Title>
        </a>
      </Row>
      </Col>
    </Layout>
  );
};

export default UserCard;
