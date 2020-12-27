import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, message } from "antd";
import { StyledModal, ModalButton, ModalTitle } from "./style";
import api from "../../axios";

const GoogleScholarModal = ({ visible, toggleGoogleScholarModal }) => {
  const history = useHistory();
  const exampleLink = "https://scholar.google.com/citations?user=XXXXXXXXXXXX&hl=en";

  const handleSubmit = (values) => {
    api({ sendToken: true })
      .post("/profile/googlescholar", values)
      .then(() => {
        const currentProfileId = localStorage.getItem("userId");
        message.success("Google scholar linked successfully");
        history.push("/profile/" + currentProfileId);
      })
      .catch(() => {
        message.error("Something went wrong linking");
      });
  };
  return (
    <StyledModal footer={null} visible={visible} onCancel={toggleGoogleScholarModal}>
      <ModalTitle>Google Scholar Link</ModalTitle>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="url"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Enter a google scholar link" }]}
        >
          <Input placeholder={exampleLink} />
        </Form.Item>
        <Form.Item>
          <ModalButton htmlType="submit">Add</ModalButton>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default GoogleScholarModal;
