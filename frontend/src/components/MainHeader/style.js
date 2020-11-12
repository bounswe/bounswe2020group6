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

  :hover {
    color: ${theme.main.colors.sixth};
  }
`;

export const SearchBar = styled(Input)`
  width: 100%;
  margin-top: 28px;
`;

export const SideBarIcon = styled(Col)`
  text-align: center;
  margin-left: -70px;
  margin-top: 8px;
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
