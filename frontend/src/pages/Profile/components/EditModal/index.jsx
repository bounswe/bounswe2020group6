import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, Form, Input, Select } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import theme from "../../../../theme";
import { infoUpdate } from "../../../../redux/profile/api";
import {
  getDepartments,
  getTags,
  getTitles,
  getUniversities,
  addTitle,
  addUniversity,
  addDepartment,
  addTag,
} from "../../../../redux/choices/api";

import { StyledModal, ModalTitle, ModalLabel, ModalButton } from "./style";

const { Option } = Select;

const EditModal = ({ profile, visible, toggleEditModal }) => {
  const { id } = useParams();
  const [addedItemName, setAddedItemName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUniversities());
    dispatch(getTags());
    dispatch(getDepartments());
    dispatch(getTitles());
    // eslint-disable-next-line
  }, []);

  const tags = useSelector((state) => state.choices.tags);
  const universities = useSelector((state) => state.choices.universities);
  const departments = useSelector((state) => state.choices.departments);
  const titles = useSelector((state) => state.choices.titles);

  const handleEditProfile = (values) => {
    dispatch(
      infoUpdate(
        {
          affiliation: {
            university: values.university,
            department: values.department,
            title: values.title,
          },
          researchAreas: values.interests,
        },
        id
      )
    );
    toggleEditModal();
  };

  const addUniversityHandler = () => {
    dispatch(addUniversity(addedItemName));
    setAddedItemName("");
  };

  const addDepartmentHandler = () => {
    dispatch(addDepartment(addedItemName));
    setAddedItemName("");
  };

  const addTitleHandler = () => {
    dispatch(addTitle(addedItemName));
    setAddedItemName("");
  };

  const addTagHandler = () => {
    dispatch(addTag(addedItemName));
    setAddedItemName("");
  };

  const adderDropdown = (itemAddHandler) => (menu) => (
    <div>
      {menu}
      <Divider style={{ margin: "4px 0" }} />
      <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
        <Input
          style={{ flex: "auto" }}
          value={addedItemName}
          onChange={(e) => setAddedItemName(e.target.value)}
        />
        <div
          style={{ flex: "none", padding: "8px", display: "block", cursor: "pointer" }}
          onClick={itemAddHandler}
        >
          <PlusCircleTwoTone twoToneColor={theme.main.colors.first} /> Add item
        </div>
      </div>
    </div>
  );
  return (
    <StyledModal footer={null} visible={visible} onCancel={toggleEditModal}>
      <ModalTitle>Edit Profile</ModalTitle>
      <Form
        initialValues={{
          university: profile && profile.university,
          department: profile && profile.department,
          title: profile && profile.title,
          interests: profile && profile.user_interests.map((i) => i.interest),
        }}
        onFinish={handleEditProfile}
        layout="vertical"
      >
        <Form.Item
          label={<ModalLabel>University</ModalLabel>}
          name="university"
          style={{ width: "50%" }}
          rules={[{ required: true, message: "Please enter your university!" }]}
        >
          <Select
            dropdownRender={adderDropdown(addUniversityHandler)}
            showSearch
            mode="single"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please choose your university."
          >
            {universities.map((x) => (
              <Option key={x}>{x}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<ModalLabel>Department</ModalLabel>}
          name="department"
          style={{ width: "50%" }}
          rules={[{ required: true, message: "Please enter your department!" }]}
        >
          <Select
            dropdownRender={adderDropdown(addDepartmentHandler)}
            showSearch
            mode="single"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please choose your department."
          >
            {departments.map((x) => (
              <Option key={x}>{x}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={<ModalLabel>Title</ModalLabel>} name="title" style={{ width: "50%" }}>
          <Select
            dropdownRender={adderDropdown(addTitleHandler)}
            showSearch
            mode="single"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please choose your title."
          >
            {titles.map((x) => (
              <Option key={x}>{x}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<ModalLabel>Research area interests</ModalLabel>}
          name="interests"
          rules={[{ required: true, message: "Please select at least one area of interest!" }]}
        >
          <Select
            dropdownRender={adderDropdown(addTagHandler)}
            showSearch
            mode="tags"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select at least one research interest"
          >
            {tags.map((x) => (
              <Option key={x}>{x}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <ModalButton htmlType="submit">Save</ModalButton>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default EditModal;
