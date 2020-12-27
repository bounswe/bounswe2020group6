import { Row, Col, Avatar, Tag } from "antd";
import { 
  Layout,
  Title,
  Info,
  Tags
} from "./style";
import theme from "../../theme";
import { follow } from "../../redux/follow/api";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultProfilePictureHref from "../../assets/asset_hrefs"

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
      <Row wrap={false} onClick={() => history.push("/profile/" + id)} style={{cursor: "pointer"}}>
        <Title>
          {name}
        </Title>
      </Row>
    <Info>
      {university} {department}
    </Info>
      <Tags>
        <Tag 
        onClick={() => handleFollow()}
        color={theme.main.colors.first} 
        style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px", cursor: "pointer"}}>
          +Follow
        </Tag>
      </Tags>
      </Col>
    </Layout>
  );
};

export default PersonRecommendationCard;
