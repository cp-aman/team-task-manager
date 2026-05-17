import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-3dc7.up.railway.app/api",
});


// automatically attach token
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;