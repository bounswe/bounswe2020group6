import axios from "axios";

export default function api(config) {
  config = config === undefined && {};
  let jwtToken;
  if (config.sendToken) {
    jwtToken = localStorage.getItem("token");
  }
  return axios.create({
    baseURL: "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000",
    headers: config.sendToken && { Authorization: `Bearer ${jwtToken}` },
  });
}
