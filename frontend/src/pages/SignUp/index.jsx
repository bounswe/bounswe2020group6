import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUp, validateCode, infoUpdate } from "../../redux/auth/api";
import { authClearMessagesAction } from "../../redux/auth/actions";

import LandingHeader from "../../components/LandingHeader";

import { footerStyle, Content } from "./style";

import { Layout, Row, Col, Form, Input, Checkbox, Select, Steps, Divider, message } from "antd";

import { FormWrapper, FormTitle, FormButton, FormLabel } from "./style";

const { Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;

//dummy data
const interestChoicesList = [
  "stuff",
  "physics",
  "maths",
  "engineering",
  "quantizers",
  "quantum computing",
  "computers",
  "computer engineering",
  "computer science",
];

const interestChoices = [];
for (let i = 0; i < interestChoicesList.length; i++) {
  interestChoices.push(<Option key={interestChoicesList[i]}>{interestChoicesList[i]}</Option>);
}

const SignUp = () => {
  const [formStep, setFormStep] = React.useState(0);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const [matchingPassword, setMatchingPassword] = React.useState(false);

  const [validationCode, setValidationCode] = React.useState();

  const [university, setUniversity] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  const [degree, setDegree] = React.useState([]);
  const [interests, setInterests] = React.useState([]);

  const dispatch = useDispatch();
  const selector = useSelector;

  const signupSuccessMessage = selector((state) => state.auth.signupSuccessMessage);
  const signupFailMessage = selector((state) => state.auth.signupFailMessage);
  const signupLoading = selector((state) => state.auth.signupLoading);

  const validationSuccessMessage = selector((state) => state.auth.validationSuccessMessage);
  const validationFailMessage = selector((state) => state.auth.validationFailMessage);
  const validationLoading = selector((state) => state.auth.validationLoading);

  const infoUpdateSuccessMessage = selector((state) => state.auth.infoUpdateSuccessMessage);
  const infoUpdateFailMessage = selector((state) => state.auth.infoUpdateFailMessage);
  const infoUpdateLoading = selector((state) => state.auth.infoUpdateLoading);

  useEffect(() => {
    // signup
    if (signupSuccessMessage) {
      message.success(signupSuccessMessage);
      moveToNextStep();
    }
    if (signupFailMessage) {
      message.error(signupFailMessage);
    }
    // validation
    if (validationSuccessMessage) {
      message.success(validationSuccessMessage);
      moveToNextStep();
    }
    if (validationFailMessage) {
      message.error(validationFailMessage);
    }
    // info update
    if (infoUpdateSuccessMessage) {
      message.success(infoUpdateSuccessMessage);
      //moveToNextStep();
      redirectToPath("/home");
    }
    if (infoUpdateFailMessage) {
      message.error(infoUpdateFailMessage);
    }
    dispatch(authClearMessagesAction());
  }, [
    signupSuccessMessage,
    signupFailMessage,
    validationSuccessMessage,
    validationFailMessage,
    infoUpdateSuccessMessage,
    infoUpdateFailMessage,
  ]);

  useEffect(() => {
    if (password === confirmPassword) {
      setMatchingPassword(true);
    } else {
      setMatchingPassword(false);
    }
  }, [password, confirmPassword]);

  const validatePassword = (rule, value) => {
    if (value !== password) {
      return Promise.reject("Passwords don't match!");
    } else {
      return Promise.resolve();
    }
  };

  // API calls
  const postSignUpRequest = (values) => {
    dispatch(signUp(values));
  };
  const postValidateRequest = (values) => {
    console.log("ho");
    dispatch(validateCode(values));
  };
  const postInfoUpdateRequest = (values) => {
    dispatch(infoUpdate(values));
  };

  // password change handlers
  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = function (e) {
    setConfirmPassword(e.target.value);
  };
  const handleValidationCodeChange = function (e) {
    setValidationCode(e.target.value);
  };
  const handleTagChange = function (value) {
    setInterests(value);
  };

  // TODO: onfinish fonksiyona çevrilicek, values eklenecek
  const signUpSubmit = function (signupValues) {
    const formIsValid = matchingPassword;
    if (formIsValid) {
      postSignUpRequest(signupValues);
    }
  };
  const validateSubmit = function (values) {
    // TODO: post validate code to endpoint
    // according to result, continue and call `onButtonClick`
    console.log(validationCode);
    if (validationCode) {
      console.log("hey");
      postValidateRequest(values);
    }
  };
  const infoSubmit = function (e) {
    if (university && department && degree) {
      postInfoUpdateRequest({
        affiliation: {
          university,
          department,
          degree,
        },
        researchAreas: interests,
      });
    }
  };

  const moveToNextStep = function (e) {
    setFormStep((x) => x + 1);
  };

  const history = useHistory();

  const redirectToPath = (path) => {
    history.push(path);
  };

  return (
    <Layout>
      <LandingHeader />
      <Content>
        <Row style={{ height: "50px" }} />
        <FormWrapper>
          <Row align="middle" justify="center">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 16, offset: 0 }}
              lg={{ span: 9, offset: 0 }}
              align="middle"
              justify="center"
            >
              <Steps current={formStep} onChange={(current) => setFormStep(current)}>
                <Step title="Step 1" description="Signup" />
                <Step title="Step 2" description="Validate your email" />
                <Step title="Step 3" description="Additional information" />
              </Steps>
              <Divider />

              {/* Step 1 - Credentials  */}
              <Form onFinish={signUpSubmit} layout="vertical">
                <Col
                  id="col-step1"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 16, offset: 0 }}
                  lg={{ span: 16, offset: 0 }}
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
                      style={{ width: "50%" }}
                      rules={[{ required: true, message: "Please enter your first name!" }]}
                    >
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Surname</FormLabel>}
                      name="surname"
                      style={{ width: "50%" }}
                      rules={[{ required: true, message: "Please enter your last name!" }]}
                    >
                      <Input value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </Form.Item>
                  </Input.Group>
                  <Form.Item
                    label={<FormLabel>Email</FormLabel>}
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}
                  >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Password</FormLabel>}
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                  >
                    <Input.Password onChange={handlePasswordChange} value={password} />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Confirm Password</FormLabel>}
                    name="confirm-password"
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      { validator: validatePassword },
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
                      //onClick={signUpSubmit}
                    >
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>

              {/* Step 2 - Verification */}
              <Form onFinish={validateSubmit} layout="vertical">
                <Col
                  id="col-step2"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 18, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 1 ? "block" : "none" }}
                >
                  <FormTitle>Verify your e-mail</FormTitle>
                  <br />
                  <Form.Item
                    label={<FormLabel>Enter the verification code sent to your e-mail.</FormLabel>}
                    name="code"
                    rules={[{ required: true, message: "Please enter your verification code!" }]}
                  >
                    <Input.Password value={validationCode} onChange={handleValidationCodeChange} />
                  </Form.Item>
                  <Form.Item>
                    <FormButton
                      loading={validationLoading}
                      type="primary"
                      htmlType="submit"
                      //onClick={validateSubmit}
                    >
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
                    label={<FormLabel>University</FormLabel>}
                    name="university"
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter your university!" }]}
                  >
                    <Input value={university} onChange={(e) => setUniversity(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Department</FormLabel>}
                    name="department"
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter your department!" }]}
                  >
                    <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Degree</FormLabel>}
                    name="degree"
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter your degree!" }]}
                  >
                    <Input value={degree} onChange={(e) => setDegree(e.target.value)} />
                  </Form.Item>
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
                      //defaultValue={["stuff"]}
                      //value={interests}
                      onChange={handleTagChange}
                    >
                      {interestChoices}
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
                    <FormButton
                      loading={infoUpdateLoading}
                      type="primary"
                      htmlType="submit"
                      onClick={infoSubmit}
                    >
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
