import React, { useEffect } from "react";
import api from "../../axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { Space, Row, Col, Upload, message } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";
import { UploadOutlined } from "@ant-design/icons";

import { Select, Form, Input, Button, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle } from "./style";

import { getTags } from "../../redux/choices/api";

const { Option } = Select;



const Project = () => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const tags = selector((state) => state.choices.tags);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  },[]);

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
        message.success("Publication successfully posted.", 4);
        history.push("/home");
      })
      .catch((e) => {
        console.log(e.response.data);
        message.success("Publication successfully posted.", 4);
        history.push("/home");
      });
  };

  return (
    <Content>
      <Col>
        <MainHeader />
        <Divider style={{ marginTop: "90px"}}>
          <FormTitle>New Publication</FormTitle>
        </Divider>
        <Row style={{ height: "%100vh" }} align="top" justify="start">
          <ProfileSider />

          <Content>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row align="middle" justify="center">
                <Col
                  xs={{ span: 20, offset: 1 }}
                  sm={{ span: 14, offset: 1 }}
                  lg={{ span: 6, offset: 4 }}
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

                <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 14, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
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
                    label={<FormLabel>Upload File About Publication</FormLabel>}
                    rules={[{ required: false, message: "Optional" }]}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                    <Select mode="tags" style={{ width: "100%" }} placeholder="Collabs">
                      {}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Tags</FormLabel>}
                    name="tags"
                    rules={[{ required: false, message: "" }]}
                  >
                    <Select mode="tags" style={{ width: "100%" }} placeholder="Tags">
                     {tags.map((x)=>(<Option key={x}>{x}</Option>))}
                    </Select>
                  </Form.Item>
                  <FormButton type="primary" htmlType="submit">
                    Confirm
                  </FormButton>
                </Col>
              </Row>
            </Form>
          </Content>
        </Row>
      </Col>
    </Content>
  );
};

export default Project;
