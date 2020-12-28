import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Divider, Tag, List, Avatar, Card, Input, Form, Upload, message } from "antd";
import {
  PaperClipOutlined,
  GoogleOutlined,
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  EditOutlined,
  EditFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import {
  getProfileInfo,
  changeBio,
  getProjectsOfUser,
  changePicture,
} from "../../redux/profile/api";
import { scrolledToProjectsAction } from "../../redux/profile/actions";
import { getFollowing, follow, unfollow, addUp, removeUp } from "../../redux/follow/api";
import MainHeader from "../../components/MainHeader";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import EditModal from "./components/EditModal";
import InviteModal from "./components/InviteModal";
import theme from "../../theme";

import { Image, Content, NumbersCol, Scrollable, SectionTitle, SectionCol } from "./style";

import defaultProfilePictureHref from "../../assets/asset_hrefs";

const Profile = () => {
  const history = useHistory();
  const projectsRef = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [editPictureVisible, setEditPictureVisible] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const profile = useSelector((state) => state.profile.profile);
  const profileLoading = useSelector((state) => state.profile.profileLoading);
  const projects = useSelector((state) => state.profile.projects);
  const followings = useSelector((state) => state.follow.following);

  const scrollToProjects = useSelector((state) => state.profile.scrollToProjects);

  const pictureLoading = useSelector((state) => state.profile.pictureLoading);

  const isOwnProfile = () => {
    const userId = localStorage.getItem("userId");
    return userId === id;
  };

  const alreadyFollowing = // eslint-disable-next-line
    !isOwnProfile() && followings && followings.filter((f) => f.following.id == id).length > 0;

  useEffect(() => {
    if (scrollToProjects) {
      projectsRef.current.scrollIntoView();
      dispatch(scrolledToProjectsAction());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getProfileInfo(id));
    dispatch(getProjectsOfUser(id));
    if (!isOwnProfile()) {
      dispatch(getFollowing());
    }
    // eslint-disable-next-line
  }, [id]);

  const handleFollow = () => {
    if (alreadyFollowing) {
      dispatch(unfollow(id));
    } else {
      dispatch(follow(id));
    }
  };

  const handleAddUp = () => {
    dispatch(addUp(id));
  };

  const handleRemoveUp = () => {
    dispatch(removeUp(id));
  };

  const toggleEditModal = () => {
    setEditModalVisible((prev) => !prev);
  };

  const toggleInviteModal = () => {
    setInviteModalVisible((prev) => !prev);
  };

  // picture upload functions

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return false;
  }

  const handlePictureChange = ({ fileList }) => {
    const file = fileList[fileList.length - 1];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return;
    }
    let formData = new FormData();
    formData.append("avatar", file.originFileObj);

    dispatch(changePicture(formData, id));
  };

  const ProfileLoadingSpinner = () => {
    return (
      <Row style={{ height: "150px", width: "150px" }} justify="center" align="middle">
        <Col>
          <Spinner size={80} />
        </Col>
      </Row>
    );
  };
  const handleEditBio = () => {
    setIsEditingBio((prev) => !prev);
  };

  const handleChangeBio = (bio) => {
    dispatch(changeBio(id, bio));
    setIsEditingBio((prev) => !prev);
  };

  if (profileLoading || !profile) {
    return (
      <>
        <MainHeader />
        <Content>
          <Row style={{ height: "100vh" }} justify="center" align="middle">
            <Col>
              <Spinner size={200} />
            </Col>
          </Row>
        </Content>
      </>
    );
  }

  return (
    <div>
      <EditModal profile={profile} visible={editModalVisible} toggleEditModal={toggleEditModal} />
      <InviteModal visible={inviteModalVisible} toggleInviteModal={toggleInviteModal} />
      <MainHeader />
      <Content>
        <Row style={{ marginTop: "90px", padding: "16px" }}>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setEditPictureVisible(true)}
            onMouseLeave={() => setEditPictureVisible(false)}
          >
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handlePictureChange}
              disabled={!isOwnProfile()}
            >
              <div style={{ width: "100%" }}>
                {pictureLoading ? (
                  <ProfileLoadingSpinner />
                ) : (
                  <>
                    <EditFilled
                      style={{
                        display: isOwnProfile() ? (editPictureVisible ? "block" : "none") : "none",
                        position: "absolute",
                        right: "20%",
                        fontSize: "20px",
                        color: theme.main.colors.sixth,
                      }}
                    />
                    <Image
                      src={
                        profile.profile_picture_url === null ||
                        profile.profile_picture_url === undefined
                          ? defaultProfilePictureHref
                          : profile.profile_picture_url
                      }
                    />
                  </>
                )}
              </div>
            </Upload>
          </Col>
          <Col sm={10} lg={6} xl={6}>
            <Row
              style={{ fontSize: "28px", fontWeight: "500" }}
            >{`${profile.name} ${profile.surname}`}</Row>
            <Row style={{ margin: "10px 0" }} align="middle">
              {profile.isUpped ? (
                <MinusCircleTwoTone
                  twoToneColor={theme.main.colors.first}
                  onClick={handleRemoveUp}
                  style={{
                    marginRight: "10px",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <PlusCircleTwoTone
                  twoToneColor={theme.main.colors.first}
                  onClick={handleAddUp}
                  style={{
                    marginRight: "10px",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
              )}
              <img style={{ height: "20px" }} src="/cactus.png" alt="cactus" />
              <span style={{ marginLeft: "3px", fontSize: "20px" }}>
                {profile.upCounts === null || profile.upCounts === undefined
                  ? " " + 0
                  : " " + profile.upCounts}
              </span>
            </Row>
            <Row>
              <div style={{ fontWeight: 500 }}>{profile.university}</div>
            </Row>
            <Row>
              <div style={{ fontWeight: 500 }}>
                <div>{`${profile.department}`}</div>
                <div>{`${profile.title !== null ? profile.title : ""}`}</div>
              </div>
            </Row>
          </Col>
          <NumbersCol xs={24} sm={24} lg={12} xl={12}>
            <Row style={{ height: "100%" }} align="middle">
              <Col span={24}>
                <Row justify="space-around">
                  <Col>
                    <span style={{ fontWeight: 600 }}>{projects ? projects.length : 0}</span>{" "}
                    publications
                  </Col>
                  {isOwnProfile() ? (
                    <Col
                      onClick={() => history.push("/list/followers")}
                      style={{ cursor: "pointer" }}
                    >
                      <span style={{ fontWeight: 600 }}>{profile.followerCount}</span> followers
                    </Col>
                  ) : (
                    <Col>
                      <span style={{ fontWeight: 600 }}>{profile.followerCount}</span> followers
                    </Col>
                  )}
                  {isOwnProfile() ? (
                    <Col
                      onClick={() => history.push("/list/following")}
                      style={{ cursor: "pointer" }}
                    >
                      <span style={{ fontWeight: 600 }}>{profile.followingCount}</span> following
                    </Col>
                  ) : (
                    <Col>
                      <span style={{ fontWeight: 600 }}>{profile.followingCount}</span> following
                    </Col>
                  )}
                </Row>
                <Row style={{ height: "40px" }} />
                <Row justify="center">
                  {isOwnProfile() ? (
                    <Col xs={10} sm={8} md={6}>
                      <PrimaryButton onClick={toggleEditModal} icon={<FormOutlined />}>
                        Edit
                      </PrimaryButton>
                    </Col>
                  ) : (
                    <>
                      <Col xs={10} sm={8} md={7}>
                        <PrimaryButton
                          icon={alreadyFollowing ? <CloseOutlined /> : <CheckOutlined />}
                          onClick={handleFollow}
                        >
                          {alreadyFollowing ? "Unfollow" : "Follow"}
                        </PrimaryButton>
                      </Col>
                      <Col xs={10} sm={8} md={7} offset={4}>
                        <PrimaryButton icon={<UsergroupAddOutlined />} onClick={toggleInviteModal}>
                          Invite
                        </PrimaryButton>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </NumbersCol>
        </Row>

        <Divider orientation="left" />
        <Row style={{ padding: "4px 16px", fontWeight: 500 }}>
          <Col span={24} md={12}>
            <Row>
              <SectionTitle>Interest Areas</SectionTitle>
            </Row>
            <Row>
              <Col span={24} style={{ marginTop: "10px" }}>
                {profile &&
                  profile.user_interests.map((tag, i) => (
                    <Tag key={i} closable={false}>
                      {tag.interest}
                    </Tag>
                  ))}
              </Col>
            </Row>
          </Col>
          <Col style={{ height: "20px", width: "1px" }} xs={24} sm={24} md={0} />
          <Col span={24} md={12}>
            <Row>
              <SectionTitle>About Me</SectionTitle>
            </Row>
            <Row>
              <Col span={24} style={{ marginTop: "10px" }}>
                <Card
                  actions={isOwnProfile() ? [<EditOutlined onClick={handleEditBio} />] : null}
                  style={{ minHeight: "100px", width: "100%" }}
                >
                  {!isEditingBio ? (
                    profile.bio ? (
                      profile.bio
                    ) : (
                      <span style={{ color: "rgba(0,0,0,0.4)" }}>No biography added yet</span>
                    )
                  ) : (
                    <Form onFinish={handleChangeBio}>
                      <Form.Item name="bio">
                        <Input.TextArea
                          style={{ padding: 0 }}
                          bordered={false}
                          defaultValue={
                            profile.bio ? (
                              profile.bio
                            ) : (
                              <span style={{ color: "rgba(0,0,0,0.4)" }}>
                                No biography added yet
                              </span>
                            )
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Row justify="end">
                          <Col sm={8} md={8} lg={6} xl={4}>
                            <PrimaryButton htmlType="submit" style={{ marginRight: "40px" }}>
                              Save
                            </PrimaryButton>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form>
                  )}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="left" />
        <Row>
          <SectionCol xs={24} sm={24} md={{ span: 10, offset: 1 }}>
            <SectionTitle>Projects</SectionTitle>
            <Scrollable ref={projectsRef}>
              <List
                itemLayout="horizontal"
                dataSource={projects}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/project/details/${item.id}`)}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<PaperClipOutlined />} />}
                      title={item.title}
                      description=          {
                        item.summary === undefined || item.summary === null 
                        ? ""
                        : item.summary.length > 100 
                          ? item.summary.substring(0,100) + "..."
                          : item.summary
                      }
                    />
                  </List.Item>
                )}
              />
            </Scrollable>
          </SectionCol>
          <SectionCol xs={24} sm={24} md={{ span: 10, offset: 2 }}>
            <SectionTitle>
              <span>Google Scholar Projects</span>
              {profile.citations && (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    marginLeft: "40px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {profile.citations}
                  </span>
                  {` citations`}
                </span>
              )}
            </SectionTitle>
            <Scrollable>
              <List
                itemLayout="horizontal"
                dataSource={profile.projects ? JSON.parse(profile.projects) : []}
                renderItem={(item) => (
                  <List.Item style={{ cursor: "pointer" }}>
                    <List.Item.Meta
                      onClick={() => window.open(profile.scholar_profile_url, "_blank")}
                      avatar={<Avatar icon={<GoogleOutlined twoToneColor="#eb2f96" />} />}
                      title={item.title}
                      description={item.venue}
                    />
                  </List.Item>
                )}
              />
            </Scrollable>
          </SectionCol>
        </Row>
      </Content>
    </div>
  );
};

export default Profile;
