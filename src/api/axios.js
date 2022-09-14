import axios from "axios";

// Django backend
const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error["response"]["data"]["code"] === "token_not_valid") {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        axiosInstance
          .post("token/refresh/", {
            refresh: refreshToken,
          })
          .then((response) => {
            console.log("New access token issued");
            const accessToken = response["data"]["access"];
            localStorage.setItem("access_token", accessToken);
            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + accessToken;
          })
          .catch((error) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login/";
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
