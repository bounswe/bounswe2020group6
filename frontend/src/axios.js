import axios from "axios";

export default function api(config) {
  config = config === undefined ? {} : config;
  let jwtToken;
  if (config.sendToken) {
    jwtToken = localStorage.getItem("token");
  }
  const defaultConfig = {
    baseURL: "http://ec2-18-232-99-241.compute-1.amazonaws.com:3000",
    headers: config.sendToken && { Authorization: `Bearer ${jwtToken}` },
  };
  return axios.create(defaultConfig);
}
