import { Row } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Layout, NotifButton } from "./style";

const NotificationCard = ({
  type,
  userName,
  userLink,
  projectName,
  projectLink,
  accept,
  reject,
}) => {
  const cardContent = () => {
    switch (type) {
      case 0:
        return (
          <>
            <p style={{ fontSize: "16px" }}>
              <i>
                <TeamOutlined />
              </i>
              <span onClick={userLink}>{userName}</span> has invited you to collaborate on{" "}
              <span onClick={projectLink}>{projectName}</span>.
            </p>
            <Row justify={"end"} align={"middle"}>
              <NotifButton action="accept" onClick={accept} size={"large"}>
                Accept
              </NotifButton>
              <NotifButton action="reject" onClick={reject} size={"large"}>
                Reject
              </NotifButton>
            </Row>
          </>
        );
      case 1:
        return (
          <>
            <p style={{ fontSize: "16px" }}>
              <i>
                <TeamOutlined />
              </i>
              <span onClick={userLink}>{userName}</span> wants to join to the project called{" "}
              <span onClick={projectLink}>{projectName}</span> .
            </p>
            <Row justify={"end"} align={"middle"}>
              <NotifButton onClick={accept} size={"small"}>
                Accept
              </NotifButton>
              <NotifButton onClick={reject} size={"small"}>
                Reject
              </NotifButton>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout wrap={false} xs={18} sm={18} md={18} lg={18}>
      {cardContent()}
    </Layout>
  );
};

export default NotificationCard;
