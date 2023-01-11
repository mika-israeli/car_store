import axios from "axios";
const BASE_URL = "http://localhost:6000";
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json",
      "auth-token": token,
    },
    withCredentials: true,
  });
};
