import styled from "styled-components";
import theme from "../../theme";
import { Col } from "antd";

export const Main = styled(Col)` 
  padding: 20px;

  @media only screen and (max-width: 768px) {
    padding-top: 30px;
  }

  @media only screen and (min-width: 768px) {
    padding-top: 50px;
  }
`; 

export const Side = styled(Col)`
  padding: 0 30px;

  @media only screen and (max-width: 768px) {
    margin-top: 42px;
  }

  @media only screen and (min-width: 768px) {
    border-left: solid 2px black; 
    margin-top: 70px;
    border-image:
    linear-gradient(
      to bottom, 
      rgba(255,255,255,1),
      rgba(107,143,113,0.5), 
      rgba(255,255,255,1)
    ) 1 85%;
  }
`;

export const DateSection = styled.p` 
  color: grey;
`; 

export const Tags = styled.div` 
  margin-top: 30px;
`; 

export const Summary = styled.div` 
  margin-top: 30px;
`; 

export const Deadlines = styled.div` 
  margin-top: 30px;
`; 

export const Files = styled.div` 
  margin-top: 30px;
`; 

export const FileContainer = styled.div` 
  border: solid 2px #E4E4E4;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  
  @media only screen and (min-width: 768px) {
    width: 80%;
  }
`; 

export const UserDiv = styled(Col)` 
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
`; 

export const FileDiv = styled.a`
  display: flex;
  flex-direction: row; 
  align-items: center;
  fontsize: 16px;
  padding: 5px 10px;
  cursor: pointer;
  color: black;

  &:hover{
    background-color: #efefef;
  }
`; 

export const H1 = styled.h1` 
  color: ${theme.main.colors.first};
  margin-bottom: 0;

  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 36px;
  }
`;

export const H2 = styled.h2`  
  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

export const H3 = styled.h3` 
  text-align: left;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const H4 = styled.h4` 
  text-align: left;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

export const FadedText = styled.p` 
  margin: auto;
  padding: auto;
  text-align: left;
  color: grey;

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 12px;
  }
`;