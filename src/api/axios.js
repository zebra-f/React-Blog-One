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

// used just in case of infinite recursive request-response cycle
let responseCount = 0;
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error["response"]["data"]["code"] === "token_not_valid") {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const Buffer = require("buffer/").Buffer;
        const tokenParts = JSON.parse(
          Buffer.from(refreshToken.split(".")[1], "base64").toString()
        );
        const tokenExpiration = tokenParts.exp;
        // tokenExp is expressed in seconds while now() in milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenExpiration > now && responseCount < 4) {
          responseCount++;
          return axiosInstance
            .post("token/refresh/", {
              refresh: refreshToken,
            })
            .then((response) => {
              responseCount = 0;
              // console.log("New access token has been issued");
              const accessToken = response["data"]["access"];
              localStorage.setItem("access_token", accessToken);
              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + accessToken;
            })
            .catch((error) => {
              // pass
              // this part of the code will never be reached
            });
        } else {
          responseCount = 0;
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("logged_in");
          localStorage.removeItem("email");
          axiosInstance.defaults.headers["Authorization"] = null;
          window.location.href = "/login/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
