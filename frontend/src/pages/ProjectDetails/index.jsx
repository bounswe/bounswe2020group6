import React, {} from "react";

import { Col, Tag, Avatar } from "antd";
import { UnlockFilled, PlusOutlined, FileOutlined} from "@ant-design/icons";
import Frame from "../../components/Frame";
import {
  H1,H2,H3,H4,
  Main,
  Date,
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

const ProjectDetails = () => {
  const data = {
    title: "Logistic Regression for Bicycle Manufacturers",
    tags: ["Mechanics", "Computer Science", "Statistics", "Artificial Intelligence", "Machine Learning"],
    summary: "The purpose of this article is to provide researchers, editors, and readers with a set of guidelines for what to expect in an article using logistic regression techniques. Tables, figures, and charts that should be included to comprehensively assess the results and assumptions to be verified are discussed.",
    deadlines: [{"date": "04 March, 2021", "desc": "Baseline results"}, {"date": "24 December, 2021", "desc": "Application Deadline for IOCON 2021"}],
    duedate: "Due 06 July, 2021",
    requirements: "Here is the requirements.",
    collaborators: [
      {name: "Jens Søgaard", institution: "L’institut des Ponts et des", degree: "Chassures CS MSc", photo: null},
      {name: "Fahrad Fahraini", institution: "Technische Insitut München", degree: "Botanic Sciences MSc", photo: null}
    ],
    files: [
      {name: "milestone1.pdf", url: "#"},
      {name: "milestone2.pdf", url: "#"},
      {name: "milestone3.pdf", url: "#"}
    ]
  }

  return (
    <Frame>
      <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}> 
        <H1> {data.title} </H1>
        <Date><UnlockFilled /> {data.duedate} </Date>
        <Tags>
          {data.tags.map((t, i) => {return <Tag key={i} style={{color: "grey"}}> {t} </Tag>})}
        </Tags>
        <Summary>
          <H3>Summary</H3>
          {data.summary}
        </Summary>
        <Deadlines>
          <H3>Deadlines</H3>
          {data.deadlines.map((dl, i) => {
            return <p key={i}>
              -{dl.date}
              <br/>
              {dl.desc}
            </p>
          })}
        </Deadlines>
        <Files>
          <H3>Browse Files</H3>
          <FileContainer>
            {data.files.map((f,i) => {
              return <FileDiv>
                <FileOutlined style={{fontSize: "28px"}}/> {f.name}
              </FileDiv>
            })}
          </FileContainer>
        </Files>
      </Main>
      <Side
        md={0}
        lg={{span: 7, offset: 0}}
        xl={{span: 7, offset: 0}}> 
      <H4> Project Owner and Collaborators</H4>
      {data.collaborators.map((c,i) => {
        return <UserDiv>
          <Col>
            <Avatar size={64} src={c.photo}/>
          </Col>
          <Col style={{paddingLeft: "15px"}}>
            <H3 style={{margin: "auto"}}> {c.name} <PlusOutlined /></H3> 
            <FadedText> {c.institution} </FadedText>
            <FadedText> {c.degree} </FadedText>
          </Col>
        </UserDiv>
      })}

      <H4> Project Requirements </H4>
      {data.requirements}
      </Side>
    </Frame>
  );
};

export default ProjectDetails;

