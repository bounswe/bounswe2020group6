import { Row, Col, Avatar } from "antd";
import { 
  Layout,
  Title,
  Info,
} from "./style";
import theme from "../../theme";
import { follow } from "../../redux/follow/api";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultProfilePictureHref from "../../assets/asset_hrefs"
import {
  PlusCircleOutlined,
} from "@ant-design/icons";

const PersonRecommendationCard = ({ id, name, university, department}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleFollow = () => {
    dispatch(follow(id))
  }

  return (
    <Layout key={id} wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px" onClick={() => history.push("/profile/" + id)} style={{cursor: "pointer"}}>
      <Avatar size={44}  src={defaultProfilePictureHref} style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="start">
        <Row wrap={false}>
          <Title>
            <span onClick={() => history.push("/profile/" + id)} style={{cursor: "pointer"}}>{name}</span> &nbsp;
            <PlusCircleOutlined
              style={{cursor: "pointer", color:theme.main.colors.first}}
              onClick={() => handleFollow()} 
            />
          </Title>
        </Row>
        <Info>
          {university}<br/>{department}
        </Info>
      </Col>
    </Layout>
  );
};

export default PersonRecommendationCard;
