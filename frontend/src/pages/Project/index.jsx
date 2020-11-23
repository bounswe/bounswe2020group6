import React from "react";

import { Space, Row, Col } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";
import { UploadOutlined } from "@ant-design/icons";

import { Select, Form, Input, Button, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle } from "./style";

function onChange(date, dateString) {
  console.log(date, dateString);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

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
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Abstract</FormLabel>}
                    name="abstract"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input.TextArea rows={8} />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Privacy</FormLabel>}
                    name="privacy"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Radio.Group value={1} defaultValue={2} al>
                      <Space size={20}>
                        <Radio value={1}>Public</Radio>
                        <Radio value={2}>Private</Radio>
                      </Space>
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
                    name="deadline"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <DatePicker onChange={onChange} />
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Upload File About Publication</FormLabel>}
                    name="upload"
                    rules={[{ required: false, message: "Optional" }]}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Collabrators</FormLabel>}
                    name="collabrators"
                    rules={[{ required: false, message: "Optional" }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Collabs"
                      onChange={handleChange}
                    >
                      {}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Tags</FormLabel>}
                    name="tags"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Tags"
                      onChange={handleChange}
                    >
                      {interestChoicesList}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <br />
              <br />
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
