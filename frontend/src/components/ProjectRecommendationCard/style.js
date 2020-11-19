import styled from "styled-components";
import { Row } from "antd";

export const Layout = styled(Row)`
`;

export const Title = styled.p`
  margin: 0;
  padding-left: 0;
  text-align: left;
  font-weight: 500;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.15);

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 12px;
  }
`;

export const Tags = styled.p`
  margin: 0;
  padding-left: 10px;
  font-weight: 500;
  text-align: left;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

