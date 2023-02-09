import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://wersow-api.herokuapp.com/"
    : "http://127.0.0.1:8000/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default instance;
