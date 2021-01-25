import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo } from "../../redux/profile/api";

import { Spin, Menu } from "antd";
import {
  GoogleOutlined,
  DesktopOutlined,
  ContainerOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { Layout, NameText, Img } from "./style";
import GoogleScholarModal from "../GoogleScholarModal";
import { projectsClickedAction } from "../../redux/profile/actions";

import defaultProfilePictureHref from "../../assets/asset_hrefs";

const ProfileSider = () => {
  const profile = useSelector((state) => state.profile.profile);
  const profileLoading = useSelector((state) => state.profile.profileLoading);
  const [googleScholarModalVisible, setGoogleScholarModalVisible] = useState(
    false
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    var myId = localStorage.getItem("userId");
    dispatch(getProfileInfo(myId));
  }, [dispatch]);

  const toogleGoogleScholarModal = () => {
    setGoogleScholarModalVisible((prev) => !prev);
  };

  return (
    <Layout>
      <GoogleScholarModal
        visible={googleScholarModalVisible}
        toggleGoogleScholarModal={toogleGoogleScholarModal}
      />
      {profileLoading || !profile ? (
        <Spin size="large" style={{ margin: "auto" }} />
      ) : (
        <>
          <Img
            style={{ height: "90px", width: "90px" }}
            src={
              profile.profile_picture_url === null ||
              profile.profile_picture_url === undefined
                ? defaultProfilePictureHref
                : profile.profile_picture_url
            }
            alt="profile photo"
          />
          <NameText>{profile.name + " " + profile.surname}</NameText>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              href="#"
              style={{
                textAlign: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <img style={{ height: "20px" }} src="/cactus.png" alt="cactus" />
              {profile.upCounts === null || profile.upCounts === undefined
                ? " " + 0
                : " " + profile.upCounts}
            </div>
            <Menu style={{ marginTop: "24px" }} mode="inline" theme="dark">
              <Menu.Item
                key="1"
                onClick={toogleGoogleScholarModal}
                icon={<GoogleOutlined />}
              >
                Google Scholar
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  dispatch(projectsClickedAction());
                  history.push("/profile/" + profile.id);
                }}
                icon={<DesktopOutlined />}
              >
                Projects
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => history.push("/project")}
                icon={<ContainerOutlined />}
              >
                Create New Project
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => history.push("/event/create")}
                icon={<CalendarOutlined />}
              >
                Create New Event
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => history.push("/events")}
                icon={<UnorderedListOutlined />}
              >
                Events
              </Menu.Item>
            </Menu>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProfileSider;
