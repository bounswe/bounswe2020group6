import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Space, Row, Col, Upload, message } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";
import { UploadOutlined } from "@ant-design/icons";

import { Select, Form, Input, Button, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle } from "./style";

import { postPost } from "../../redux/project/api";

import { getTags } from "../../redux/choices/api";

const { Option } = Select;



const CreateProject = () => {

  const data = {
    title: "",
    project_tags: [],
    summary: "",
    privacy: 1,
    project_milestones: [],
    requirements: "",
    status: 0
  }


    
  const [createPostForm] = Form.useForm();

  const dispatch = useDispatch();
  const selector = useSelector;

  const [projectData, setProjectData] = React.useState(data);

  const tags = selector((state) => state.choices.tags);

  const history = useHistory();

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  },[]);


  const createPostSubmit = function (values) {
    let updatedValues = {
      ...values,
      status: 2,
    }
    dispatch(postPost(updatedValues, history, message));
  };

  return (
    <Content>
      <Col>
        <MainHeader />
        <Divider style={{ marginTop: "90px"}}>
          <FormTitle>Edit Project</FormTitle>
        </Divider>
        <Row style={{ height: "%100vh" }} align="top" justify="start">
          <ProfileSider />

          <Content>
            <Form 
              layout="vertical" 
              onFinish={(values) => createPostSubmit(values)} form={createPostForm}
              initialValues={
                {...data}
              }
            >
              <Row  justify="center">
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
                    <Input value={projectData.title}/>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Summary</FormLabel>}
                    name="summary"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input.TextArea rows={4}/>
                  </Form.Item>
                </Col>

                <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 14, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
                >
                  <br />
                  <Form.Item
                    label={<FormLabel>Add Tags</FormLabel>}
                    name="tags"
                    rules={[{ required: false, message: "" }]}
                  >
                    <Select mode="tags" style={{ width: "100%" }} placeholder="Tags">
                     {tags.map((x)=>(<Option key={x}>{x}</Option>))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Requirements</FormLabel>}
                    name="requirements"
                  >
                    <Input.TextArea rows={4}/>
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
                  <Row style={{marginBottom: "16px"}}>
                    <Col style={{width:"100%"}}>
                    <FormButton type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Content>
        </Row>
      </Col>
    </Content>
  );
};

export default CreateProject;
