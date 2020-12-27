import { Row, Col, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import defaultProfilePictureHref from "../../assets/asset_hrefs";

import { Layout, TopNote, Title, Summary, Footer, StHref } from "./style";

const ContentCard = (props) => {
  const history = useHistory();

  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      <Col flex="40px">
        <StHref onClick={(e) => history.push("/profile/" + props.userId)}>
          <Avatar
            size={50}
            src={props.img !== null ? props.img : defaultProfilePictureHref}
            style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", margin: "10px" }}
          />
        </StHref>
      </Col>
      <Col flex="auto" justify="start">
        <Row wrap={false}>
          <StHref onClick={(e) => history.push("/project/details/" + props.id)}>
            <Title>{props.title}</Title>
          </StHref>
          <TopNote style={{ flexGrow: "1", whiteSpace: "nowrap" }}>
            {moment(props.date).fromNow(true)}
          </TopNote>
        </Row>
        <Summary>
          {props.summary === undefined || props.summary === null
            ? ""
            : props.summary.length > 180
            ? props.summary.substring(0, 180) + "..."
            : props.summary}
        </Summary>
        <Footer>{props.footer} </Footer>
      </Col>
    </Layout>
  );
};

export default ContentCard;
