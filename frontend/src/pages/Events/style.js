import styled from "styled-components";
import { Layout, Col } from "antd";

export const Content = styled(Layout)`
  height: 100vh;
  background: white;
`;

export const Main = styled(Col)`
  margin-top: 0px;

  @media only screen and (min-width: 500px) {
    padding: 0 50px;
  }
  @media only screen and (min-width: 600px) {
    padding: 0 100px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0 150px;
  }
`;

export const StHref = styled.a`
  color: #000000d9;
  &:hover {
    color: #548d5d;
  }
`;

export const H1 = styled.h1`
  color: #4e4e4e;
  margin-bottom: 0;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    margin-top: 24px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 32px;
    margin-top: 32px;
  }
`;

export const H2 = styled.h2`
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    margin: 18px auto;
  }

  @media only screen and (min-width: 768px) {
    font-size: 24px;
    margin: 24px auto;
  }
`;

export const H3 = styled.h3`
  text-align: left;
  margin-top: 32px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
    margin: 8px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 14px;
    margin-left: 10px;
  }
`;

export const FilterButton = styled.div`
  height: 70px;
  width: 70%;
  padding: 5px 0;
  border-radius: 10px;
  background-color: beige;
`;
