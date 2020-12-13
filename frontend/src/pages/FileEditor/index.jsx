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

import { Input } from "antd";

const { TextArea } = Input;

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
      {name: "milestone1.txt", url: "#"},
      {name: "milestone2.txt", url: "#"},
      {name: "milestone3.txt", url: "#"}
    ]
  }
  const fileData = {
    filename: "milestone1.txt",
    contents: "Milestone 1 Deadlines\n\n1. First deadline\n2. Second deadline\n3. Third deadline"
  }
  return (
    <Frame>
      <Main
        xs={{span: 20, offset: 1}}
        sm={{span: 20, offset: 1}}
        md={{span: 20, offset: 1}}
        lg={{span: 12, offset: 5}}> 
        <H2> Edit Files for "{data.title}" </H2>
        <H4> &lt; Return to Project </H4>
        <br />
        <H4> Edit "{fileData.filename}" </H4>
        <TextArea 
        rows={16} 
        defaultValue={fileData.contents}
        style={
          {fontFamily: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace"}
        }
        />
      </Main>
      <Side
        lg={{span: 7, offset: 0}}
        xl={{span: 7, offset: 0}}> 
        <H3>Browse Files</H3>
        <Files>
          <FileContainer>
            {data.files.map((f,i) => {
              return <FileDiv>
                <FileOutlined style={{fontSize: "28px"}}/> {f.name}
              </FileDiv>
            })}
          </FileContainer>
        </Files>
      </Side>
    </Frame>
  );
};

export default ProjectDetails;

