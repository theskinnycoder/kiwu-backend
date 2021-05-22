import axios from "axios";

axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json;odata.metadata=full",
  "Content-Type": "application/json",
};

axios.defaults.baseURL = "http://localhost:4000/api";

export default axios;
