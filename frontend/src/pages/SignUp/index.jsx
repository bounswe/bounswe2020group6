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
} from "antd";

import {
  FormWrapper,
  FormTitle,
  FormButton,
  FormLabel,
} from "./style";

const { Footer } = Layout;
const { Option } = Select;

//dummy data
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleTagChange(value) {
    console.log(`selected ${value}`);
}

const SignUp = () => {
  return (
    <Layout>
      <LandingHeader />
        <Content>
          <Row style={{ height:'100px'}}/>
          <FormWrapper>
            <Form layout="vertical">
              <Row align="middle" justify="center">
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 1 }} lg={{ span: 6, offset: 1 }}>
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
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 1 }} lg={{ span: 6, offset: 1 }}>
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
              </Row>
            </Form>
          </FormWrapper>
        </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default SignUp;
