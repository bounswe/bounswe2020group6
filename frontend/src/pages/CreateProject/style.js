import styled from "styled-components";
import { Layout } from "antd";
import theme from "../../theme";

export const Content = styled(Layout)`
  height: 100vh;
  background: white;
  .ant-radio-checked .ant-radio-inner {
    border-color: ${theme.main.colors.sixth} !important ;
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: ${theme.main.colors.sixth};
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: ${theme.main.colors.sixth};
  }
`;

export const FormTitle = styled.h2`
  color: solid ${theme.main.colors.sixth};
`;

export const FormLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const FormButton = styled.button`
  background-color: ${theme.main.colors.first};
  height: 50px;
  width: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  float: right;

  :focus {
    outline: none;
  }

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;
