import styled from "styled-components";
import theme from "../../theme";
import { Button } from "antd";

export const ThemedButton = styled(Button)`
  background-color: ${theme.main.colors.first};
  height: 40px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;

  :focus {
    outline: none;
    color: white;
    background-color: ${theme.main.colors.sixth};
    border-color: ${theme.main.colors.sixth} !important;
  }

  :active {
    outline: none;
    color: white;
    background-color: ${theme.main.colors.sixth};
    border-color: ${theme.main.colors.sixth} !important;
  }

  :hover {
    color: white;
    background-color: ${theme.main.colors.sixth};
    border-color: ${theme.main.colors.sixth} !important;
  }
`;
