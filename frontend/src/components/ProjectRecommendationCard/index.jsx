import { Row, Col, Avatar, Tag } from "antd";
import { 
  Layout,
  Title,
  Tags
} from "./style";
import theme from "../../theme";

const ProjectRecommendationCard = ({ name, commoncolabsnum}) => {
  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
      <Avatar size={25}  src="https://britz.mcmaster.ca/images/nouserimage.gif/image" style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="start">
      <Row wrap={false}>
        <Title>
          {name}
        </Title>
      </Row>
      <Tags>
      <Tag color={theme.main.colors.first} style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px"}}>
          Deep Learning
        </Tag>
        <Tag color={theme.main.colors.first} style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px"}}>
          Quantum Computing
        </Tag>
        <Tag color={theme.main.colors.first} style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px"}}>
          Blockchain
        </Tag>
      </Tags>
      </Col>
    </Layout>
  );
};

export default ProjectRecommendationCard;