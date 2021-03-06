import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import theme from "../../theme";

const Spinner = ({ size }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size, color: theme.main.colors.first }} spin />
  );
  return <Spin indicator={antIcon} />;
};

export default Spinner;
