import styled from "styled-components";
import { Row, Button } from "antd";
import theme from "../../theme";

export const Layout = styled(Row)`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 2px 0;

  border-image: 
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0,0,0,0.15), 
      rgba(0, 0, 0, 0)
    ) 1 1;

  h1 {
    font-size: 12px;
    margin: auto 0;
    padding: auto 0;
  }

  p {
    font-size: 11px;
    margin: auto 0;
    padding: auto 0;
  }

  span {
    color: ${theme.main.colors.first};
    text-decoration: none;
  }

  span:hover 
  {
    color: inherit;
    text-decoration:none; 
    cursor:pointer;  
  }

  i {
    font-size: 18px;
    padding: 0 3px;
    color: black;
  }
`;

export const NotifButton = styled(Button).attrs({
  type: "text"
})`
  height: 36px;
  font-size: 14px;
  margin: 3px 10px;

  border: solid 1px  ${theme.main.colors.first + "60"};  

  &:hover{
    background-color: ${props => props.action === "accept" ? theme.main.colors.second : theme.main.colors.sixth};
    border: solid 1px ${theme.main.colors.first + "60"};
  }

  &:focus{
    border: solid 1px ${theme.main.colors.first + "60"};
  }

  .ant-btn:not([disabled]):hover {
    text-decoration: inherit;
}
`;