import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/auth/actions";

import axios from "axios";

import LandingHeader from "../../components/LandingHeader";

import { 
  footerStyle, 
  Content 
} from "./style";

import { 
  Layout, Row, Col, Form, Input,
  Checkbox, Select, Steps, Divider,
} from "antd";

import {
  FormWrapper, FormTitle,
  FormButton, FormLabel,
} from "./style";

const { Footer } = Layout;
const { Option } = Select;
const { Step   } = Steps;

//dummy data
const children = ["physics", "maths", "engineering", "quantizers", "quantum computing", "computers", "computer engineering", "computer science"];

function handleTagChange(value) {
    console.log(`selected ${value}`);
}

const SignUp = () => {
  const [state, setState] = React.useState({
    //name: "Name",
    //surname: "Surname",
    //email: "E-mail",
    //password: "Password",
    //confirmPassword: "Confirm Password",
  });
  const [formStep, setFormStep] = React.useState(0);
  const [displaySteps, setDisplaySteps] = React.useState([true, false, false]);
  
  //const dispatch  = useDispatch();
  const selector  = useSelector;
  //const authToken = selector((state) => state.auth.token);

  const postSignUpRequest= () => {
    console.log({
      email:    state.email,
      password: state.password,
      name:     state.name,
      surname:  state.surname,
    });
    axios.post('http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/auth/signup', {
      email:    state.email,
      password: state.password,
      name:     state.name,
      surname:  state.surname,
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  };

  const handleEmailChange = function(e) {
      setState({ ...state, email: e.target.value});
  }
  const handlePasswordChange = function(e) {
      setState({ ...state, password: e.target.value});
  }
  const handleConfirmPasswordChange = function(e) {
    setState({ ...state, confirmPassword: e.target.value});
  }
  const handleNameChange = function(e) {
    setState({ ...state, name: e.target.value});
  }
  const handleSurnameChange = function(e) {
    setState({ ...state, surname: e.target.value});
  }

  const signUpSubmit = function(e) {
    console.log("go");
    if (state.password === state.confirmPassword 
      && state.password !== "" && state.password) {
      console.log("check");
      postSignUpRequest();
      console.log("postsur");
      onButtonClick();
      console.log("next");
    } else {
      alert("Passwords don't match!");
    }
  }
  const validateSubmit = function(e) {
    // TODO: post validate code to endpoint
    // according to result, continue and call `onButtonClick`
  }
  const infoSubmit = function(e) {
    // TODO: post info to endpoint
    // redirect to profile / home
  }

  /* TODO: get Ali to check this :( */
  const onButtonClick = function(e) {
    setDisplaySteps([
      formStep+1===0, 
      formStep+1===1, 
      formStep+1===2, 
    ]);
    setFormStep(formStep+1);
  };
  return (
    <Layout>
      <LandingHeader />
        <Content>
          <Row style={{ height:'70px'}}/>
          <FormWrapper>
              <Row align="middle" justify="center">
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 16, offset: 0 }} lg={{ span: 9, offset: 0 }} align="middle" justify="center">
                  <Steps current={formStep}>
                    <Step title="Step 1" description="Signup" />
                    <Step title="Step 2" description="Validate your email" />
                    <Step title="Step 3" description="Additional information" />
                  </Steps>
                  <Divider />
                  
                  {/* Step 1 - Credentials  */}
                  <Form layout="vertical">
                  <Col id="col-step1" 
                    xs={{ span: 24, offset: 0 }} 
                    sm={{ span: 14, offset: 0 }} 
                    lg={{ span: 14, offset: 0 }} 
                    align="left" justify="left"
                    style={{display: displaySteps[0] ? 'block' : 'none' }}
                  >
                    <FormTitle>Sign Up</FormTitle>
                    <br />
                    <Input.Group compact>
                      <Form.Item
                        label={<FormLabel>Name</FormLabel>}
                        name="name"
                        rules={[{ required: true, message: "Please input your first name!" }]}
                      >
                        <Input onChange={handleNameChange} value={state.name}/>
                      </Form.Item>
                      <Form.Item
                        label={<FormLabel>Surname</FormLabel>}
                        name="surname"
                        rules={[{ required: true, message: "Please input your last name!" }]}
                      >
                        <Input onChange={handleSurnameChange} value={state.surname}/>
                      </Form.Item>
                    </Input.Group>
                    <Form.Item
                      label={<FormLabel>Email</FormLabel>}
                      name="email"
                      rules={[{ required: true, message: "Please input your email!" }]}
                    >
                      <Input onChange={handleEmailChange} value={state.email}/>
                    </Form.Item>

                    <Form.Item
                      label={<FormLabel>Password</FormLabel>}
                      name="password"
                      rules={[{ required: true, message: "Please input your password!" }]}
                    >
                      <Input.Password onChange={handlePasswordChange} value={state.password}/>
                    </Form.Item>

                    <Form.Item
                      label={<FormLabel>Confirm Password</FormLabel>}
                      name="confirm-password"
                      rules={[{ required: true, message: "Please confirm your password!" }]}
                    >
                      <Input.Password onChange={handleConfirmPasswordChange} value={state.confirmPassword}/>
                    </Form.Item>
                    <Form.Item>
                      <FormButton type="primary" htmlType="submit" onClick={signUpSubmit}>
                        Confirm
                      </FormButton>
                    </Form.Item>
                  </Col>
                  </Form>    
                  
                  {/* Step 2 - Verification */}
                  <Form layout="vertical">
                  <Col id="col-step2" 
                    xs={{ span: 24, offset: 0 }} 
                    sm={{ span: 14, offset: 0 }} 
                    lg={{ span: 14, offset: 0 }} 
                    align="left" justify="left"
                    style={{display: displaySteps[1] ? 'block' : 'none' }}
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
                    <Row style={{ height:'70px'}}/>

                  </Col>
                  </Form>
                  
                  {/* Step 3 - Interests    */}
                  <Form layout="vertical">
                  <Col id="col-step3" 
                    xs={{ span: 24, offset: 0 }} 
                    sm={{ span: 14, offset: 0 }} 
                    lg={{ span: 14, offset: 0 }} 
                    align="left" justify="left"
                    style={{display: displaySteps[2] ? 'block' : 'none' }}
                  >
                    <FormTitle>Additional Information</FormTitle>
                      <br />
                    <Form.Item
                        label={<FormLabel>Research area interests</FormLabel>}
                        name="interests"
                        rules={[{ required: true, message: "Please select at least one area of interest!" }]}
                    >
                      <Select
                          mode="multiple"
                          allowClear
                          style={{ width: '100%' }}
                          placeholder="Please select"
                          defaultValue={['a10', 'c12']}
                          onChange={handleTagChange}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                      name="terms-and-contitions" 
                      valuePropName="checked"
                      rules={[{ required: true, message: "You have to accept the terms and conditions!" }]}
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

