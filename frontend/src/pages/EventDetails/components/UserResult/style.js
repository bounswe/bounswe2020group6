import styled from "styled-components";
import { Row } from "antd";

export const Layout = styled(Row)`
  border-bottom: 1px solid rgba(0,0,0,0.15);
  padding-top: 1.2em;
`;

export const Title = styled.p`
  margin: 0;
  padding-left: 1em;
  font-weight: 500;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const Info = styled.p`
margin: 0;
padding-left: 1em;
color: #8E8585;
font-weight: 300;
font-size: 14px;

@media only screen and (max-width: 768px) {
  font-size: 12px;
}

@media only screen and (min-width: 768px) {
  font-size: 14px;
}
`;

export const Summary = styled.p`
  margin: 0;
  padding-left: 1em;
  font-weight: 300;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

export const Footer = styled.p`
  margin: 0;
  color: #8E8585;
  font-weight: 300;
  text-align: right;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

export const TopNote = styled.p`
  margin: 0;
  color: #8E8585;
  font-weight: 300;
  text-align: right;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  
  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

