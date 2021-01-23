import React, { useState } from "react";
import { Form, Input, message, Spin, Popconfirm } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import { StyledModal, ModalButton, ModalTitle, ModalLabel } from "./style";
import api from "../../axios";

const DeleteAccountModal = ({ visible, toggleDeleteAccountModal }) => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setLoading(true);
    api({ sendToken: true })
      .post("/validate/npassword", values) // TODO: change the backend endpoint accordingly when it is ready
      .then(() => {
        setLoading(false);
        message.success("Account deleted successfully");
        toggleDeleteAccountModal();
      })
      .catch((e) => {
        setLoading(false);
        message.error("Error: " + e.response.data);
      });
  };

  return (
    <StyledModal width={400} footer={null} visible={visible} onCancel={toggleDeleteAccountModal}>
      <ModalTitle>Delete Account</ModalTitle>
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="password"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Enter your current password to delete your account" },
            ]}
            label={<ModalLabel>Password</ModalLabel>}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              placement="bottom"
              title="Are you sure to delete your account?"
              okType="danger"
              icon={<ExclamationOutlined style={{ color: "red", fontSize: "18px" }} />}
              onCancel={toggleDeleteAccountModal}
              okText="Delete"
              onConfirm={() => form.submit()}
            >
              <ModalButton>Delete</ModalButton>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Spin>
    </StyledModal>
  );
};

export default DeleteAccountModal;
