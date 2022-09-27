import axios from "axios";

export default axios.create({
  baseURL: "http://206.189.91.54/",
  headers: {
    "Content-type": "application/json; charset=utf-8",
  }
});