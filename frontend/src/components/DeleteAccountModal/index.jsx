import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, message, Spin, Popconfirm } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import { StyledModal, ModalButton, ModalTitle, ModalLabel } from "./style";
import { authLogoutAction } from "../../redux/auth/actions";
import api from "../../axios";

const DeleteAccountModal = ({ visible, toggleDeleteAccountModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  // form submit handler, sends delete user request to backend
  const handleSubmit = (values) => {
    setLoading(true);
    api({ sendToken: true })
      .post("/home/delete", values)
      .then(() => {
        setLoading(false);
        message.success("Account deleted successfully");
        toggleDeleteAccountModal();
        dispatch(authLogoutAction());
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
