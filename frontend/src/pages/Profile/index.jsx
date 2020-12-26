import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Divider, Tag, List, Avatar } from "antd";
import {
  PaperClipOutlined,
  TeamOutlined,
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";

import { getProfileInfo } from "../../redux/profile/api";
import { getFollowing, follow, unfollow, addUp, removeUp } from "../../redux/follow/api";
import MainHeader from "../../components/MainHeader";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import EditModal from "./components/EditModal";
import theme from "../../theme";

import { Image, Content, NumbersCol, Scrollable, SectionTitle, SectionCol } from "./style";

import defaultProfilePictureHref from "../../assets/asset_hrefs";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [editModalVisible, setEditModalVisible] = useState(false);

  const profile = useSelector((state) => state.profile.profile);
  const profileLoading = useSelector((state) => state.profile.profileLoading);
  const followings = useSelector((state) => state.follow.following);

  const isOwnProfile = () => {
    const userId = localStorage.getItem("userId");
    return userId === id;
  };

  const alreadyFollowing = // eslint-disable-next-line
    !isOwnProfile() && followings && followings.filter((f) => f.following.id == id).length > 0;

  useEffect(() => {
    dispatch(getProfileInfo(id));
    if (!isOwnProfile()) {
      dispatch(getFollowing());
    }
    // eslint-disable-next-line
  }, [id]);

  const data = [
    {
      title: "Ant Design Title 1",
      description: "",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

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
      <MainHeader />
      <Content>
        <Row style={{ marginTop: "90px", padding: "16px" }}>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Image
              src={
                profile.profile_picture_url === null || profile.profile_picture_url === undefined
                  ? defaultProfilePictureHref
                  : profile.profile_picture_url
              }
            />
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
              <div style={{ fontWeight: 500 }}>{`${profile.department} ${
                profile.title !== null ? profile.title : ""
              }`}</div>
            </Row>
          </Col>
          <NumbersCol xs={24} sm={24} lg={12} xl={12}>
            <Row style={{ height: "100%" }} align="middle">
              <Col span={24}>
                <Row justify="space-around">
                  <Col>
                    <span style={{ fontWeight: 600 }}>0</span> publications
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 600 }}>{profile.followerCount}</span> followers
                  </Col>
                  <Col>
                    <span style={{ fontWeight: 600 }}>{profile.followingCount}</span> following
                  </Col>
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
                        <PrimaryButton icon={<FormOutlined />}>Invite</PrimaryButton>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </NumbersCol>
        </Row>

        <Divider orientation="left" />
        <Row style={{ padding: "16px", fontWeight: 500 }}>
          <Col md={4}>
            <Row>
              <SectionTitle>Interest Areas</SectionTitle>
            </Row>
            <Row>
              <Col style={{ marginTop: "10px" }}>
                {profile &&
                  profile.user_interests.map((tag, i) => (
                    <Tag key={i} closable={false}>
                      {tag.interest}
                    </Tag>
                  ))}
              </Col>
            </Row>
          </Col>
          <SectionCol xs={24} sm={24} md={{ span: 9, offset: 1 }}>
            <SectionTitle>Projects</SectionTitle>
            <Scrollable>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<PaperClipOutlined />} />}
                      title={item.title}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Scrollable>
          </SectionCol>
          <SectionCol xs={24} sm={24} md={{ span: 9, offset: 1 }}>
            <SectionTitle>Collaborations</SectionTitle>
            <Scrollable>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ color: "yelow" }}
                          icon={<TeamOutlined twoToneColor="#eb2f96" />}
                        />
                      }
                      title={item.title}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
