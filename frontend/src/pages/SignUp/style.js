import styled from "styled-components";
import theme from "../../theme";
import { Button } from "antd";

export const footerStyle = {
  backgroundColor: theme.main.colors.third,
  height: "200px",
};

export const Content = styled.div`
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;

  @media only screen and (max-width: 600px) {
    background-position: initial;
  }

  @media only screen and (max-width: 600px) {
    max-width: 80%;
    margin: auto;
  }

  @media only screen and (min-width: 600px) {
    padding-bottom: 100px;
  }
`;

export const FormWrapper = styled.div`
  @media only screen and (max-width: 700px) {
    left: 0;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${theme.main.colors.sixth};
  }

  .ant-checkbox-checked::after {
    border-color: ${theme.main.colors.sixth};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${theme.main.colors.sixth};
    border-color: ${theme.main.colors.sixth};
  }

  .ant-input,
  .ant-input-affix-wrapper {
    border-radius: 20px;

    :hover {
      border-color: ${theme.main.colors.first};
    }
  }
  .ant-input-affix-wrapper .ant-input {
    border-radius: 0;
  }
`;

export const FormTitle = styled.h1`
  border-bottom: 3px solid ${theme.main.colors.sixth};
`;

export const FormLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const FormButton = styled(Button)`
  background-color: ${theme.main.colors.first};
  height: 50px;
  width: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 10px;
  border-color: ${theme.main.colors.first} !important;
  cursor: pointer;
  border: none;
  float: right;

  :focus {
    outline: none;
    background: ${theme.main.colors.first} !important;
    border-color: ${theme.main.colors.first} !important;
  }

  :active {
    outline: none;
    background: ${theme.main.colors.first} !important;
    border-color: ${theme.main.colors.first} !important;
  }

  :hover {
    color: ${theme.main.colors.sixth};
    background-color: ${theme.main.colors.first};
    border-color: ${theme.main.colors.first} !important;
  }
`;

export const ConfirmButton = styled.button`
  background-color: ${theme.main.colors.first};
  height: 80px;
  width: 180px;
  text-align: center;
  line-height: 80px;
  font-size: 32px;
  font-family: Rasa;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;

  :focus {
    outline: none;
  }

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;
