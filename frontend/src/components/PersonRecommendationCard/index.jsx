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

const PersonRecommendationCard = ({ id, name, university, department, imgUrl, onFollowed}) => {

  // define dispatch and history hooks
  const dispatch = useDispatch()
  const history = useHistory()

  // handle follow request
  const handleFollow = () => {
    // send a follow request
    dispatch(follow(id, 1))
    // a call-back function for follow event 
    onFollowed()
  }

  return (
    <Layout key={id} wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px" onClick={() => history.push("/profile/" + id)} style={{cursor: "pointer"}}>
      <Avatar 
        size={44}  
        src={!(imgUrl===null || imgUrl===undefined) ? imgUrl : defaultProfilePictureHref} 
        style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} 
      />
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
