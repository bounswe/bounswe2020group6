import styled from "styled-components";
import theme from "../../theme";

export const Layout = styled.button`
  height: 70px;
  width: 100%;
  border: 0px;
  padding: 5px 15px;
  margin-left: 5px;
  border-radius: 10px 0 0 10px;
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