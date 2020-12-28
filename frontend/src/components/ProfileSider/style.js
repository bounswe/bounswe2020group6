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

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

export const Title = styled.a` 
  font-size: 18px;
  color: white;
  text-align: center;
  margin: 1em 0;
`;

export const NameText = styled.p` 
  font-size: 18px;
  color: white;
  margin-top: 1em;
`;

export const Img = styled.img` 
  margin-top: 2.5em;
  border: 4px solid ${theme.main.colors.first};
  border-radius: 50%;

  @media only screen and (min-width: 992px) {
    height: 120px;
    width: 120px;
  }

  @media only screen and (min-width: 1200px) {
    height: 160px;
    width: 160px;
  }
`;