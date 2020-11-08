import styled from "styled-components";
import theme from "../../theme";
import { Layout } from "antd";

export const footerStyle = {
  backgroundColor: theme.main.colors.third,
  height: "200px",
};

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
`;
