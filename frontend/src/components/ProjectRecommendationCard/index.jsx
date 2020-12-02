import { Row, Col, Tag } from "antd";
import { 
  Layout,
  Title,
  Tags
} from "./style";
import theme from "../../theme";

const ProjectRecommendationCard = ({ name, commoncolabsnum, tags}) => {
  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
      ►
      </Col>
      <Col flex="auto" justify="start">
      <Row wrap={false}>
        <Title>
          {name}
        </Title>
      </Row>
      <Tags>
        { tags !== undefined ? tags.map((t, index) => {
          return <Tag key={index} color={theme.main.colors.first} style={{borderRadius: "8px", height: "16px", fontSize: "10px", lineHeight: "14px"}}>
            {t}
          </Tag>
        }): ":S"}
      </Tags>
      </Col>
    </Layout>
  );
};

export default ProjectRecommendationCard;