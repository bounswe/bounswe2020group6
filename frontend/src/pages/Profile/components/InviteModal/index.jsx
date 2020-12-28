import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Select } from "antd";

import { sendInviteRequest } from "../../../../redux/collaboration/api";
import { getProjectsOfMe } from "../../../../redux/profile/api";
import { StyledModal, ModalTitle, ModalLabel, ModalButton } from "./style";

const { Option } = Select;

const InviteModal = ({ visible, toggleInviteModal }) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [requestLoading, setRequestLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInvite = (values) => {
    const myId = localStorage.getItem("userId");
    dispatch(sendInviteRequest(myId, id, values.projectId));
    setRequestLoading(true);
    setTimeout(() => {
      setRequestLoading(false);
      toggleInviteModal();
    }, 1000);
  };

  useEffect(() => {
    dispatch(getProjectsOfMe());
    // eslint-disable-next-line
  }, []);

  const myProjects = useSelector((state) => state.profile.myProjects);

  return (
    <StyledModal footer={null} visible={visible} onCancel={toggleInviteModal}>
      <ModalTitle>Invite User</ModalTitle>
      <Form onFinish={handleInvite} layout="vertical">
        <Form.Item
          label={<ModalLabel>Choose a Project</ModalLabel>}
          name="projectId"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please choose a project!" }]}
        >
          <Select
            showSearch
            mode="single"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please choose a project to invite"
            onSelect={() => setButtonDisabled(false)}
            onClear={() => setButtonDisabled(true)}
          >
            {myProjects.map((p) => (
              <Option key={p.id}>{p.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <ModalButton loading={requestLoading} disabled={buttonDisabled} htmlType="submit">
            Invite
          </ModalButton>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default InviteModal;
