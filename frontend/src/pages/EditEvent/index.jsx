import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, message, DatePicker } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";

import { Select, Form, Input, Divider, Spin } from "antd";
import { FormButton, FormLabel, FormTitle } from "./style";

import { getEvent, editEvent } from "../../redux/event/api";

import { getTags } from "../../redux/choices/api";

const { Option } = Select;

const EditEvent = () => {
  // states
  const [loading, setloading] = useState(true)
  const [eventData, setEventData] = useState(null)
  
  // get event id
  const { eventId } = useParams();

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector;

  // get tags  
  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  },[]);

  // get event data
  useEffect(() => {
    dispatch(getEvent(eventId, history, setEventData, setloading));
    // eslint-disable-next-line
  },[]);

  // tags that are available
  const tags = selector((state) => state.choices.tags);
    
  // form object
  const [createEventForm] = Form.useForm();

  // submit action for event creation form
  const editEventSubmit = function (values) {
    // cast date object into string
    values.date = values.date.toString()

    // prepare request body
    var request_body = {
      update: {
        ...values,
        isPublic: 1
      }
    }

    // dispatch edit event request
    dispatch(editEvent(request_body, eventId, history, message));
  };

  return (
    <Content>
      <Col>
        <MainHeader />
        <Divider style={{ marginTop: "90px"}}>
          <FormTitle>Edit Event</FormTitle>
        </Divider>
        <Row style={{ height: "%100vh" }} align="top" justify="start">
          <ProfileSider />
          {loading ? <Content><Spin/></Content> :
          <Content>
            <Form 
              layout="vertical" 
              onFinish={(values) => editEventSubmit(values)} form={createEventForm}
              initialValues={
                {...eventData}
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
                    <Input placeholder="Title of the event"/>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Body</FormLabel>}
                    name="body"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input.TextArea rows={4} placeholder="Description of the event"/>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Extra Notes</FormLabel>}
                    name="other"
                  >
                    <Input.TextArea rows={3} placeholder="Extra notes & details about the event" />
                  </Form.Item>
                </Col>

                <Col
                xs={{ span: 20, offset: 1 }}
                sm={{ span: 14, offset: 1 }}
                lg={{ span: 7, offset: 1 }}
                >
                  <br />
                  <Row justify="space-between">
                    <Form.Item
                      label={<FormLabel>Date</FormLabel>}
                      name="date"
                      rules={[{ required: true, message: "Required" }]}
                      style={{width: "45%"}}
                    >
                      <DatePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(e) => {}}
                      style={{width: "100%"}}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Event Type</FormLabel>}
                      name="type"
                      rules={[{ required: true, message: "Required" }]}
                      style={{width: "45%"}}
                    >
                      <Select defaultValue="Conference">
                        <Option value="After Party">After Party</Option>
                        <Option value="Award Ceremony">Award Ceremony</Option>
                        <Option value="Conference">Conference</Option>
                        <Option value="Journal">Journal</Option>
                        <Option value="Meet-up">Meet-up</Option>
                        <Option value="Summit">Summit</Option>
                      </Select>
                    </Form.Item>
                  </Row>
                  <Form.Item
                    label={<FormLabel>Location</FormLabel>}
                    name="location"
                    rules={[{ required: true, message: "Required" }]} 
                  >
                    <Input.TextArea rows={2} placeholder="Address of the event"/>
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
                  <Form.Item
                    label={<FormLabel>Link</FormLabel>}
                    name="link"
                    rules={[{ required: false, message: "Required" }]}
                  >
                    <Input placeholder="Link of the event website"/>
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
          }
        </Row>
      </Col>
    </Content>
  );
};

export default EditEvent;
