import { Row, Col, Avatar, Button } from "antd";
import { UserAddOutlined, TeamOutlined } from "@ant-design/icons";
import { 
  Layout,
  NotifButton,
  Title,
  Info,
  Summary,
  Footer
} from "./style";

const NotificationCard = ({type, userName, userLink, projectName, projectLink, userId}) => {

  const cardContent = () => {
    switch(type){
      case "follow":
        return <>
          <p>
            <i><UserAddOutlined/></i><a href={userLink}>{userName}</a> is started to follow you.
          </p>
          <Row justify={"end"} align={"middle"}>
              <NotifButton size={"small"}>Follow Back</NotifButton>
          </Row>
        </>
      case "collaboration":
        return <>
          <p>
            <i><TeamOutlined /></i><a href={userLink}>{userName}</a> is invited you to collaborate on <a href={projectLink}>{projectName}</a>.
          </p>
          <Row justify={"end"} align={"middle"}>
              <NotifButton size={"small"}>Accept</NotifButton>
              <NotifButton size={"small"}>Reject</NotifButton>
          </Row>
        </>
    }
  }

  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      {cardContent()}
    </Layout>
  );
};

export default NotificationCard;
