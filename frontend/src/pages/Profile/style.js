import styled from "styled-components";
import theme from "../../theme";
import { Col } from "antd";

export const Image = styled.img`
  height: 150px;
  border: solid 4px ${theme.main.colors.first};
  border-radius: 50%;
`;

export const Scrollable = styled.div`
  overflow: auto;
  height: 300px;
  margin-top: 10px;
  box-shadow: 0 -1em 1em -1em black inset;
  padding: 10px;

  .ant-avatar {
    background-color: ${theme.main.colors.second} !important;
  }
`;

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Content = styled.div`
  padding: 0 80px;

  @media only screen and (max-width: 600px) {
    padding: 0 20px;
  }
`;

export const NumbersCol = styled(Col)`
  font-size: 20px;

  @media only screen and (max-width: 992px) {
    margin-top: 16px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`;

export const SectionCol = styled(Col)`
  @media only screen and (max-width: 768px) {
    margin: 20px 0;
  }
`;