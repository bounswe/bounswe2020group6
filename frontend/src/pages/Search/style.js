import styled from "styled-components";
import { Layout, Col } from "antd";

export const Content = styled(Layout)`
  height: 100vh;
  background: white;
  `;

export const Main = styled(Col)` 
  margin-top: 60px;
`;

export const H1 = styled.h1` 
  color: #4E4E4E;
  font-size: 32px;
  margin-top: 32px;
  margin-bottom: 0;
`;

export const H2 = styled.h2` 
  font-size: 24px;
  margin: 24px auto;
`;

export const H3 = styled.h3` 
  font-size: 18px;
  color: white;
  margin: 24px;
`;
