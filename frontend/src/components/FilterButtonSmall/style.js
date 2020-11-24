import styled from "styled-components";
import theme from "../../theme";

export const Layout = styled.button`
  height: 50px;
  width: 50px;
  border: 0px;
  padding: auto;
  margin-left: 5px;
  margin-top: 5px;
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