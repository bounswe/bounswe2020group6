import styled from "styled-components";
import theme from "../../theme";
import { Col } from "antd";

export const Layout = styled(Col)`
  background-color: ${theme.main.colors.third};
  padding-top: 60px;
  height: 100%;
  width: 18%;
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h3` 
  font-size: 18px;
  color: white;
  margin: 1em;
`;

export const NameText = styled.p` 
  font-size: 18px;
  color: white;
  margin-top: 1em;
`;

export const Img = styled.img` 
  height: 160px;
  width: 160px;
  margin-top: 2.5em;
  border: 4px solid ${theme.main.colors.first};
  border-radius: 50%;
`;