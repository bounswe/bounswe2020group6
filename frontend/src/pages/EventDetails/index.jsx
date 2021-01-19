import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../axios";
import moment from "moment";

import { Row, Col, Tag, Avatar, Spin, Button, Input } from "antd";
import {
  UnlockFilled,
  FileOutlined,
  ClockCircleTwoTone,
  EditFilled,
  UsergroupAddOutlined,
  LinkOutlined,
  LockFilled,
  PushpinOutlined,
  PushpinTwoTone,
} from "@ant-design/icons";
import { sendJoinRequest, sendBatchInviteRequest } from "../../redux/collaboration/api";
import Frame from "../../components/Frame";
import PrimaryButton from "../../components/PrimaryButton";
import {
  H1,
  H2,
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

// src: https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
function NewlineText(text) {
  return text.split('\n').map(s => <>{s}<br/></>)  
}


const EventDetails = () => {

  const eventData = {
    eventId: 5,
    userId: 3,
    eventType: 'Rave Party',
    tags: ['Ankara', 'Birds of Mind'],
    isPublic: true,
    eventTitle: 'MONGO B-Party',
    eventBody: 'Come join us at Rave Istanbul to enjoy this unique and action-packed party that will have you on your feet all night long! Be prepared for unexpected surprise acts, packed events, and a wild adventure that will have you dancing and jumping until the end of the night!\n\nFriday, June 6th:\n10:00 PM: WELCOME\n10:30 PM: Rave Party\nMidnight: Foam Shower\n\nOrganized by Kusadasi Spring Festival',
    eventLink: 'https://www.raveparty.com/',
    location: 'Osmanbey / ISTANBUL',
    date: '06/06/2021',
    other: 'Strimg',
  }
  const dispatch = useDispatch();
	 
  const [loadingProject, setLoadingProject] = useState(true);
  //const [projectData, setProjectData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(-1);
  const { Search } = Input;

  const { projectId } = useParams()
  const history = useHistory()

  var myId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    setLoadingProject(true)
    api({sendToken: true})
    .get("/post/get/" + projectId + "/1")
    .then((response) => {
      //setProjectData(response.data[0])
      setLoadingProject(false)
      //console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [projectId]);



  const deadlineColor = (deadline_str) => {
    var deadline = new Date(deadline_str);
    var today = new Date();
    if (today > deadline) {
      return "red"
    }
    else if(today < deadline){
      return "yellowgreen"
    }
    else{
      return "orange"
    }
  }

  return (  
    
    <Frame>
      {
      (loadingProject) ?  
        <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}>
          <Spin size="large" /> Content is Loading
        </Main>
        :
        <>
        <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}> 
        <H1> {eventData.eventTitle} </H1>
        <H2> {eventData.eventType} </H2>
        <DateSection>
          {!(eventData.date == undefined | eventData.date == null) ? (
              <span>
                <ClockCircleTwoTone
                  twoToneColor={deadlineColor(eventData.date)}
                  style={{ fontSize: "12px", marginRight: "8px" }}
                />
                {moment(eventData.date).format("DD/MM/YYYY")} &nbsp;
              </span>
            ) : (
              <></>
          )}
          <br/>
          {!(eventData.location == undefined | eventData.location == null) ? (
            <span>
              <PushpinTwoTone
                twoToneColor={'firebrick'}
                style={{ fontSize: "12px", marginRight: "8px" }}
              />
              {eventData.location} &nbsp;
            </span>
          ) : (
            <></>
          )}
        </DateSection>
        <Tags>
        {eventData.tags.map((t, i) => {
          return (
            <Tag key={i} style={{ color: "grey" }}>
            {" "}
            {t}{" "}
            </Tag>
          );
          })}
          </Tags>
          <Summary>
            <H2>Description</H2>
            {NewlineText(eventData.eventBody)}
          </Summary>
          <div
            style={{height: "50px"}}
          />
        </Main>
        <Side lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
          {
            myId == eventData.userId ? (
            <div style={{ width: "80%", marginBottom: "20px" }}>
              <PrimaryButton
              icon={<EditFilled />}
              onClick={(e) => history.push("/event/edit/" + projectId)}
              >
              Edit Event
              </PrimaryButton>
            </div>
            ) : (
            <div style={{ width: "80%", marginBottom: "20px" }}>
              <PrimaryButton icon={<UsergroupAddOutlined />} onClick={e=>(null /**TODO */)}>
              Save Event
              </PrimaryButton>
            </div>
            )
          }
          <a 
            href={eventData.eventLink} title={eventData.eventLink}
            target='_blank'
          >
            <H4> Visit Webpage <LinkOutlined /></H4>
          </a>
        </Side>
      </>
      }
    </Frame>
  );
};

export default EventDetails;
