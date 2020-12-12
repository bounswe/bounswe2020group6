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

//dummy data //TODO: remove
const interestChoicesList = [
  "Humanities",
  "Performing arts",
  "Visual arts",
  "History",
  "Languages and literature",
  "Law",
  "Philosophy",
  "Theology",
  "Social Sciences",
  "Anthropology",
  "Economics",
  "Geography",
  "Political science",
  "Psychology",
  "Sociology",
  "Social Work",
  "Natural Sciences",
  "Biology",
  "Chemistry",
  "Earth science",
  "Space sciences",
  "Physics",
  "Formal Sciences",
  "Computer Science",
  "Mathematics",
  "Applied Sciences",
  "Business",
  "Engineering and technology",
  "Medicine and health",
];

const interestChoices = [];
for (let i = 0; i < interestChoicesList.length; i++) {
  interestChoices.push(<Option key={interestChoicesList[i]}>{interestChoicesList[i]}</Option>);
}

const SignUp = () => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const [signUpForm] = Form.useForm();
  const [validationForm] = Form.useForm();
  const [infoUpdateForm] = Form.useForm();

  const [formStep, setFormStep] = React.useState(0);
  const [password, setPassword] = React.useState();

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
      redirectToPath("/home");
    }
    if (infoUpdateFailMessage) {
      message.error(infoUpdateFailMessage);
    }
    dispatch(authClearMessagesAction());
    // eslint-disable-next-line
  }, [
    signupSuccessMessage,
    signupFailMessage,
    validationSuccessMessage,
    validationFailMessage,
    infoUpdateSuccessMessage,
    infoUpdateFailMessage,
  ]);

  const validatePasswordAndConfirmPassword = (rule, value) => {
    if (value && value !== signUpForm.getFieldValue("password")) {
      return Promise.reject("Passwords don't match!");
    } else {
      return Promise.resolve();
    }
  };

  const signUpSubmit = function (values) {
    dispatch(signUp(values));
  };
  const validateSubmit = function (values) {
    dispatch(validateCode(values));
  };
  const infoSubmit = function (values) {
    dispatch(
      infoUpdate({
        affiliation: {
          university: values.university,
          department: values.department,
          degree: values.degree,
        },
        researchAreas: values.interests,
      })
    );
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
              <Form onFinish={(values) => signUpSubmit(values)} form={signUpForm} layout="vertical">
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
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Surname</FormLabel>}
                      name="surname"
                      style={{ width: "50%" }}
                      rules={[{ required: true, message: "Please enter your last name!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Input.Group>
                  <Form.Item
                    label={<FormLabel>Email</FormLabel>}
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Password</FormLabel>}
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                  >
                    <Input.Password
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Confirm Password</FormLabel>}
                    name="confirm-password"
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      { validator: validatePasswordAndConfirmPassword },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <FormButton loading={signupLoading} type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>

              {/* Step 2 - Verification */}
              <Form
                onFinish={(values) => validateSubmit(values)}
                form={validationForm}
                layout="vertical"
              >
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
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <FormButton loading={validationLoading} type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Form.Item>
                  <Row style={{ height: "70px" }} />
                </Col>
              </Form>

              {/* Step 3 - Interests    */}
              <Form
                onFinish={(values) => infoSubmit(values)}
                form={infoUpdateForm}
                layout="vertical"
              >
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Department</FormLabel>}
                    name="department"
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter your department!" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Degree</FormLabel>}
                    name="degree"
                    style={{ width: "50%" }}
                    rules={[{ required: true, message: "Please enter your degree!" }]}
                  >
                    <Input />
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
                      placeholder="Please select at least one research interest"
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
                    <FormButton loading={infoUpdateLoading} type="primary" htmlType="submit">
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
