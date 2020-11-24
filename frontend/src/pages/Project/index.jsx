import React from "react";
import api from "../../axios";

import { Space, Row, Col, Upload, message } from "antd";
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

const { Option } = Select;

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
                    
const Project = () => {
  const handleSubmit = function (values) {
    var form_data = new FormData();
    console.log(values["title"]);
    for (var key in values) {
      form_data.append(key, values[key]);
    }
    console.log(form_data);

    api({ sendToken: true })
      .post("/post/add", form_data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });

    message.success("Publication successfully posted.", 4);
  };

  return (
    <Content>
      <Col>
        <MainHeader />
        <Divider style={{ marginTop: "90px" }} orientation="center">
          <FormTitle>New Publication</FormTitle>
        </Divider>
        <Row style={{ height: "%100vh" }} align="top" justify="start">
          <ProfileSider />

          <Content
            style={{
              marginLeft: "220px",
              marginRight: "220px",
            }}
          >
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row align="middle" justify="center">
                <Content>
                  <Col
                    style={{
                      marginLeft: "200px",
                      marginRight: "50px",
                    }}
                  >
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
                      <Radio.Group>
                        <Space size={20}>
                          <Radio value={1}>Public</Radio>
                          <Radio value={0}>Private</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Content>

                <Content>
                  <Col
                    style={{
                      marginLeft: "50px",
                      marginRight: "50px",
                    }}
                  >
                    <br />
                    <Form.Item
                      label={<FormLabel>Deadline</FormLabel>}
                      name="deadline"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <Form.Item
                      label={
                        <FormLabel>Upload File About Publication</FormLabel>
                      }
                      rules={[{ required: false, message: "Optional" }]}
                    >
                      <Upload>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Requirements</FormLabel>}
                      name="requirements"
                      rules={[{ required: false, message: "" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Add Collaborators</FormLabel>}
                      name="collaborators"
                      rules={[{ required: false, message: "" }]}
                    >
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Collabs"
                      >
                        {}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Add Tags</FormLabel>}
                      name="tags"
                      rules={[{ required: false, message: "" }]}
                    >
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Tags"
                      >
                        {interestChoices}
                      </Select>
                    </Form.Item>
                    <FormButton type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Col>
                </Content>
              </Row>
            </Form>
          </Content>
        </Row>
      </Col>
    </Content>
  );
};

export default Project;
