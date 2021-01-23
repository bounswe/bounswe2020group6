import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Layout } from "./style";

const NotificationCard = ({ type, userName, userLink, projectName, projectLink, handleDelete }) => {
  const cardContent = () => {
    switch (type) {
      case 0:
        return (
          <p style={{ fontSize: "14px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <CheckOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has accepted collaboration request on your
            project <span onClick={projectLink}>{projectName}</span>.
          </p>
        );
      case 1:
        return (
          <p>
            <div style={{ width: "100%" }}>s</div>
            <i>
              <CheckOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has joined the project{" "}
            <span onClick={projectLink}>{projectName}</span> .
          </p>
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
