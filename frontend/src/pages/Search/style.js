import styled from "styled-components";
import { Layout, Col } from "antd";

export const Content = styled(Layout)`
  height: 100vh;
  background: white;
  `;

export const Main = styled(Col)` 
  @media only screen and (max-width: 768px) {
    margin-top: 50px;
  }
  
  @media only screen and (min-width: 768px) {
    margin-top: 60px;
  }
`;

export const H1 = styled.h1` 
  color: #4E4E4E;
  margin-bottom: 0;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    margin-top: 24px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 32px;
    margin-top: 32px;
  }
`;

export const H2 = styled.h2`  
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    margin: 18px auto;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 24px;
    margin: 24px auto;
  }
`;

export const H3 = styled.h3` 
  text-align: left;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
    margin: 8px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-left: 10px;
  }
`;

export const FilterButton = styled.div`
  height: 70px;
  width: 70%;
  padding: 5px 0;
  border-radius: 10px;
  background-color: beige;
`;