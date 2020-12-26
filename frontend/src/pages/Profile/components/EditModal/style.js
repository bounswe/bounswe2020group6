import styled from "styled-components"
import {Modal, Button} from "antd"
import theme from "../../../../theme"

export const StyledModal = styled(Modal)`
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

export const ModalTitle = styled.h1`
  border-bottom: 3px solid ${theme.main.colors.sixth};
`;

export const ModalLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const ModalButton = styled(Button)`
  background-color: ${theme.main.colors.first};
  height: 40px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;

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

