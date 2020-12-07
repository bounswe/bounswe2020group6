import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profileInfo } from "../../redux/profile/api";

import { Spin } from "antd";
import { Layout, NameText, Title, Img } from "./style";

const ProfileSider = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    var myId = localStorage.getItem("userId");
    dispatch(profileInfo(myId, setProfileData, setLoading));
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <Spin size="large" style={{ margin: "auto" }} />
      ) : (
        <>
          <Img
            style={{ height: "90px", width: "90px" }}
            src={
              profileData.profile_picture_url === null
                ? "https://britz.mcmaster.ca/images/nouserimage.gif/image"
                : profileData.profile_picture_url
            }
            alt="profile photo"
          />
          <NameText>{profileData.name + " " + profileData.surname}</NameText>
          <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>
            <div
              href="#"
              style={{
                textAlign: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <img style={{ height: "20px" }} src="cactus.png" alt="cactus" />
              {profileData.number_of_ups === null ? " " + 0 : " " + profileData.number_of_ups}
            </div>
            <Title href={profileData.scholar_profile_url}>Google Scholar</Title>
            <Title>Projects</Title>
            <Title onClick={() => history.push("/project")}>Create New Project</Title>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ProfileSider;
