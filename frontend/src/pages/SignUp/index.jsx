import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../redux/auth/api";
import { authClearMessagesAction } from "../../redux/auth/actions";

import LandingHeader from "../../components/LandingHeader";

import { footerStyle, Content } from "./style";

import { Layout, Row, Col, Form, Input, Checkbox, Select, Steps, Divider, message } from "antd";

import { FormWrapper, FormTitle, FormButton, FormLabel } from "./style";

const { Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;

//dummy data
const children = [
  "physics",
  "maths",
  "engineering",
  "quantizers",
  "quantum computing",
  "computers",
  "computer engineering",
  "computer science",
];

function handleTagChange(value) {
  console.log(`selected ${value}`);
}

const SignUp = () => {

  const [formStep, setFormStep] = React.useState(0);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const [matchingPassword, setMatchingPassword] = React.useState(false);

  //const [validationCode, setValidationCode] = React.useState();
  //const [affiliation, setAffiliation] = React.useState();
  //const [interests, setInterests] = React.useState([]);

  const dispatch = useDispatch();
  const selector = useSelector;

  const signupSuccessMessage = selector((state) => state.auth.signupSuccessMessage);
  const signupFailMessage = selector((state) => state.auth.signupFailMessage);
  const signupLoading = selector((state) => state.auth.signupLoading);

  useEffect(() => {
    if (signupSuccessMessage) {
      message.success(signupSuccessMessage);
      moveToNextStep();
    }
    if (signupFailMessage) {
      message.error(signupFailMessage);
    }
    dispatch(authClearMessagesAction());
    // eslint-disable-next-line
  }, [signupSuccessMessage, signupFailMessage]);

  useEffect(() => {
    if (password === confirmPassword) {
      setMatchingPassword(true);
    } else {
      setMatchingPassword(false);
    }
  }, [password, confirmPassword]);

  const validatePassword = (rule, value, callback) => {
    if (value !== password) {
      callback("Passwords don't match!");
    } else {
      //callback("deneme");
    }
  };

  const postSignUpRequest = (values) => {
    dispatch(signUp(values));
  };
  const handlePasswordChange = function (e) {
    setPassword( e.target.value );
  };
  const handleConfirmPasswordChange = function (e) {
    setConfirmPassword( e.target.value );
  };

  // TODO: onfinish fonksiyona çevrilicek
  const signUpSubmit = function (e) {
    console.log("go");
    const formIsValid = matchingPassword;
    var values = {
      name,
      surname,
      password,
      email,
    }
    if (formIsValid) {
      postSignUpRequest(values);
    }
  };
  const validateSubmit = function (e) {
    // TODO: post validate code to endpoint
    // according to result, continue and call `onButtonClick`
  };
  const infoSubmit = function (e) {
    // TODO: post info to endpoint
    // redirect to profile / home
  };

  const moveToNextStep = function (e) {
    setFormStep((x) => x + 1);
  };

  return (
    <Layout>
      <LandingHeader />
      <Content>
        <Row style={{ height: "70px" }} />
        <FormWrapper>
          <Row align="middle" justify="center">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 16, offset: 0 }}
              lg={{ span: 9, offset: 0 }}
              align="middle"
              justify="center"
            >
              <Steps current={formStep}>
                <Step title="Step 1" description="Signup" />
                <Step title="Step 2" description="Validate your email" />
                <Step title="Step 3" description="Additional information" />
              </Steps>
              <Divider />

              {/* Step 1 - Credentials  */}
              <Form layout="vertical">
                <Col
                  id="col-step1"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 14, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 0 ? "block" : "none" }}
                >
                  <FormTitle>Sign Up</FormTitle>
                  <br />
                  <Input.Group compact>
                    <Form.Item
                      label={<FormLabel>Name</FormLabel>}
                      name="name"
                      rules={[{ required: true, message: "Please enter your first name!" }]}
                    >
                      <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Surname</FormLabel>}
                      name="surname"
                      rules={[{ required: true, message: "Please enter your last name!" }]}
                    >
                      <Input value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    </Form.Item>
                  </Input.Group>
                  <Form.Item
                    label={<FormLabel>Email</FormLabel>}
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}
                  >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Password</FormLabel>}
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                  >
                    <Input.Password 
                      onChange={handlePasswordChange} 
                      value={password}/>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Confirm Password</FormLabel>}
                    name="confirm-password"
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      { validator: validatePassword }
                    ]}
                  >
                    <Input.Password
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                    />
                  </Form.Item>
                  <Form.Item>
                    <FormButton
                      loading={signupLoading}
                      type="primary"
                      htmlType="submit"
                      onClick={signUpSubmit}
                    >
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>

              {/* Step 2 - Verification */}
              <Form layout="vertical">
                <Col
                  id="col-step2"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 14, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 1 ? "block" : "none" }}
                >
                  <FormTitle>Verify your e-mail</FormTitle>
                  <br />
                  <Form.Item
                    label={<FormLabel>Enter the verification code sent to your e-mail.</FormLabel>}
                    name="verification-code"
                    rules={[{ required: true, message: "Please enter your verification code!" }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <FormButton type="primary" htmlType="submit" onClick={validateSubmit}>
                      Confirm
                    </FormButton>
                  </Form.Item>
                  <Row style={{ height: "70px" }} />
                </Col>
              </Form>

              {/* Step 3 - Interests    */}
              <Form layout="vertical">
                <Col
                  id="col-step3"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 14, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 2 ? "block" : "none" }}
                >
                  <FormTitle>Additional Information</FormTitle>
                  <br />
                  <Form.Item
                    label={<FormLabel>Research area interests</FormLabel>}
                    name="interests"
                    rules={[
                      { required: true, message: "Please select at least one area of interest!" },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      defaultValue={["a10", "c12"]}
                      onChange={handleTagChange}
                    >
                      {children}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="terms-and-contitions"
                    valuePropName="checked"
                    rules={[
                      { required: true, message: "You have to accept the terms and conditions!" },
                    ]}
                  >
                    <Checkbox>I have read & accepted the terms and conditions.</Checkbox>
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <FormButton type="primary" htmlType="submit" onClick={infoSubmit}>
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </FormWrapper>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default SignUp;
