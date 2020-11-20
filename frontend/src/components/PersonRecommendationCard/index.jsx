import { Row, Col, Avatar, Tag } from "antd";
import { 
  Layout,
  Title,
  Info,
  Tags
} from "./style";
import theme from "../../theme";

const PersonRecommendationCard = ({ name, commoncolabsnum}) => {
  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
      <Avatar size={44}  src="https://britz.mcmaster.ca/images/nouserimage.gif/image" style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="start">
      <Row wrap={false}>
        <Title>
          {name}
        </Title>
      </Row>
    <Info>
      {(commoncolabsnum === 1) ? (commoncolabsnum + " common collaborator") : (commoncolabsnum > 1 ? commoncolabsnum + " common collaborators" : ".")}
    </Info>
      <Tags>
        <Tag color={theme.main.colors.first} style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px"}}>
          +Follow
        </Tag>
      </Tags>
      </Col>
    </Layout>
  );
};

export default PersonRecommendationCard;
