import React from "react";
import { ThemedButton } from "./style";

const PrimaryButton = (props) => {
  return <ThemedButton {...props}>{props.children}</ThemedButton>;
};

export default PrimaryButton;
