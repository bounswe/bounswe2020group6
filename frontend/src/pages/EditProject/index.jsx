import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Space, Row, Col, message, Tag } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content, RadioStyle } from "./style";

import { Select, Form, Input, Radio, DatePicker, Divider, Popconfirm } from "antd";
import { FormButton, FormLabel, FormTitle, IndentedBlock, GhastlyHref } from "./style";

import { 
  editPost, 
  getPost, 
  deletePost,
  addTag, 
  deleteTag, 
  addMilestone, 
  updateMilestone, 
  deleteMilestone,
} from "../../redux/project/api";

import { getTags } from "../../redux/choices/api";

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

  const [tempTags, setTempTags] = React.useState([]);

  const tags = selector((state) => state.choices.tags);

  const history = useHistory();

  useEffect(() => {
    dispatch(getTags());
    dispatch(getPost(projectId, history, setProjectData));
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    setMilestonesData(projectData.project_milestones)
    editPostForm.resetFields();
    // eslint-disable-next-line
  },[projectData]);


  function handleOnChangeTags(e) {
    let removedTags = tempTags.filter(x => !e.includes(x));
    let addedTags   = e.filter(x => !tempTags.includes(x));
   
    if (removedTags.length > 0){
      dispatch(deleteTag(projectId, removedTags, message));
    }
    if (addedTags.length > 0){
      dispatch(addTag(projectId, addedTags, message));
    }
    
    setTempTags(e)
  }

  // Handle changes on milestones
  const selectMilestone = function(value) {
    setActiveMilestone(value);
  } 

  const handleDeleteMilestone = function(index) {
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

  const editPostSubmit = function (values) {
    let updatedValues = {
      ...values,
      milestone: milestonesData,
    }
    dispatch(editPost(updatedValues, projectId, history, message));
  };

  function handleDeleteProject(){
    dispatch(deletePost(projectId, history, message));
  }

  const getData = () => projectData || data

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
                    <Input.TextArea rows={4}/>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Requirements</FormLabel>}
                    name="requirements"
                  >
                    <Input.TextArea rows={4}/>
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
                      <Tag 
                        color="green"
                        onClick={handleAddMilestone}
                        style={{marginBottom:"16px", marginTop:"0px", cursor: "pointer"}}
                      >
                        Add Milestone
                      </Tag>
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
                  <Form.Item
                    label={<FormLabel>Project Status</FormLabel>}
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <Radio.Group optionType="button" buttonStyle="solid">
                      <Space size={20}>
                        <Col>
                        {Object.keys(statusDict).map((key, index) =>
                          <Row>
                            <Radio style={RadioStyle} value={key}>{statusDict[key]}</Radio>
                          </Row>
                        )}
                        </Col>
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
                  <Row style={{marginBottom: "16px"}}>
                    <Col style={{width:"100%", textAlign:"right"}}>
                    <Popconfirm 
                      title="Are you sure？" 
                      okText="Yes, delete the project." 
                      cancelText="No I want to keep my project."
                      onConfirm={handleDeleteProject}
                    >
                      <GhastlyHref type="primary">
                        I want to delete this project.
                      </GhastlyHref>
                    </Popconfirm>
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

export default EditProject;
