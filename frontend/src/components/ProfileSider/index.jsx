import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileInfo } from "../../redux/profile/api";

import { Spin } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import {
  Layout,
  NameText,
  Title,
  Img
} from "./style";

const ProfileSider = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const dispatch = useDispatch();

  const myId = 1

  useEffect(() => {
    dispatch(profileInfo(myId , setProfileData, setLoading))
  },[dispatch]);

  return (
    <Layout>
      {
        loading ? <Spin size="large" style={{ margin: "auto" }}/> : <>
        <Img src={profileData.profile_picture_url === null ? "https://britz.mcmaster.ca/images/nouserimage.gif/image" : profileData.profile_picture_url} alt="profile photo"/>
        <NameText>{profileData.name + " " + profileData.surname}</NameText>
        <div style={{width: "70%", display: "flex", flexDirection: "column"}}>
        <div href="#" style={{textAlign: "center", color: "white", cursor: "pointer"}}>
          <RocketOutlined style={{fontSize: 20, color: "green"}}/> 
          {profileData.number_of_ups === null ? " " + 0 + " UPs" : " " + profileData.number_of_ups + " ups"}
        </div>
        <Title href={profileData.scholar_profile_url}>Google Scholar</Title>
        <Title>Projects</Title>
      </div>
        </>
      }
    </Layout>
  );
};

export default ProfileSider;
