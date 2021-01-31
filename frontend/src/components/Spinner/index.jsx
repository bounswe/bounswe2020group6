import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import theme from "../../theme";

// generic spinner, style comes from style.js
const Spinner = ({ size }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size, color: theme.main.colors.first }} spin />
  );
  return <Spin indicator={antIcon} />;
};

export default Spinner;
