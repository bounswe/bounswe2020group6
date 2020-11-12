import { Row, Col, Avatar } from "antd";
import { 
  Layout,
  TopNote,
  Title,
  Info,
  Summary,
  Footer
} from "./style";

const ContentCard = (props) => {
  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
      <Avatar size={38}  src="https://britz.mcmaster.ca/images/nouserimage.gif/image" style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px"}} />
      </Col>
      <Col flex="auto" justify="start">
      <Row wrap={false}>
        <Title>
          {props.title}
        </Title>
        <TopNote style={{flexGrow: "1"}}>
          {props.topnote}
        </TopNote>
      </Row>
    <Info>
      {props.info}
    </Info>
      <Summary>
        {props.summary}
      </Summary>
      <Footer>
        {props.footer}
      </Footer>
      </Col>
    </Layout>
  );
};

export default ContentCard;
