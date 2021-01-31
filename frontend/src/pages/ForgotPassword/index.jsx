import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col, Form, Input, message } from "antd";
import LandingHeader from "../../components/LandingHeader";
import { Content, FormWrapper, FormTitle, FormLabel, FormButton, footerStyle } from "./style";
import api from "../../axios";

// validator function for password
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

const { Footer } = Layout;

const ForgotPassword = ({ step }) => {
  const history = useHistory();

  const [email, setEmail] = useState(""); // email state for it to be hold for the second step

  const handleResetPassword = (values) => {
    // first step form submit handler
    setEmail(values.email);
    // api request for reseting the password with email reset codd
    api()
      .post("/auth/forgot", values)
      .then(() => {
        message.success("Password reset code is sent to your email");
        history.push("/forgotPassword/code");
      })
      .catch((e) => {
        message.error("Error: " + e.response.data.error);
      });
  };

  const handleValidateResetCode = (values) => {
    // second step form submit handler
    // api request for sending the reset code received by email
    api()
      .post("/auth/code", values)
      .then((resp) => {
        localStorage.setItem("token", resp.data.accessToken);
        message.success("Success!");
        history.push("/forgotPassword/newPassword");
      })
      .catch((e) => {
        message.error("Error: " + e.response.data.error);
      });
  };

  const handleNewPassword = (values) => {
    // third step form submit handler
    // api request for setting a new password
    api({ sendToken: true })
      .post("/validate/fpassword", values)
      .then(() => {
        message.success("Password is reset successfully!");
        history.push("/");
      })
      .catch((e) => {
        message.error("Error: " + e.response.data.error);
      });
  };

  // reset code form
  const resetPassword = (
    <Form onFinish={handleResetPassword} layout="vertical">
      <FormTitle>Reset Password</FormTitle>
      <Form.Item
        label={<FormLabel>Email</FormLabel>}
        name="email"
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <FormButton htmlType="submit">Send</FormButton>
      </Form.Item>
    </Form>
  );

  // validate reset code form
  const validateResetCode = (
    <Form initialValues={{ email: email }} onFinish={handleValidateResetCode} layout="vertical">
      <FormTitle>Enter Code</FormTitle>
      <Form.Item
        label={<FormLabel>Email</FormLabel>}
        name="email"
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={<FormLabel>Reset Code</FormLabel>}
        name="code"
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Please enter your password reset code!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <FormButton htmlType="submit">Send</FormButton>
      </Form.Item>
    </Form>
  );

  // set new password form
  const newPassword = (
    <Form onFinish={handleNewPassword} layout="vertical">
      <FormTitle>New Password</FormTitle>
      <Form.Item
        label={<FormLabel>New Password</FormLabel>}
        name="password"
        style={{ width: "100%" }}
        rules={[
          { required: true, message: "Please enter your new password!" },
          { validator: validatePassword },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <FormButton htmlType="submit">Send</FormButton>
      </Form.Item>
    </Form>
  );

  // array for 3 forms to be rendered with step index
  const forms = [resetPassword, validateResetCode, newPassword];

  return (
    <Layout>
      <LandingHeader />
      <Content>
        <Row style={{ marginTop: "50px" }} justify="center">
          <Col style={{ width: "400px" }}>
            <FormWrapper>{forms[step]}</FormWrapper>
          </Col>
        </Row>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default ForgotPassword;
