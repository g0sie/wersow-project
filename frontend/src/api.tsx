import axios from "axios";

const instance = axios.create({
  baseURL: "https://wersow-api.herokuapp.com/",
  timeout: 10000,
});

export default instance;
