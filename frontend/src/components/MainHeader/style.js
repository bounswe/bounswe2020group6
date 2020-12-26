import styled from "styled-components";
import theme from "../../theme";
import { Layout, Col, Input } from "antd";

export const Nav = styled(Col)`
  text-align: right;
  margin-top: 6px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

export const Anchor = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 3px;

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;

export const SearchBar = styled(Input)`
  width: 100%;
  margin-top: 28px;
  border-radius: 10px;
`;

export const SideBarIcon = styled(Col)`
  position: fixed;
  top: 16px;
  left: 16px;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  z-index: 12;

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;

export const SideBar = styled.div`
  position: absolute;
  left: ${(props) => (props.visible ? "0" : "-80vw")};
  z-index: 11;
  height: 100vh;
  width: 70vw;
  background-color: ${theme.main.colors.second};

  transition: left 0.5s ease-in-out;
`;

export const SideBarMenu = styled.div`
  margin-top: 100px;
`;

export const SideBarItem = styled.div`
  margin: 10px 40px;
  color: white;
  font-size: 32px;
  font-weight: 600;

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;

export const Header = styled(Layout.Header)`
  width: 100%;
  background-color: ${theme.main.colors.first};
`;

export const LogoText = styled.h1`
  margin: 0;
  padding: 0;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    font-family: Philosopher;
    font-size: 32px;
    color: white;
  }
`;
