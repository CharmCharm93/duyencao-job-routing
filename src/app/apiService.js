import axios from "axios";

const apiService = axios.create({
  baseURL: "https://my-json-server.typicode.com/CharmCharm93/db-demo-joblist",
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start request", request);
    return request;
  },
  function (error) {
    console.log("Request ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default apiService;
