import React from "react";

import LandingHeader from "../../components/LandingHeader";

import { 
  footerStyle, 
  Content 
} from "./style";

import { 
  Layout, 
  Row, 
  Col,
  Form,
  Input,
  Checkbox,
  Select,
  Steps,
  Divider,
} from "antd";

import {
  FormWrapper,
  FormTitle,
  FormButton,
  FormLabel,
} from "./style";

const { Footer } = Layout;
const { Option } = Select;
const { Step   } = Steps;

//dummy data
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleTagChange(value) {
    console.log(`selected ${value}`);
}

const SignUp = () => {
  const [formStep, setFormStep] = React.useState(0);
  const [displaySteps, setDisplaySteps] = React.useState([true, false, false]);
  /* TODO: get Ali to check this :( */
  const onButtonClick = stepNo => {
    var formIsValid = true; // To be
    if (formIsValid) {
      setDisplaySteps([
        formStep+1===0, 
        formStep+1===1, 
        formStep+1===2, 
      ]);
      setFormStep(formStep+1);
    }
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
                    <Step title="Step 1" description="This is a description." />
                    <Step title="Step 2" description="This is a description." />
                    <Step title="Step 3" description="This is a description." />
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
                    <Form.Item
                      label={<FormLabel>Email</FormLabel>}
                      name="email"
                      rules={[{ required: true, message: "Please input your email!" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label={<FormLabel>Password</FormLabel>}
                      name="password"
                      rules={[{ required: true, message: "Please input your password!" }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      label={<FormLabel>Confirm Password</FormLabel>}
                      name="confirm-password"
                      rules={[{ required: true, message: "Please confirm your password!" }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item>
                      <FormButton type="primary" htmlType="submit" onClick={onButtonClick}>
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
                      <FormButton type="primary" htmlType="submit" onClick={onButtonClick}>
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
                    <Input.Group compact>
                      <Form.Item
                        label={<FormLabel>Name</FormLabel>}
                        name="name"
                        rules={[{ required: true, message: "Please input your first name!" }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label={<FormLabel>Surname</FormLabel>}
                        name="surname"
                        rules={[{ required: true, message: "Please input your last name!" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Input.Group>
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
                      <FormButton type="primary" htmlType="submit">
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
