import { CheckOutlined, DeleteOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Layout } from "./style";

// component for rendering some specific notifications
const NotificationCard = ({ type, userName, userLink, projectName, projectLink, handleDelete }) => {
  const cardContent = () => {
    // type comes from backend
    switch (type) {
      // rejected collab request notification
      case -1:
        return (
          <p style={{ fontSize: "16px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <CloseOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has rejected collaboration request on your
            project <span onClick={projectLink}>{projectName}</span>.
          </p>
        );
      case 0:
        // accepted collab request notification
        return (
          <p style={{ fontSize: "16px" }}>
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
        // a user joined a project of you notification
        return (
          <p style={{ fontSize: "16px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <CheckOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has joined the project{" "}
            <span onClick={projectLink}>{projectName}</span> .
          </p>
        );
      case 2:
        // you are removed from the project notification
        return (
          <p style={{ fontSize: "16px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <CloseOutlined />
            </i>
            You are removed from the project <span onClick={projectLink}>{projectName}</span> .
          </p>
        );
      case 3:
        // some collab is removed from the project notification
        return (
          <p style={{ fontSize: "16px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <CloseOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has been removed from the project{" "}
            <span onClick={projectLink}>{projectName}</span> .
          </p>
        );
      case 5:
        // some user followed you notification
        return (
          <p style={{ fontSize: "16px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <DeleteOutlined onClick={() => handleDelete()} style={{ color: "crimson" }} />
            </div>
            <i>
              <EyeOutlined />
            </i>
            <span onClick={userLink}>{userName}</span> has started to follow you.
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
