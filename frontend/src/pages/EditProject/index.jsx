import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Space, Row, Col, message, Tag } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";

import { Select, Form, Input, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle, IndentedBlock } from "./style";

import { editPost, getPost, addTag, deleteTag, addMilestone, updateMilestone, deleteMilestone } from "../../redux/project/api";

import { getTags } from "../../redux/choices/api";
import { render } from "react-dom";

const { Option } = Select;

const EditProject = () => {

  const { projectId } = useParams();

  const data = {
    title: "",
    project_tags: [],
    description: "",
    privacy: 1,
    project_milestones: [],
    requirements: "",
    status: 0
  }

  const statusDict = {
    0: "Cancelled",
    1: "Completed",
    2: "In Progress",
    3: "Hibernating",
    4: "Team Building",
  } 
    
  const [editPostForm] = Form.useForm();

  const dispatch = useDispatch();
  const selector = useSelector;

  const [projectData, setProjectData] = React.useState(data);
  const [activeMilestone, setActiveMilestone] = React.useState(-1);
  const [milestonesData, setMilestonesData] = React.useState(projectData.project_milestones);

  //TOOD: remove
  const [tempTags, setTempTags] = React.useState([]);

  const tags = selector((state) => state.choices.tags);

  const history = useHistory();

  useEffect(() => {
    dispatch(getTags());
    dispatch(getPost(projectId, setProjectData));
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    setMilestonesData(projectData.project_milestones)
    editPostForm.resetFields();
    // eslint-disable-next-line
  },[projectData]);

  // handle tag change
  function handleOnChangeTags(e) {
    let removedTags = tempTags.filter(x => !e.includes(x)); // calculates diff
    let addedTags   = e.filter(x => !tempTags.includes(x));
   
    if (removedTags.length > 0){
      dispatch(deleteTag(projectId, removedTags, message));
    }
    if (addedTags.length > 0){
      dispatch(addTag(projectId, addedTags, message));
    }
    
    setTempTags(e)
    //setProjectData({...projectData, project_tags:value.project_tags});
  }

  // Handle changes on milestones
  const selectMilestone = function(value) {
    setActiveMilestone(value);
  } 

  const handleDeleteMilestone = function(index) {
    // let newArr = [...milestonesData];
    // newArr.splice(index, 1)
    // console.log(newArr)
    // setMilestonesData(newArr)
    setActiveMilestone(-1)

    dispatch(deleteMilestone(projectId, milestonesData[index], setProjectData, message));
  } 

  const handleAddMilestone= function(index) {
    let tempMilestoneData = {
      date: moment().format('YYYY-MM-DD'), 
      title: "Enter Title", 
      description: "Enter Description", 
      id: milestonesData.length
    };
    let newArr = [...milestonesData, tempMilestoneData, ];
    setMilestonesData(newArr)
    setActiveMilestone(milestonesData.length)

    dispatch(addMilestone(projectId, tempMilestoneData, setProjectData, message));
  } 

  const handleMilestoneSaveChanges = function(index) {
    dispatch(updateMilestone(projectId, milestonesData[index], setProjectData, message));
  }

  function milestoneDateChange(e, index){
    if (e) {
      let newArr = [...milestonesData];
      newArr[index].date = e['_i'];
      setMilestonesData(newArr); 
    }
  }

  function milestoneTitleChange(e, index){
    let newArr = [...milestonesData];
    newArr[index].title = e.target.value; 
    setMilestonesData(newArr); 
  }

  function milestoneDescChange(e, index){
    let newArr = [...milestonesData];
    newArr[index].description = e.target.value; 
    setMilestonesData(newArr); 
  }


  /**
   * delete all tags
   * add all tags
   * delete all milestones
   * add all milestones
   */

  const editPostSubmit = function (values) {
    let updatedValues = {
      ...values,
      milestone: milestonesData,
    }
    console.log(updatedValues)
    dispatch(editPost(updatedValues, projectId, history, message));
  };

  const getData = () => projectData || data

  return (
    <Content>
      <Col>
        <MainHeader />
        <Divider style={{ marginTop: "90px"}}>
          <FormTitle>Edit Publication</FormTitle>
        </Divider>
        <Row style={{ height: "%100vh" }} align="top" justify="start">
          <ProfileSider />

          <Content>
            <Form 
              layout="vertical" 
              onFinish={(values) => editPostSubmit(values)} form={editPostForm}
              enableReinitialize={true}
              initialValues={
                {...getData(), chooseMilestone: -1}
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
                    label={<FormLabel>Description</FormLabel>}
                    name="description"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input.TextArea rows={8}/>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Add Tags</FormLabel>}
                    name="project_tags"
                    rules={[{ required: false, message: "" }]}
                  >
                    <Select mode="tags" style={{ width: "100%" }} placeholder="Tags" onChange={e=>handleOnChangeTags(e)}>
                     {tags.map((x)=>(<Option key={x}>{x}</Option>))}
                    </Select>
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
                    label={<FormLabel>Edit Milestones</FormLabel>}
                    name="chooseMilestone"
                  >
                    <Row>
                      <Tag 
                        color="green"
                        onClick={handleAddMilestone}
                        style={{marginBottom:"16px", marginTop:"0px", cursor: "pointer"}}
                      >
                        Add Milestone
                      </Tag>
                    </Row>
                    <Select value={activeMilestone} onChange={selectMilestone}>
                      {[{title:"Choose a milestone to edit"},...milestonesData].map((milestone, index)=>
                        <Option value={index-1}>{milestone.title}</Option>
                      )}
                    </Select>
                  </Form.Item>
                  <IndentedBlock>
                    <Form.Item
                      name="milestone"
                    >
                      { milestonesData.map(
                        (milestone, index)=>
                        <div 
                          style={{marginBottom: "10px", display: activeMilestone === index ? "block" : "none"}}
                        >
                          <Row style={{marginBottom: "16px"}}>
                            <h4>Milestone Name</h4>
                            <Input value={milestonesData[index].title} onChange={(e) => milestoneTitleChange(e, index)}/>
                          </Row>
                          <Row style={{marginBottom: "16px"}}>
                            <h4>Milestone Description</h4>
                            <Input value={milestonesData[index].description} onChange={(e) => milestoneDescChange(e, index)}/>
                          </Row>
                          <Row>
                          <h4>Milestone Date</h4>
                          </Row>
                          <Row>
                            <DatePicker value={moment(milestonesData[index].date)} onChange={(e) => milestoneDateChange(e, index)}/>
                          </Row>
                          <Row style={{marginBottom:"16px", marginTop:"16px"}}>
                          <Tag 
                              color="blue"
                              style={{cursor: "pointer"}}
                              onClick={e => handleMilestoneSaveChanges(index)}
                            >
                              Save Changes
                            </Tag>
                            <Tag 
                              color="red"
                              style={{cursor: "pointer"}}
                              onClick={e => handleDeleteMilestone(index)}
                            >
                              Remove Milestone
                            </Tag>
                          </Row>
                        </div>
                        )
                      }
                    </Form.Item>
                  </IndentedBlock>
                  <Form.Item
                    label={<FormLabel>Requirements</FormLabel>}
                    name="requirements"
                  >
                    <Input.TextArea rows={8}/>
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

export default EditProject;
