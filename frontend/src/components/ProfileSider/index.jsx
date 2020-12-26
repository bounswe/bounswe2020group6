import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo } from "../../redux/profile/api";

import { Spin, Menu } from "antd";
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from "@ant-design/icons";
import { Layout, NameText, Img } from "./style";

import defaultProfilePictureHref from "../../assets/asset_hrefs";

const ProfileSider = () => {
  const profile = useSelector((state) => state.profile.profile);
  const profileLoading = useSelector((state) => state.profile.profileLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    var myId = localStorage.getItem("userId");
    dispatch(getProfileInfo(myId));
  }, [dispatch]);

  return (
    <Layout>
      {profileLoading || !profile ? (
        <Spin size="large" style={{ margin: "auto" }} />
      ) : (
        <>
          <Img
            style={{ height: "90px", width: "90px" }}
            src={
              profile.profile_picture_url === null || profile.profile_picture_url === undefined
                ? defaultProfilePictureHref
                : profile.profile_picture_url
            }
            alt="profile photo"
          />
          <NameText>{profile.name + " " + profile.surname}</NameText>
          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Google Scholar
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Projects
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => history.push("/project")}
                icon={<ContainerOutlined />}
              >
                Create New Project
              </Menu.Item>
            </Menu>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProfileSider;
