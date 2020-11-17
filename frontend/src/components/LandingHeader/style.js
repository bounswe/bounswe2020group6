import styled from "styled-components";
import theme from "../../theme";
import { Layout, Col, Modal } from "antd";

export const LoginModal = styled(Modal)`
  left: 160px;

  @media only screen and (max-width: 700px) {
    left: 0;
  }

  .ant-modal-content {
    border-radius: 15px;
    padding: 0 18px;
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

export const LoginTitle = styled.h1`
  border-bottom: 3px solid ${theme.main.colors.sixth};
`;

export const LoginLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const Nav = styled(Col)`
  text-align: center;
  margin-top: 6px;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    color: ${theme.main.colors.sixth};
  }
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

export const LogoDock = styled.div`
  position: relative;
  z-index: 2;
  height: 80px;
  width: 100%;
  background-color: ${theme.main.colors.second};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  line-height:2em;
`;

export const Logo = styled.img`
  display: block;
  display: flex;
  margin:auto;
  height: 2em;
`;

export const LoginButton = styled.button`
  background-color: ${theme.main.colors.first};
  height: 40px;
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
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
