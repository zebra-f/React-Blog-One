import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios";

function Logout() {
  const navigate = useNavigate();

  const logout = axiosInstance
    .post("/user/logout/blacklist/", {
      refresh: localStorage.getItem("refresh_token"),
    })
    .then((response) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
      navigate("/");
    });

  return (
    <div className="Logout">
      <h2>Wait for a logout...</h2>
    </div>
  );
}

export default Logout;
