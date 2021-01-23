import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../axios";
import moment from "moment";

import { Tag, Spin, message } from "antd";
import {
  ClockCircleTwoTone,
  EditFilled,
  LinkOutlined,
  PushpinTwoTone,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import Frame from "../../components/Frame";
import PrimaryButton from "../../components/PrimaryButton";
import {
  H1,
  H2,
  H4,
  Main,
  DateSection,
  Tags,
  Summary,
  Side,
} from "./style";

// src: https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
function NewlineText(text) {
  return text.split('\n').map((s, i) => <span key={i}>{s}<br/></span>)  
}


const EventDetails = () => {
	 
  const [loadingProject, setLoadingProject] = useState(true);
  const [eventData, setEventData] = useState({});

  const { eventId } = useParams()
  const history = useHistory()

  var myId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    setLoadingProject(true)
    api({sendToken: true})
    .get("/event/event/" + eventId)
    .then((response) => {
      setEventData(response.data.result)
      setLoadingProject(false)
    }).catch((error) => {
      //history.goBack()
    })
  }, [eventId, history]);

  const handleFav = () => {
    api({sendToken: true})
    .post("/event/fav/", {id:eventData.id})
    .then((response) => {
      message.success("Event added to favorites.", 4);
      setEventData({...eventData, isFavable: false})
    }).catch((error) => {
      message.error("Event couldn't be added to favorites.", 4);
    })
  }

  const handleUnfav = () => {
    api({sendToken: true})
    .post("/event/unfav/", {id:eventData.id})
    .then((response) => {
      message.success("Event removed from favorites.", 4);
      setEventData({...eventData, isFavable: true})
    }).catch((error) => {
      message.error("Event couldn't be removed from favorites.", 4);
    })
  }

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
        <H1> {eventData.title} </H1>
        <H2> {eventData.type} </H2>
        <DateSection>
          {!(eventData.date === undefined | eventData.date === null) ? (
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
          {!(eventData.location === undefined | eventData.location === null) ? (
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
        {eventData.event_tags.map((t, i) => {
          return (
            <Tag key={i} style={{ color: "grey" }}>
            {" "}
            {t.tag}{" "}
            </Tag>
          );
          })}
          </Tags>
          <Summary>
            <H2>Description</H2>
            {NewlineText(eventData.body)}
          </Summary>
          {eventData.other !== undefined && eventData.other !== null && eventData.other !== ""
          ?
          <Summary>
            <H2>Additional Notes</H2>
            {NewlineText(eventData.other)}
          </Summary>
          :
          <></>
          }
          <div
            style={{height: "50px"}}
          />
        </Main>
        <Side lg={{ span: 7, offset: 0 }} xl={{ span: 7, offset: 0 }}>
          {
            myId === eventData.userId ? (
            <div style={{ width: "80%", marginBottom: "20px" }}>
              <PrimaryButton
              icon={<EditFilled />}
              onClick={(e) => history.push("/event/edit/" + eventId)}
              >
              Edit Event
              </PrimaryButton>
            </div>
            ) : (
              eventData.isFavable
              ?
                <div style={{ width: "80%", marginBottom: "20px" }}>
                  <PrimaryButton icon={<AppstoreAddOutlined />} onClick={handleFav}>
                    Save Event
                  </PrimaryButton>
                </div>
              :
                <div style={{ width: "80%", marginBottom: "20px" }}>
                  <PrimaryButton icon={<AppstoreAddOutlined />} onClick={handleUnfav}>
                    Unsave Event
                  </PrimaryButton>
                </div>
            )
          }
          {eventData.link !== undefined && eventData.link !== null && eventData.link !== ""
          ?
          <a 
            href={eventData.link} title={eventData.link}
            target='_blank'
            rel="noreferrer"
          >
            <H4> Visit Webpage <LinkOutlined /></H4>
          </a>
          :
          <></>
          }
        </Side>
      </>
      }
    </Frame>
  );
};

export default EventDetails;
