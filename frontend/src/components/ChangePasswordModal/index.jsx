import React, { useState } from "react";
import { Form, Input, message, Spin } from "antd";
import { StyledModal, ModalButton, ModalTitle, ModalLabel } from "./style";
import api from "../../axios";

const validatePassword = (rule, value, callback) => {
  var includesSymbol = false;
  var includesAlpha = false;
  var includesNum = false;

  var alphas = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  var nums = "1234567890";

  var i;
  for (i = 0; i < value.length; i++) {
    if (alphas.includes(value[i])) {
      includesAlpha = true;
    } else if (nums.includes(value[i])) {
      includesNum = true;
    } else {
      includesSymbol = true;
    }
  }

  if (value && !(value.length >= 8 && includesAlpha && includesNum && includesSymbol)) {
    callback(
      "Your password should be at least 8 characters long with at least one letter, one number and one symbol."
    );
  } else {
    callback();
  }
};

const ChangePasswordModal = ({ visible, toggleChangePasswordModal }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    api({ sendToken: true })
      .post("/validate/npassword", values)
      .then(() => {
        setLoading(false);
        message.success("Password changed successfully");
        toggleChangePasswordModal();
      })
      .catch((e) => {
        setLoading(false);
        message.error("Error: " + e.response.data);
      });
  };

  return (
    <StyledModal width={400} footer={null} visible={visible} onCancel={toggleChangePasswordModal}>
      <ModalTitle>Change Password</ModalTitle>
      <Spin spinning={loading}>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="oldPassword"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Enter your current password" }]}
            label={<ModalLabel>Old Password</ModalLabel>}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Enter new password" },
              { validator: validatePassword },
            ]}
            label={<ModalLabel>New Password</ModalLabel>}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <ModalButton htmlType="submit">Submit</ModalButton>
          </Form.Item>
        </Form>
      </Spin>
    </StyledModal>
  );
};

export default ChangePasswordModal;
