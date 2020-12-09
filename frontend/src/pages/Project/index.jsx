import React from "react";

import { Row, Col } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";
import { UploadOutlined } from "@ant-design/icons";

import { Select, Form, Input, Button, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle } from "./style";

function onChange(date, dateString) {
  console.log(date, dateString);
}

const Project = () => {
  return (
    <Content>
      <MainHeader />
      <Divider style={{ marginTop: "90px" }} orientation="center">
        <FormTitle>New Publication</FormTitle>
      </Divider>
      <Row style={{ height: "%100vh" }} align="top" justify="start">
        <Content>
          <ProfileSider />
        </Content>
        <Content
          style={{
            marginLeft: "50px",
            marginRight: "220px",
          }}
        >
          <Row>
            <Content>
              <Col
                style={{
                  marginRight: "30px",
                  height: "100px",
                }}
              >
                <Form layout="vertical">
                  <br />
                  <Form.Item
                    label={<FormLabel>Title</FormLabel>}
                    name="title"
                    rules={[{ required: true, message: "Title" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Summary</FormLabel>}
                    name="summary"
                    rules={[{ required: true, message: "Summary" }]}
                  >
                    <Input.TextArea rows={8} />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Publication Type</FormLabel>}
                    name="pubtype"
                  >
                    <Radio.Group value={1}>
                      <Radio value={1}>Paper</Radio>
                      <Radio value={2}>Project</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Col>
            </Content>

            <Content>
              <Col>
                <Form layout="vertical">
                  <br />
                  <Form.Item
                    label={<FormLabel>Deadline</FormLabel>}
                    name="title"
                    rules={[{ required: true, message: "Title" }]}
                  >
                    <DatePicker onChange={onChange} />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Upload File About Publication</FormLabel>}
                    name="title"
                    rules={[{ required: true, message: "Title" }]}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Collabrators</FormLabel>}
                    name="title"
                    rules={[{ required: true, message: "Title" }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      defaultValue={["ahmet", "con"]}
                    >
                      {["a", "b", "c", "d"]}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Tags</FormLabel>}
                    name="title"
                    rules={[{ required: true, message: "Title" }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      defaultValue={["ahmet", "con"]}
                    >
                      {["a", "b", "c", "d"]}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Privacy</FormLabel>}
                    name="confirm-password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                    ]}
                  >
                    <Radio.Group value={1}>
                      <Radio value={1}>Paper</Radio>
                      <Radio value={2}>Project</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Col>
              <FormButton type="primary" htmlType="submit">
                Confirm
              </FormButton>
            </Content>
          </Row>
        </Content>
      </Row>
    </Content>
  );
};

export default Project;
