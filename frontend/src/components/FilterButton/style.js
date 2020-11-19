import styled from "styled-components";
import theme from "../../theme";
import { Col } from "antd";

export const Layout = styled(Col)`
  height: 70px;
  padding: 5px 15px;
  margin: 0 15px;
  border-radius: 10px;
  background-color: ${theme.main.colors.fourth};
  opacity: 0.7;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 12px;
`;

export const ButtonText = styled.h1`
  margin: 0;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;