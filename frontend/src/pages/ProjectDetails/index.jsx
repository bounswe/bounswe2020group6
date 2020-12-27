import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../axios";

import { Col, Tag, Avatar, Spin } from "antd";
import { UnlockFilled, PlusOutlined, FileOutlined, ClockCircleTwoTone} from "@ant-design/icons";
import Frame from "../../components/Frame";
import {
  H1,H3,H4,
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
} from "./style";
import theme from "../../theme";

const ProjectDetails = () => {

  const [loadingProject, setLoadingProject] = useState(true);
  const [projectData, setProjectData] = useState(null);

  const { projectId } = useParams()
  const history = useHistory()

  useEffect(() => {
    setLoadingProject(true)
    api({sendToken: true})
    .get("/post/get/" + projectId + "/1")
    .then((response) => {
      setProjectData(response.data[0])
      setLoadingProject(false)
      //console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [projectId]);

  const displayCollabs = () => {
    var u = projectData.user
    var user = (<UserDiv key={0} onClick={() => redirectToProfile(projectData.userId)}>
    <Col>
        <Avatar size={64} src={u.profile_picture_url}/>
      </Col>
      <Col style={{paddingLeft: "15px"}}>
        <H3 style={{margin: "auto"}}> {u.name + " " + u.surname} <PlusOutlined /></H3> 
        <FadedText> {u.university} </FadedText>
        <FadedText> {u.department} </FadedText>
      </Col>
    </UserDiv>)

    var collabs = projectData.project_collaborators.map((c,i) => {
      return (<UserDiv key={i+1} onClick={() => redirectToProfile(c.id)}>
        <Col>
          <Avatar size={64} src={c.profile_picture_url}/>
        </Col>
        <Col style={{paddingLeft: "15px"}}>
          <H3 style={{margin: "auto"}}> {c.name + " " + c.surname} <PlusOutlined /></H3> 
          <FadedText> {c.university} </FadedText>
          <FadedText> {c.department} </FadedText>
        </Col>
      </UserDiv>)
    })

    return [user, ...collabs]
  }

  const statusMap = ["cancelled", "completed", "in progress", "team building", "hibernating"]
  const statusColorMap = ["red", "green", "cyan", "purple", "volcano"]

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

  const redirectToProfile = (profile_id) => {
    history.push({ pathname: "/profile/" + profile_id })
  }

  const downloadFile = (filename) => {
    api({sendToken: true})
    .get("/file/get/" + projectId + "/" + filename)
    .then((response) => {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
    }).catch((error) => {
      console.log(error)
    })
  }

  const isUserCollaboratesOnThisProject = () => {
    
    var myId = parseInt(localStorage.getItem("userId"));

    if(projectData.userId === myId){
      return true
    }

    for (const c of projectData.project_collaborators){
      if(c.id === myId){
        return true
      }
    } 

    return false
  }

  const collaborationButton = () => {
    var tagData = {
      clicked: null,
      text: null
    }
    
    if(isUserCollaboratesOnThisProject()){
      // invite collaborators
      tagData.clicked = () => console.log("hi")
      tagData.text = "invite collaborators"
    }
    else{
      // request join
      tagData.clicked = () => requestJoin()
      tagData.text = "request join"
    }

    return <Tag 
    color={theme.main.colors.first} 
    style={{
      marginLeft: "5px",
      cursor: "pointer",
      userSelect: "none"
    }}
    onClick={tagData.clicked}>
      {tagData.text}
    </Tag>
  }

  const requestJoin = () => {
    const myId = parseInt(localStorage.getItem("userId"));

    const data = {
      project: projectData.projectId,
      requester: myId,
      requested: projectData.userId,
      type: 1 // wants to join
    }

    const body = {
      requests: [
        [
          data.requester,
          data.requested,
          data.project,
          data.type
        ]
      ]
    }    

    api({ sendToken: true })
    .post("/collab/add_request", body)
    .then((response) => {
      //console.log(response)
    })
    .catch((error) => {
      //console.log(error)
    })
  }


  return (  
    
    <Frame>
      {
      (loadingProject) ?  <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}>
          <Spin size="large" /> Content is Loading
        </Main>:
      (((projectData.privacy === 1) && !isUserCollaboratesOnThisProject()) ? // if it is private
      <>
      <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}> 
        <H1> {projectData.title} </H1>
        This Project is Private
      </Main>
      <Side
        lg={{span: 7, offset: 0}}
        xl={{span: 7, offset: 0}}> 
      <H4> Project Owner and Collaborators</H4>
      {displayCollabs()}
      </Side>
      </>
      : // if it is not private
      <>
      <Main
      xs={{span: 20, offset: 1}}
      sm={{span: 20, offset: 1}}
      md={{span: 20, offset: 1}}
      lg={{span: 12, offset: 5}}> 
      <H1> {projectData.title} </H1>
      <DateSection>
        <UnlockFilled /> 
        Project Due {projectData.project_milestones[0] || "Unknown"} 
        <Tag 
        onClick={() => console.log("hi")}
        color={statusColorMap[projectData.status]} 
        style={{
          marginLeft: "5px",
          cursor: "pointer"
        }}>
          {statusMap[projectData.status]}
        </Tag>

        {collaborationButton()}

      </DateSection>
      <Tags>
        {projectData.project_tags.map((t, i) => {return <Tag key={i} style={{color: "grey"}}> {t.tag} </Tag>})}
      </Tags>
      <Summary>
        <H3>Summary</H3>
        {projectData.summary}
      </Summary>
      <Deadlines>
        <H3>Deadlines</H3>
        {projectData.project_milestones.map((dl, i) => {
          return <p key={i}>
            <ClockCircleTwoTone twoToneColor={deadlineColor(dl.date)} style={{ fontSize: "12px" }}/> 
            {dl.date}
            <br/>
            {dl.desc}
          </p>
        })}
      </Deadlines>
      <Files>
        <H3>Browse Files</H3>
        <FileContainer>
          {projectData.project_files.map((f,i) => {
            return <FileDiv
             key={i} 
             onClick={() => downloadFile(f.file_name)}
             
             download={f.file_name}
             >
              <FileOutlined style={{fontSize: "28px"}}/> {f.file_name}
            </FileDiv>
          })}
        </FileContainer>
      </Files>
    </Main>
      <Side
        lg={{span: 7, offset: 0}}
        xl={{span: 7, offset: 0}}> 
      <H4> Project Owner and Collaborators</H4>
      {displayCollabs()}
      <H4> Project Requirements </H4>
      {projectData.requirements}
      </Side>
      </>)
      }
    </Frame>
  );
};

export default ProjectDetails;

