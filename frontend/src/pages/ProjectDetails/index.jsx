import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../axios";
import moment from "moment";

import { Row, Col, Tag, Avatar, Spin, Button, Input, message, Popconfirm } from "antd";
import {
  UnlockFilled,
  FileOutlined,
  ClockCircleTwoTone,
  EditFilled,
  UsergroupAddOutlined,
  LockFilled,
  ExclamationOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { sendJoinRequest, sendBatchInviteRequest } from "../../redux/collaboration/api";
import Frame from "../../components/Frame";
import PrimaryButton from "../../components/PrimaryButton";
import SearchableTag from "../../components/SearchableTag";



import {
  H1,
  H3,
  H4,
  Main,
  DateSection,
  Tags,
  Summary,
  Deadlines,
  Files,
  FileContainer,
  FileDiv,
  Side,
  UserDiv,
  FadedText,
  UserModal,
  FadedDark,
  IndentedBlock,
} from "./style";
import theme from "../../theme";
import UserResult from "./components/UserResult";

const ProjectDetails = () => {
  // states
  const [loadingProject, setLoadingProject] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(-1);

  // get search
  const { Search } = Input;

  // define hooks
  const dispatch = useDispatch();
  const history = useHistory();
  
  // get project id
  const { projectId } = useParams();

  // get project data
  useEffect(() => {
    // project is loading
    setLoadingProject(true);
    // send get request for project data
    api({ sendToken: true })
      .get("/post/get/" + projectId + "/1")
      .then((response) => {
        // set project data
        setProjectData(response.data[0]);
        // project is loaded
        setLoadingProject(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectId]);

  // hangle remove collaborator from selected ones
  const handleRemoveCollab = (projectId, collabId) => {
    // project is loading
    setLoadingProject(true);
    api({ sendToken: true })
      .delete(`/collab/delete_collaborator/${projectId}/${collabId}`)
      .then((r) => {
        // send get request for project data
        api({ sendToken: true })
          .get("/post/get/" + projectId + "/1")
          .then((response) => {
            message.success(r.data.message);
            // set project data
            setProjectData(response.data[0]);
            // project is loaded
            setLoadingProject(false);
          })
          .catch((error) => {
            setLoadingProject(false);
            console.log(error);
          });
      })
      .catch((e) => {
        message.error(e.response.data.error);
        setLoadingProject(false);
      });
  };

  // displays the collaborators of the project
  const displayCollabs = () => {
    // get current user's id
    const currUserId = localStorage.getItem("userId");
    // check if it is owner
    const isOwner = projectData.userId === parseInt(currUserId);
    // get project owner
    var u = projectData.user;
    // render owner user's component
    var user = (
      <UserDiv key={0} onClick={() => redirectToProfile(projectData.userId)}>
        <Col>
          <Avatar size={64} src={u.profile_picture_url} />
        </Col>
        <Col style={{ paddingLeft: "15px" }}>
          <H3 style={{ margin: "auto" }}> {u.name + " " + u.surname}</H3>
          <FadedDark> {"Project Owner"} </FadedDark>
          <FadedText> {u.university} </FadedText>
          <FadedText> {u.department} </FadedText>
        </Col>
      </UserDiv>
    );

    // render rest of the user's components
    var collabs = projectData.project_collaborators.map((c, i) => {
      if (c.user === null) return "";

      return (
        <IndentedBlock key={i + 1}>
          <UserDiv key={i + 1} onClick={() => redirectToProfile(c.user_id)}>
            <Col>
              <Avatar size={48} src={c.user.profile_picture_url} />
            </Col>
            <Col style={{ paddingLeft: "15px" }}>
              <H3 style={{ margin: "auto" }}> {c.user.name + " " + c.user.surname}</H3>
              <FadedDark> {"Collaborator"} </FadedDark>
              <FadedText> {c.user.university} </FadedText>
              <FadedText> {c.user.department} </FadedText>
            </Col>
            <Col style={{ display: isOwner ? "block" : "none" }}>
              <Popconfirm
                placement="bottom"
                title={`Are you sure to remove ${c.user.name} ${c.user.surname} from this project?`}
                okType="danger"
                icon={<ExclamationOutlined style={{ color: "red", fontSize: "18px" }} />}
                onCancel={(e) => e.stopPropagation()}
                okText="Remove"
                onConfirm={(e) => {
                  e.stopPropagation();
                  handleRemoveCollab(projectData.id, c.user_id);
                }}
              >
                <CloseCircleOutlined
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: "crimson" }}
                />
              </Popconfirm>
            </Col>
          </UserDiv>
        </IndentedBlock>
      );
    });

    return [user, ...collabs];
  };

  // status map and corresponding color map
  const statusMap = ["Cancelled", "Completed", "In Progress", "Hibernating", "Team Building"];
  const statusColorMap = ["red", "green", "cyan", "purple", "volcano"];

  // determines the colors of the deadline bullets
  const deadlineColor = (deadline_str) => {
    // get deadline time
    var deadline = new Date(deadline_str);
    // get current time
    var today = new Date();

    // check if it is already passed
    // and determine a color accordingly
    if (today > deadline) {
      return "red";
    } else if (today < deadline) {
      return "yellowgreen";
    } else {
      return "orange";
    }
  };

  // redirect to a user profile
  const redirectToProfile = (profile_id) => {
    history.push({ pathname: "/profile/" + profile_id });
  };

  // downloads a file
  const downloadFile = (filename) => {
    // send get request to download
    api({ sendToken: true })
      .get("/file/get/" + projectId + "/" + filename)
      .then((response) => {
        // create an anchor element
        var element = document.createElement("a");
        // set attributes of anchor
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(response.data)
        );
        // set download attribute
        element.setAttribute("download", filename);
        // make element hidden
        element.style.display = "none";
        // add the element to the body
        document.body.appendChild(element);
        // click to the element to initiate the download
        element.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // check if user is collaborated on this project
  const isUserCollaboratesOnThisProject = () => {
    // get current user's id
    var myId = parseInt(localStorage.getItem("userId"));

    // if user id matches the project owner's return true
    if (projectData.userId === myId) {
      return true;
    }

    // if user is a collaborator in this project return true
    for (const c of projectData.project_collaborators) {
      if (c.user_id === myId) {
        return true;
      }
    }

    return false;
  };

  // check if the duedate exists
  const dueDateExists = () => {
    return projectData.project_milestones.filter((m) => m.title === "Due Date").length > 0;
  };

  // sends a join request
  const handleJoinRequest = () => {
    // get current user's id
    const myId = localStorage.getItem("userId");
    // send a join request
    dispatch(sendJoinRequest(myId, projectData.userId, projectData.id));
  };

  // sends an invite request
  const handleInviteRequest = () => {
    // get current user's id
    const myId = localStorage.getItem("userId");

    // get id list of the selected users
    const selected_id_list = selectedUsers.map((u) => {
      return u.id;
    });

    // send batch invite
    dispatch(sendBatchInviteRequest(myId, selected_id_list, projectData.id));

    setIsModalVisible(false);
  };

  // shows the user select modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // invites collaborators
  const inviteCollaborators = () => {
    // get current user's id
    const myId = parseInt(localStorage.getItem("userId"));

    // creates a request list for the collaborators
    const requestList = selectedUsers.map((u, i) => {
      return [
        myId,
        u.id,
        projectData.projectId,
        0, // inviting to collaborate
      ];
    });

    // prepare body of the request
    const body = {
      requests: requestList,
    };

    // send a post request for invitation
    api({ sendToken: true })
      .post("/collab/add_request", body)
      .then((response) => {
        //console.log(response)
      })
      .catch((error) => {
        //console.log(error)
      });

    // hide the modal
    setIsModalVisible(false);
  };

  // hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // handle user search in the modal
  const onSearch = (query) => {
    // send a get request to search user
    api({ sendToken: true })
      .get("/search", {
        params: {
          query: query,
          type: 0,
        },
      })
      .then((response) => {
        // set user results
        setUserResults(response.data.users);
        console.log(response.data.users);
      })
      .catch((error) => {
        //console.log(error)
      });
  };

  return (
    <Frame>
      <UserModal
        title="Invite Collaborators"
        visible={isModalVisible}
        onOk={inviteCollaborators}
        onCancel={handleCancel}
        okText="Invite"
        cancelText="Cancel"
        okButtonProps={{ backgroundColor: "red" }}
        cancelButtonProps={{ disabled: true }}
        bodyStyle={{
          maxHeight: "60vh",
          overflowY: "auto",
        }}
        footer={[
          <Button key="cancel" type="text" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="ok"
            type="text"
            style={{ color: theme.main.colors.first }}
            onClick={handleInviteRequest}
          >
            Invite
          </Button>,
        ]}
      >
        <Search placeholder="search user name" allowClear onSearch={onSearch} />
        <br />
        <br />
        {selectedUsers.length > 0 ? "Selected Users" : null}
        {selectedUsers.map((u, i) => {
          return (
            <>
              <UserResult
                img={u.profile_picture_url}
                name={u.name + " " + u.surname}
                department={u.department}
                university={u.university}
                selected={true}
                profileLink={() => history.push("/profile/" + u.id)}
                buttonClicked={() =>
                  setSelectedUsers((prev) => {
                    return prev.filter((item) => item.id !== u.id);
                  })
                }
              />
            </>
          );
        })}
        <br />
        Search Results
        {userResults.map((u, i) => {
          return Object.values(selectedUsers).includes(u) ? null : (
            <>
              <UserResult
                img={u.profile_picture_url}
                name={u.name + " " + u.surname}
                department={u.department}
                university={u.university}
                selected={false}
                buttonClicked={() =>
                  setSelectedUsers((prev) => {
                    return [...prev, u];
                  })
                }
              />
            </>
          );
        })}
      </UserModal>

      {loadingProject ? (
        <Main
          xs={{ span: 20, offset: 1 }}
          sm={{ span: 20, offset: 1 }}
          md={{ span: 20, offset: 1 }}
          lg={{ span: 12, offset: 5 }}
        >
          <Spin size="large" /> Content is Loading
        </Main>
      ) : (projectData.privacy === 0 || projectData.privacy === false) &&
        !isUserCollaboratesOnThisProject() ? ( // if it is private
        <>
          <Main
            xs={{ span: 20, offset: 1 }}
            sm={{ span: 20, offset: 1 }}
            md={{ span: 20, offset: 1 }}
            lg={{ span: 12, offset: 5 }}
          >
            <H1> {projectData.title} </H1>
            This Project is Private
          </Main>
          <Side lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
            <div style={{ width: "80%", marginBottom: "20px" }}>
              <PrimaryButton icon={<UsergroupAddOutlined />} onClick={handleJoinRequest}>
                Send Join Request
              </PrimaryButton>
            </div>
            <H4> Project Owner and Collaborators</H4>
            {displayCollabs()}
            <H4> Project Requirements </H4>
            {projectData.requirements}
          </Side>
        </>
      ) : (
        // if it is not private
        <>
          <Main
            xs={{ span: 20, offset: 1 }}
            sm={{ span: 20, offset: 1 }}
            md={{ span: 20, offset: 1 }}
            lg={{ span: 12, offset: 5 }}
          >
            <H1> {projectData.title} </H1>
            <DateSection>
              {projectData.privacy === 0 || projectData.privacy === false ? (
                <LockFilled />
              ) : (
                <UnlockFilled />
              )}
              Project Due{" "}
              {!(
                projectData.project_milestones === null ||
                projectData.project_milestones === undefined
              ) && projectData.project_milestones.length > 0
                ? moment(
                    projectData.project_milestones[projectData.project_milestones.length - 1].date
                  ).format("DD/MM/YYYY")
                : "Unknown"}
              <Tag
                color={statusColorMap[projectData.status]}
                style={{
                  marginLeft: "5px",
                }}
              >
                {statusMap[projectData.status]}
              </Tag>
            </DateSection>
            <Tags>
              {projectData.project_tags.map((t, i) => SearchableTag(t, i) )}
            </Tags>
            <Summary>
              <H3>Summary</H3>
              {projectData.summary}
            </Summary>
            {projectData.project_milestones.length > 0 ? (
              <Deadlines>
                <H3>Milestones</H3>
                {projectData.project_milestones.map((dl, i) => {
                  return (
                    <p key={i}>
                      <ClockCircleTwoTone
                        twoToneColor={deadlineColor(dl.date)}
                        style={{ fontSize: "12px", marginRight: "8px" }}
                      />
                      {moment(dl.date).format("DD/MM/YYYY")} &nbsp;&nbsp;
                      {dl.title}
                      <br />
                      {dl.description}
                    </p>
                  );
                })}
              </Deadlines>
            ) : (
              ""
            )}
            <Files>
              <H3>
                Project Files &nbsp;
                {isUserCollaboratesOnThisProject() ? (
                  <EditFilled
                    style={{ cursor: "pointer" }}
                    onClick={(e) => history.push("/project/editfiles/" + projectId)}
                  />
                ) : (
                  ""
                )}
              </H3>

              <FileContainer style={{}}>
                {projectData.project_files.length > 0 ? (
                  projectData.project_files.map((f, i) => {
                    return (
                      <FileDiv
                        key={i}
                        onClick={() => setSelectedFile(i)}
                        download={f.file_name}
                        style={{ backgroundColor: selectedFile === i ? "#AAD2BA" : "transparent" }}
                      >
                        <FileOutlined style={{ fontSize: "28px" }} /> {f.file_name}
                      </FileDiv>
                    );
                  })
                ) : (
                  <div style={{ color: "grey", marginTop: "28px" }}>No Files To Display</div>
                )}
              </FileContainer>
              {selectedFile === -1 || selectedFile === null ? (
                ""
              ) : (
                <Col>
                  <Row style={{ marginTop: "16px" }}>
                    <Tag
                      color="green"
                      style={{ cursor: "pointer" }}
                      onClick={(e) =>
                        downloadFile(projectData.project_files[selectedFile].file_name)
                      }
                    >
                      Download File
                    </Tag>
                  </Row>
                </Col>
              )}
            </Files>
            <div style={{ height: "50px" }} />
          </Main>
          <Side lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
            {isUserCollaboratesOnThisProject() ? (
              <div style={{ width: "80%", marginBottom: "20px" }}>
                <PrimaryButton
                  icon={<EditFilled />}
                  onClick={(e) => history.push("/project/edit/" + projectId)}
                >
                  Edit Project
                </PrimaryButton>
                <br />
                <br />
                <PrimaryButton icon={<UsergroupAddOutlined />} onClick={() => showModal()}>
                  Invite Collaborators
                </PrimaryButton>
              </div>
            ) : (
              <div style={{ width: "80%", marginBottom: "20px" }}>
                <PrimaryButton icon={<UsergroupAddOutlined />} onClick={handleJoinRequest}>
                  Send Join Request
                </PrimaryButton>
              </div>
            )}
            <H4> Project Owner and Collaborators</H4>
            {displayCollabs()}
            <H4> Project Requirements </H4>
            {projectData.requirements}
          </Side>
        </>
      )}
    </Frame>
  );
};

export default ProjectDetails;
