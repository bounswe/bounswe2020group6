import styled from "styled-components";
import theme from "../../theme";
import { Layout, Col, Modal } from "antd";

export const footerStyle = {
  backgroundColor: theme.main.colors.third,
  height: "200px",
};

export const LoginModal = styled(Modal)`
  left: 160px;

  .ant-modal-content {
    border-radius: 15px;
    padding: 0 18px;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: sandybrown;
  }

  .ant-checkbox-checked::after {
    border-color: sandybrown;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: sandybrown;
    border-color: sandybrown;
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
  border-bottom: 3px solid sandybrown;
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
    color: sandybrown;
  }
`;

export const Header = styled(Layout.Header)`
  width: 100%;
  background-color: ${theme.main.colors.first};
`;

export const Logo = styled.div`
  position: relative;
  z-index: 10;
  height: 80px;
  width: 100%;
  background-color: ${theme.main.colors.second};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 600;
  font-size: 16px;
`;

export const CtaButton = styled.button`
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

  :hover {
    color: sandybrown;
  }
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

  :hover {
    color: sandybrown;
  }
`;
