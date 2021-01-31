import React from "react";
import { ThemedButton } from "./style";

// this is our styled generic primary green button, styling comes from the style.js file
const PrimaryButton = (props) => {
  return <ThemedButton {...props}>{props.children}</ThemedButton>;
};

export default PrimaryButton;
