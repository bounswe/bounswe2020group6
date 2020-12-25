import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Space, Row, Col, Upload, message, Tag } from "antd";
import MainHeader from "../../components/MainHeader";
import ProfileSider from "../../components/ProfileSider";
import { Content } from "./style";
import { UploadOutlined } from "@ant-design/icons";

import { Select, Form, Input, Button, Radio, DatePicker, Divider } from "antd";
import { FormButton, FormLabel, FormTitle, IndentedBlock } from "./style";

import { postPost } from "../../redux/project/api";

import { getTags, getDepartments, getUniversities } from "../../redux/choices/api";
import { Summary } from "../../components/ContentCard/style";

const { Option } = Select;


const EditProject = () => {

  const data = {
    title: "Logistic Regression for Bicycle Manufacturers",
    tags: ["Mechanics", "Computer Science", "Statistics", "Artificial Intelligence", "Machine Learning"],
    abstract: "The purpose of this article is to provide researchers, editors, and readers with a set of guidelines for what to expect in an article using logistic regression techniques. Tables, figures, and charts that should be included to comprehensively assess the results and assumptions to be verified are discussed.",
    privacy: 0,
    milestones: [
      {"date": "04 March, 2021", "title": "Baseline results", "desc": "We will present a baseline model that can do stuff."}, 
      {"date": "24 December, 2021", "title": "Application Deadline for IOCON 2021", "desc": "We will have two people to apply on our behalf."},
      {"date": "06 January, 2022", "title": "Milestone Reports", "desc": "Rerports shall be ready by the given date."},
      {"date": "21 October, 2022", "title": "Final press conference", "desc": "Final deadline for the press conference we will be applying to."},
    ],
    requirements: [
      {
        role: "Fullstack Developer",
        university: "Bogazici University", 
        department: "Software Engineering", 
        interestAreas:["Machine Learning", "Mathematics"],
        title: "MSc",
      },
      {
        role: "Mathematician",
        university: null, 
        department: "Mathematics", 
        interestAreas:["Calculus", "Linear Algebra"],
        title: "MSc",
      },
    ],
    collaborators: [
      {id: 6, name: "Jens Søgaard", university: "L’institut des Ponts et des", department:"EE", title: "MSc", photo: null},
      {id: 5, name: "Fahrad Fahraini", university: "Technische Insitut München", department:"CmpE", title: "MSc", photo: null}
    ],
    files: [
      {id:12, name: "milestone1.pdf", url: "#"},
      {id:34, name: "milestone2.pdf", url: "#"},
      {id:7,  name: "milestone3.pdf", url: "#"}
    ]
  }

  const [newPostForm] = Form.useForm();

  const dispatch = useDispatch();
  const selector = useSelector;

  const tags = selector((state) => state.choices.tags);
  const departments = selector((state) => state.choices.departments);
  const universities = selector((state) => state.choices.universities);

  const history = useHistory();

  useEffect(() => {
    dispatch(getTags());
    dispatch(getDepartments());
    dispatch(getUniversities());
    // eslint-disable-next-line
  },[]);

  const [activeDeadline, setActiveDeadline] = React.useState(-1);
  const [milestonesData, setMilestonesData] = React.useState(data.milestones);

  const [activeRequirement, setActiveRequirement] = React.useState(-1);
  const [requirementsData, setRequirementsData] = React.useState(data.requirements);

  // Handle changes on milestones
  const selectDeadline = function(value) {
    setActiveDeadline(value);
  } 

  const handleDeleteDeadline = function(index) {
    console.log(milestonesData)
    let newArr = [...milestonesData];
    newArr.splice(index, 1)
    console.log(newArr)
    setMilestonesData(newArr)
    setActiveDeadline(-1)
  } 

  const handleAddDeadline= function(index) {
    console.log(milestonesData)
    let newArr = [...milestonesData, {date: moment(), desc: "Enter Description"}, ];
    console.log(newArr)
    setMilestonesData(newArr)
    setActiveDeadline(newArr.length-1)
  } 

  function deadlineDateChange(e, index){
    let newArr = [...milestonesData];
    newArr[index].date = e['_i'];
    setMilestonesData(newArr); 
  }

  function deadlineNameChange(e, index){
    let newArr = [...milestonesData];
    newArr[index].desc = e.target.value; 
    setMilestonesData(newArr); 
  }

  // Handle changes on requirements
  const selectRequirement = function(value) {
    setActiveRequirement(value);
  } 

  const handleDeleteRequirement = function(index) {
    console.log(requirementsData)
    let newArr = [...requirementsData];
    newArr.splice(index, 1)
    console.log(newArr)
    setRequirementsData(newArr)
    setActiveRequirement(-1)
  } 

  const handleAddRequirement= function(index) {
    console.log(requirementsData)
    let newArr = [...requirementsData, {role:"", university:"", department:"", interestAreas:[]}, ];
    console.log(newArr)
    setMilestonesData(newArr)
    setActiveDeadline(newArr.length-1)
  } 


  function requirementRoleChange(e, index){
    let newArr = [...requirementsData];
    newArr[index].role = e.target.value;
    setRequirementsData(newArr); 
  }

  function requirementUniversityChange(value, index){
    let newArr = [...requirementsData];
    newArr[index].university = value;
    setRequirementsData(newArr); 
  }

  function requirementDepartmentChange(value, index){
    let newArr = [...requirementsData];
    newArr[index].department = value;
    setRequirementsData(newArr); 
  }

  function requirementTitleChange(e, index){
    let newArr = [...requirementsData];
    newArr[index].title = e.target.value;
    setRequirementsData(newArr); 
  }

  function requirementInterestsChange(value, index){
    let newArr = [...requirementsData];
    newArr[index].interests = value;
    setRequirementsData(newArr); 
  }

  const newPostSubmit = function (values) {
    let updatedValues = {
      ...values,
      deadline: milestonesData,
      requirements: requirementsData
    }
    dispatch(postPost(updatedValues, history, message));
  };

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
              onFinish={(values) => newPostSubmit(values)} form={newPostForm}
              initialValues={{
                title: data.title,
                abstract: data.abstract,
                privacy: data.privacy,
                tags: data.tags,
                requirements: data.requirements,
                chooseRequirements: -1,
                chooseDeadline: -1,
              }}
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
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Abstract</FormLabel>}
                    name="abstract"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input.TextArea rows={8}/>
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
                    name="chooseDeadline"
                  >
                    <Row>
                      <Tag 
                        color="green"
                        onClick={handleAddDeadline}
                        style={{marginBottom:"16px", marginTop:"0px", cursor: "pointer"}}
                      >
                        Add Deadline
                      </Tag>
                    </Row>
                    <Select value={activeDeadline} onChange={selectDeadline}>
                      {[{desc:"Choose a deadline to edit"},...milestonesData].map((deadline, index)=>
                        <Option value={index-1}>{deadline.desc}</Option>
                      )}
                    </Select>
                  </Form.Item>
                  <IndentedBlock>
                    <Form.Item
                      name="deadline"
                    >
                      { milestonesData.map(
                        (deadline, index)=>
                        <div 
                          style={{marginBottom: "16px", display: activeDeadline === index ? "block" : "none"}}
                        >
                          <Row style={{marginBottom: "16px"}}>
                            <h4>Deadline Name</h4>
                            <Input value={milestonesData[index].desc} onChange={(e) => deadlineNameChange(e, index)}/>
                          </Row>
                          <Row>
                          <h4>Deadline Date</h4>
                          </Row>
                          <Row>
                            <DatePicker value={moment(milestonesData[index].date)} onChange={(e) => deadlineDateChange(e, index)}/>
                          </Row>
                          <Row style={{marginBottom:"16px", marginTop:"16px"}}>
                            <Tag 
                              color="red"
                              style={{cursor: "pointer"}}
                              onClick={e => handleDeleteDeadline(index)}
                            >
                              Remove Deadline
                            </Tag>
                          </Row>
                        </div>
                        )
                      }
                    </Form.Item>
                  </IndentedBlock>
                  {/*}
                  <Form.Item
                    label={<FormLabel>Upload File About Publication</FormLabel>}
                    rules={[{ required: false, message: "Optional" }]}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  {*/}
                  <Form.Item
                    label={<FormLabel>Edit Requirements</FormLabel>}
                    name="chooseRequirements"
                    rules={[{ required: false, message: "" }]}
                  >
                    <Row>
                      <Tag 
                        color="green"
                        onClick={handleAddRequirement}
                        style={{marginBottom:"16px", marginTop:"0px", cursor: "pointer"}}
                      >
                        Add Requirement
                      </Tag>
                    </Row>
                    <Select value={activeRequirement} onChange={selectRequirement}>
                      {[{role:"Choose a role to edit"},...requirementsData].map((requirement, index)=>
                        <Option value={index-1}>{requirement.role}</Option>
                     )}
                    </Select>
                  </Form.Item>
                  <IndentedBlock>
                    <Form.Item
                      name="requirements"
                    >
                      { requirementsData.map(
                        (requirement, index)=>
                        <div 
                          style={{marginBottom: "16px", display: activeRequirement === index ? "block" : "none"}}
                        >
                          <Row style={{marginBottom: "16px"}}>
                            <h4>Role</h4>
                            <Input value={requirementsData[index].role} onChange={(e) => requirementRoleChange(e, index)}/>
                          </Row>
                          <Row>
                            <h4>University</h4>
                            <Select
                              mode="single"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please choose your university."
                              value={requirementsData[index].university} onChange={(e) => requirementUniversityChange(e, index)}
                            >
                              {universities.map((x)=>(<Option key={x}>{x}</Option>))}
                            </Select>
                          </Row>
                          <Row>
                            <h4>Department</h4>
                            <Select
                              mode="single"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please choose your department."
                              value={requirementsData[index].department} onChange={(e) => requirementDepartmentChange(e, index)}
                            >
                              {departments.map((x)=>(<Option key={x}>{x}</Option>))}
                            </Select>
                          </Row>
                          <Row>
                            <h4>Title</h4>
                            <Input value={requirementsData[index].title} onChange={(e) => requirementTitleChange(e, index)}/>
                          </Row>
                          <Row>
                            <h4>Interests</h4>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select at least one research interest"
                              value={requirementsData[index].interestAreas} onChange={(e) => requirementInterestsChange(e, index)}
                            >
                              {tags.map((x)=>(<Option key={x}>{x}</Option>))}
                            </Select>
                          </Row>
                          <Row style={{marginBottom:"16px"}}>
                            <Tag 
                              color="red"
                              style={{marginTop:"16px", cursor: "pointer"}}
                              onClick={e => handleDeleteRequirement(index)}
                            >
                              Remove Role
                            </Tag>
                          </Row>
                        </div>
                        )
                      }
                    </Form.Item>
                  </IndentedBlock>
                  <Form.Item
                    label={<FormLabel>Add Collaborators</FormLabel>}
                    name="collaborators"
                    rules={[{ required: false, message: "" }]}
                  >
                    <Select mode="tags" style={{ width: "100%" }} placeholder="Collabs">
                      {}
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

export default EditProject;
